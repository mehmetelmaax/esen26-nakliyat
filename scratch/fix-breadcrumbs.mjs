import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const mappings = {
  'asansorlu-evden-eve-nakliyat': { from: 'Hizmetlerimiz', to: 'Esenler Hizmetleri' },
  'esya-depolama': { from: 'Hizmetlerimiz', to: 'Kurumsal Çözümler' },
  'ofis-ve-isyeri-tasimaciligi': { from: 'Hizmetlerimiz', to: 'Taşıma Faaliyetleri' },
  'parca-esya-tasima': { from: 'Hizmetlerimiz', to: 'Lojistik Hizmetler' },
  'piyano-ve-kasa-tasima': { from: 'Hizmetlerimiz', to: 'Nakliye Çözümleri' },
  'profesyonel-esya-paketleme': { from: 'Hizmetlerimiz', to: 'Hizmet Grupları' },
  'sehirici-evden-eve-nakliyat': { from: 'Hizmetlerimiz', to: 'Hizmet Yelpazesi' },
  'sehirlerarasi-evden-eve-nakliyat': { from: 'Hizmetlerimiz', to: 'Hizmet Seçenekleri' },
  'ucretsiz-ekspertiz': { from: 'Hizmetlerimiz', to: 'Tüm Hizmetlerimiz' }
};

Object.entries(mappings).forEach(([slug, change]) => {
  const filePath = path.join(projectRoot, 'src', 'app', 'hizmetler', slug, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const targetText = `name: '${change.from}', url: '/#hizmetlerimiz'`;
    const replacementText = `name: '${change.to}', url: '/#hizmetlerimiz'`;
    if (content.includes(targetText)) {
      content = content.replace(targetText, replacementText);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${slug} breadcrumb to "${change.to}"`);
    } else {
      console.warn(`Target not found in ${slug}`);
    }
  } else {
    console.error(`File not found: ${filePath}`);
  }
});
