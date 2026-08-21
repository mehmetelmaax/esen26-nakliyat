/**
 * check-freshness.mjs
 *
 * İÇERİK TAZELİK DENETİMİ
 *
 * Neden yeniden yazıldı:
 *   Önceki sürüm `blog-metadata.ts` dosyasını metin olarak okuyup ilk "{" ile
 *   son "}" arasını kesip JSON.parse ediyordu. Bu, TypeScript'i JSON sanmak
 *   demektir ve şu durumların HER BİRİ CI'yı kırar:
 *     - tırnaksız property adı   ->  { date: '...' }  (JSON çift tırnak ister)
 *     - dosya sonuna yeni export ->  lastIndexOf('}') yanlış yeri bulur
 *     - metin içinde geçen "}" veya ' karakteri
 *     - trailing comma
 *   Nitekim cdfef55 commit'inde tam olarak bu sebeple pipeline düştü.
 *
 * Yeni yaklaşım — iki bağımsız kaynak, hiçbirinde JSON.parse(TS) yok:
 *
 *   KAYNAK A (birincil): build çıktısı .next/server/app/**\/*.html
 *     JSON-LD blokları GERÇEK JSON'dır, güvenle parse edilir. Burada okunan
 *     tarih, Google'ın fiilen gördüğü tarihtir. Blog yazıları (BlogPosting)
 *     ve ileride eklenecek her türlü tarihli schema otomatik kapsanır.
 *
 *   KAYNAK B (ikincil): src/lib/site-config.ts
 *     Hizmet / bölge / rota kayıtlarındaki `updatedAt` alanları. Bunlar HTML'e
 *     yansımadığı için A'da görünmez. Tolerant regex ile okunur; eşleşmeyen
 *     kayıt sessizce atlanır, CI kırılmaz.
 *
 * ÇIKIŞ KODU POLİTİKASI (önemli):
 *   İçeriğin eskimesi bir KOD HATASI DEĞİLDİR. Hiçbir commit atılmadan, sırf
 *   zaman geçtiği için CI'nın kırmızıya dönmesi yanlış bir sinyaldir ve ekibin
 *   CI'ya güvenini yok eder. Bu yüzden:
 *     - Eskimiş içerik   -> UYARI (exit 0)
 *     - Yapısal bozukluk -> HATA  (exit 1)
 *         * geçersiz tarih formatı
 *         * gelecek tarihli içerik (kopyala-yapıştır hatasının klasik belirtisi)
 *         * blog sayfası var ama tarihli schema hiç yok
 *
 *   Eskimiş içeriği de hata saymak için:
 *     FRESHNESS_STRICT=1 npm run verify:freshness
 *   Eşiği değiştirmek için:
 *     FRESHNESS_WARN_DAYS=90 npm run verify:freshness
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const APP_DIR = path.join(ROOT, '.next', 'server', 'app');
const SITE_CONFIG = path.join(ROOT, 'src', 'lib', 'site-config.ts');

const DAY = 24 * 60 * 60 * 1000;
const WARN_AFTER_DAYS = Number(process.env.FRESHNESS_WARN_DAYS ?? 180);
const STRICT = process.env.FRESHNESS_STRICT === '1';

const NOW = new Date();
const errors = [];
const stale = [];
let audited = 0;

const daysBetween = (a, b) => Math.floor((a.getTime() - b.getTime()) / DAY);
const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());

console.log('--- İÇERİK TAZELİK DENETİMİ ---\n');

/* ------------------------------------------------------------------ */
/* KAYNAK A — build çıktısındaki JSON-LD                              */
/* ------------------------------------------------------------------ */

function walkHtml(dir, out = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) walkHtml(full, out);
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

