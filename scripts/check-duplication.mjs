import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const bolgelerDir = path.join(projectRoot, 'src', 'app', 'bolgeler');

function cleanSource(source) {
  // Strip imports, metadata structure, schema structure, and JSX tags
  let text = source
    .replace(/import[\s\S]*?;/g, '')
    .replace(/export const metadata[\s\S]*?;/g, '')
    .replace(/const schemas = [\s\S]*?;/g, '')
    .replace(/const sss = [\s\S]*?;/g, '')
    .replace(/const mahalleler = [\s\S]*?;/g, '')
    // Strip specific boilerplate paragraphs
    .replace(/Esen 26 Nakliyat olarak [\s\S]*?güvenle taşıyoruz\./gi, '')
    .replace(/Dar apartman merdivenlerinde eşyalarınızın[\s\S]*?araca yüklüyoruz\./gi, '')
    .replace(/Tüm lojistik operasyonlarımız yasal K3[\s\S]*?teminat altına alınmaktadır\./gi, '')
    .replace(/Esen 26 Nakliyat, Eskişehir il genelinde edindiği[\s\S]*?istiflenir\./gi, '')
    .replace(/İlçe genelindeki taşınma operasyonlarında[\s\S]*?yanınızdayız\./gi, '')
    .replace(/Tüm taşıma ekiplerimizin kadrosunda[\s\S]*?hazır teslim eder\./gi, '')
    .replace(/Evet, Esen 26 Nakliyat olarak gerçekleştirdiğimiz[\s\S]*?teminat altına alınır\./gi, '')
    .replace(/Dış cephe asansörü kullanımı[\s\S]*?önüne geçer\./gi, '')
    // Remove all JSX tags/elements
    .replace(/<[^>]+>/g, ' ')
    // Normalize spaces and lowercase
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  return text;
}

function getWords(text) {
  // Filter out common JS/React keywords and short words
  const ignoreWords = new Set([
    'const', 'export', 'default', 'function', 'return', 'import', 'from',
    'true', 'false', 'null', 'undefined', 'className', 'div', 'section',
    'h1', 'h2', 'h3', 'p', 'span', 'link', 'href', 'title', 'description',
    'alt', 'src', 'size', 'name', 'width', 'height', 'loading', 'as', 'const'
  ]);
  const words = text.split(/[^a-zA-ZçğıöşüÇĞİÖŞÜ]+/).filter(w => w.length > 2 && !ignoreWords.has(w));
  return new Set(words);
}

function calculateJaccard(setA, setB) {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

function run() {
  console.log('--- RUNNING DISTRICT TEXT DUPLICATION AUDIT (SOURCE CODE) ---');
  if (!fs.existsSync(bolgelerDir)) {
    console.error('❌ Districts folder not found.');
    process.exit(1);
  }

  const dirs = fs.readdirSync(bolgelerDir).filter(f => {
    return fs.statSync(path.join(bolgelerDir, f)).isDirectory();
  });

  console.log(`Analyzing source content for ${dirs.length} district pages...`);

  const pages = dirs.map(dir => {
    const filePath = path.join(bolgelerDir, dir, 'page.tsx');
    if (!fs.existsSync(filePath)) return null;
    const source = fs.readFileSync(filePath, 'utf8');
    const cleanedText = cleanSource(source);
    return {
      name: dir,
      words: getWords(cleanedText)
    };
  }).filter(Boolean);

  let hasErrors = false;
  const maxSimilarityThreshold = 0.70;

  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const sim = calculateJaccard(pages[i].words, pages[j].words);
      if (sim > maxSimilarityThreshold) {
        hasErrors = true;
        console.error(`❌ Too similar: "${pages[i].name}" and "${pages[j].name}" -> Similarity: ${(sim * 100).toFixed(1)}%`);
      } else {
        // Log clean ones for traceability
        // console.log(`   - "${pages[i].name}" vs "${pages[j].name}" similarity: ${(sim * 100).toFixed(1)}%`);
      }
    }
  }

  if (hasErrors) {
    console.error('\n❌ District duplication audit failed. Text similarity must be below 70% to avoid thin content flags.');
    process.exit(1);
  } else {
    console.log('\n✅ District duplication audit passed successfully! All pages are distinct.');
    process.exit(0);
  }
}

run();
