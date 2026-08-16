import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const districtMap = {
  'aladag-evden-eve-nakliyat': 'Aladağ',
  'ceyhan-evden-eve-nakliyat': 'Ceyhan',
  'cukurova-evden-eve-nakliyat': 'Çukurova',
  'feke-evden-eve-nakliyat': 'Feke',
  'imamoglu-evden-eve-nakliyat': 'İmamoğlu',
  'karaisali-evden-eve-nakliyat': 'Karaisalı',
  'karatas-evden-eve-nakliyat': 'Karataş',
  'kozan-evden-eve-nakliyat': 'Kozan',
  'pozanti-evden-eve-nakliyat': 'Pozantı',
  'saimbeyli-evden-eve-nakliyat': 'Saimbeyli',
  'saricam-evden-eve-nakliyat': 'Sarıçam',
  'sehirlerarasi-evden-eve-nakliyat': 'Şehirlerarası',
  'seyhan-evden-eve-nakliyat': 'Seyhan',
  'tufanbeyli-evden-eve-nakliyat': 'Tufanbeyli',
  'yumurtalik-evden-eve-nakliyat': 'Yumurtalık',
  'yuregir-evden-eve-nakliyat': 'Yüreğir'
};

const serviceMap = {
  'sehirici-evden-eve-nakliyat': 'Şehiriçi Nakliyat',
  'sehirlerarasi-evden-eve-nakliyat': 'Şehirlerarası Nakliyat',
  'asansorlu-evden-eve-nakliyat': 'Asansörlü Nakliyat',
  'ofis-ve-isyeri-tasimaciligi': 'Ofis Taşıma',
  'profesyonel-esya-paketleme': 'Eşya Paketleme',
  'ucretsiz-ekspertiz': 'Ücretsiz Ekspertiz',
  'esya-depolama': 'Eşya Depolama',
  'parca-esya-tasima': 'Parça Eşya Taşıma',
  'piyano-ve-kasa-tasima': 'Piyano ve Kasa Taşıma'
};

// Helper to remove any existing Breadcrumb and RelatedLinks tags
function cleanPageContent(content) {
  let clean = content;
  // Remove import lines if present
  clean = clean.replace(/import Breadcrumb from '@\/components\/Breadcrumb';\r?\n?/g, '');
  clean = clean.replace(/import RelatedLinks from '@\/components\/RelatedLinks';\r?\n?/g, '');
  // Remove Breadcrumb tags
  clean = clean.replace(/<Breadcrumb[^>]*\/>\r?\n?/g, '');
  // Remove RelatedLinks tags
  clean = clean.replace(/<RelatedLinks[^>]*\/>\r?\n?/g, '');
  return clean;
}

// 1. Process Region Pages
console.log('Processing Region Pages...');
for (const [slug, name] of Object.entries(districtMap)) {
  const filePath = path.join(projectRoot, 'src', 'app', 'bolgeler', slug, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  content = cleanPageContent(content);

  // Add imports
  content = "import Breadcrumb from '@/components/Breadcrumb';\nimport RelatedLinks from '@/components/RelatedLinks';\n" + content;

  // Insert Breadcrumb after <main className="...">
  const mainRegex = /<main[^>]*className="([^"]*)"[^>]*>/;
  const mainMatch = content.match(mainRegex);
  if (mainMatch) {
    const mainTag = mainMatch[0];
    const breadcrumbTag = `\n        <Breadcrumb items={[{ name: 'Bölgelerimiz', url: '/#ilcelerimiz' }, { name: '${name}', url: '/bolgeler/${slug}' }]} className="pt-4" />`;
    content = content.replace(mainTag, `${mainTag}${breadcrumbTag}`);
  }

  // Insert RelatedLinks before the FAQ section
  const faqTarget = '<div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">';
  const relatedLinksTag = `\n          <RelatedLinks currentSlug="${slug}" type="bolge" />\n`;
  if (content.includes(faqTarget)) {
    content = content.replace(faqTarget, `${relatedLinksTag}\n          ${faqTarget}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Cleaned & Processed region: ${slug}`);
}

// 2. Process Service Pages
console.log('\nProcessing Service Pages...');
for (const [slug, name] of Object.entries(serviceMap)) {
  const filePath = path.join(projectRoot, 'src', 'app', 'hizmetler', slug, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  content = cleanPageContent(content);

  // Add imports
  content = "import Breadcrumb from '@/components/Breadcrumb';\nimport RelatedLinks from '@/components/RelatedLinks';\n" + content;

  // Insert Breadcrumb after <main className="...">
  const mainRegex = /<main[^>]*className="([^"]*)"[^>]*>/;
  const mainMatch = content.match(mainRegex);
  if (mainMatch) {
    const mainTag = mainMatch[0];
    const breadcrumbTag = `\n        <Breadcrumb items={[{ name: 'Hizmetlerimiz', url: '/#hizmetlerimiz' }, { name: '${name}', url: '/hizmetler/${slug}' }]} className="pt-4" />`;
    content = content.replace(mainTag, `${mainTag}${breadcrumbTag}`);
  }

  // Insert RelatedLinks before the FAQ section or before the Internal Links area
  const faqTarget = '/* FAQ Section */';
  const relatedLinksTag = `\n          <RelatedLinks currentSlug="${slug}" type="hizmet" />\n`;
  
  if (content.includes(faqTarget)) {
    content = content.replace(`{/* ${faqTarget} */}`, `<RelatedLinks currentSlug="${slug}" type="hizmet" />\n\n          {/* ${faqTarget} */}`);
  } else if (content.includes('{/* FAQ Section */}')) {
    content = content.replace('{/* FAQ Section */}', `<RelatedLinks currentSlug="${slug}" type="hizmet" />\n\n          {/* FAQ Section */}`);
  } else {
    // Fallback: search for first div class matching bg-white p-8 border
    const divFaqRegex = /<div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">/;
    if (divFaqRegex.test(content)) {
      content = content.replace(divFaqRegex, `<RelatedLinks currentSlug="${slug}" type="hizmet" />\n\n          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Cleaned & Processed service: ${slug}`);
}