function toRoute(file) {
  const rel = path.relative(APP_DIR, file).split(path.sep).join('/').replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel}`;
}

/** JSON-LD ağacındaki tüm düğümleri düzleştirir (@graph, dizi, iç içe nesne dahil). */
function flattenNodes(value, out = []) {
  if (Array.isArray(value)) {
    for (const v of value) flattenNodes(v, out);
  } else if (value && typeof value === 'object') {
    out.push(value);
    for (const v of Object.values(value)) {
      if (v && typeof v === 'object') flattenNodes(v, out);
    }
  }
  return out;
}

const DATED_TYPES = new Set(['Article', 'BlogPosting', 'NewsArticle', 'TechArticle']);

function auditBuildOutput() {
  if (!fs.existsSync(APP_DIR)) {
    console.log('⚠️  .next/server/app bulunamadı — build çıktısı denetimi atlandı.');
    console.log('   (Bu script `npm run build` sonrası çalıştırılmalıdır.)\n');
    return;
  }

  const files = walkHtml(APP_DIR);
  const blogPages = files.filter((f) => toRoute(f).startsWith('/blog/'));
  let datedFound = 0;

  for (const file of files) {
    const route = toRoute(file);
    const html = fs.readFileSync(file, 'utf8');

    const blocks = [
      ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    ].map((m) => m[1]);

    for (const raw of blocks) {
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch {
        errors.push(`${route} — geçersiz JSON-LD bloğu (parse edilemedi)`);
        continue;
      }

      for (const node of flattenNodes(parsed)) {
        const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
        if (!types.some((t) => DATED_TYPES.has(t))) continue;

        const rawDate = node.dateModified ?? node.datePublished;
        if (!rawDate) continue;

        datedFound++;
        audited++;

        const label = node.headline ?? node.name ?? route;
        const date = new Date(rawDate);

        if (!isValidDate(date)) {
          errors.push(`${route} — geçersiz tarih formatı: "${rawDate}" (${label})`);
          continue;
        }

        const age = daysBetween(NOW, date);

        if (age < 0) {
          errors.push(
            `${route} — gelecek tarihli içerik: ${rawDate} (${Math.abs(age)} gün sonrası). ` +
              'Kopyala-yapıştır hatası olabilir.'
          );
          continue;
        }

        if (age > WARN_AFTER_DAYS) {
          stale.push({ route, label, date: rawDate, age, source: 'schema' });
        }
      }
    }
  }

  if (blogPages.length > 0 && datedFound === 0) {
    errors.push(
      `${blogPages.length} blog sayfası var ama hiçbirinde datePublished/dateModified ` +
        'taşıyan schema bulunamadı. Article schema kaybolmuş olabilir.'
    );
  }

  console.log(`Build çıktısı : ${files.length} sayfa tarandı, ${datedFound} tarihli schema bulundu.`);
}

/* ------------------------------------------------------------------ */
/* KAYNAK B — site-config.ts içindeki updatedAt alanları              */
/* ------------------------------------------------------------------ */

function auditSiteConfig() {
  if (!fs.existsSync(SITE_CONFIG)) {
    console.log('⚠️  site-config.ts bulunamadı — updatedAt denetimi atlandı.\n');
    return;
  }

  const src = fs.readFileSync(SITE_CONFIG, 'utf8');

  // TS'i JSON'a zorlamak yerine tolerant eşleştirme: aynı nesne bloğu içinde
  // geçen slug ve updatedAt çiftlerini yakalar. Eşleşmeyen kayıt sessizce
  // atlanır — bu script hiçbir koşulda parse hatasıyla CI'yı kırmaz.
  const pattern = /slug:\s*'([^']+)'[\s\S]{0,800}?updatedAt:\s*'([^']+)'/g;

  let match;
  let count = 0;
  while ((match = pattern.exec(src)) !== null) {
    const [, slug, rawDate] = match;
    const date = new Date(rawDate);
    count++;
    audited++;

    if (!isValidDate(date)) {
      errors.push(`site-config.ts — "${slug}" için geçersiz updatedAt: "${rawDate}"`);
      continue;
    }

    const age = daysBetween(NOW, date);

    if (age < 0) {
      errors.push(
        `site-config.ts — "${slug}" gelecek tarihli updatedAt taşıyor: ${rawDate} ` +
          `(${Math.abs(age)} gün sonrası).`
      );
      continue;
    }

    if (age > WARN_AFTER_DAYS) {
      stale.push({ route: slug, label: slug, date: rawDate, age, source: 'site-config' });
    }
  }

  console.log(`site-config  : ${count} adet updatedAt alanı okundu.\n`);
}

/* ------------------------------------------------------------------ */
/* RAPOR                                                              */
/* ------------------------------------------------------------------ */

auditBuildOutput();
auditSiteConfig();

if (stale.length > 0) {
  stale.sort((a, b) => b.age - a.age);
  console.log(`⚠️  ${stale.length} içerik ${WARN_AFTER_DAYS} günden eski:\n`);
  for (const s of stale) {
    console.log(`   ${String(s.age).padStart(4)} gün · ${s.date} · ${s.label}`);
    console.log(`        ${s.source === 'schema' ? s.route : `site-config.ts → ${s.route}`}`);
  }
  console.log('\n   Öneri: içeriği gözden geçirip güncelleyin, sonra tarihi yenileyin.');
  console.log('   İçerik değişmeden sadece tarihi güncellemek yanıltıcıdır ve fayda sağlamaz.\n');
}

if (errors.length > 0) {
  const unique = [...new Set(errors)];
  console.error(`❌ ${unique.length} yapısal hata bulundu:\n`);
  for (const e of unique) console.error(`   - ${e}`);
  console.error('');
  process.exit(1);
}

console.log('Özet:');
console.log(`- Denetlenen kayıt : ${audited}`);
console.log(`- Eskimiş içerik   : ${stale.length}`);
console.log('- Yapısal hata     : 0');

if (STRICT && stale.length > 0) {
  console.error('\n❌ FRESHNESS_STRICT=1 aktif — eskimiş içerik hata sayıldı.\n');
  process.exit(1);
}

console.log('\n✅ Tazelik denetimi tamamlandı.\n');
