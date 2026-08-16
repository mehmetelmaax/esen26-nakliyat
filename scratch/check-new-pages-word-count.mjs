import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');

function countWords(text) {
  // 1. Strip import statements
  let clean = text.replace(/import\s+[\s\S]+?;/g, '');
  
  // 2. Strip metadata object definition
  clean = clean.replace(/export\s+const\s+metadata\s*=[\s\S]+?;/g, '');
  
  // 3. Strip schema graph definitions
  clean = clean.replace(/const\s+schemas\s*=[\s\S]+?;/g, '');

  // 4. Strip TSX syntax brackets and common JSX attributes
  clean = clean.replace(/className="[^"]*"/g, '');
  clean = clean.replace(/href="[^"]*"/g, '');
  clean = clean.replace(/key=\{[^}]*\}/g, '');
  
  // 5. Strip JSX component opening/closing tags
  clean = clean.replace(/<[^>]+>/g, ' ');

  // 6. Clean punctuation and filter empty slots
  const words = clean
    .replace(/[{}()\[\].,:;?!\-"'\`\/\\|=+*@#&]/g, ' ')
    .split(/\s+/)
    .filter(w => w && w.trim().length > 1 && !/^[0-9]+$/.test(w));

  return words.length;
}

const pages = [
  'src/app/adana-nakliyat-fiyatlari/page.tsx',
  'src/app/hizmetler/esya-depolama/page.tsx',
  'src/app/hizmetler/parca-esya-tasima/page.tsx',
  'src/app/hizmetler/piyano-ve-kasa-tasima/page.tsx',
  'src/app/adana-nakliyat-firmalari/page.tsx',
  'src/app/tasinma-kontrol-listesi/page.tsx',
];

console.log('--- NEW PAGES WORD COUNT CHECK ---');
let allPassed = true;

for (const p of pages) {
  const fullPath = path.join(projectRoot, p);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${p}`);
    allPassed = false;
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const wc = countWords(content);
  if (wc >= 1000) {
    console.log(`✅ Passed: ${p} | Word Count: ${wc}`);
  } else {
    console.error(`❌ Failed: ${p} | Word Count: ${wc} (Under 1000 threshold!)`);
    allPassed = false;
  }
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\nAll 6 new pages successfully passed the 1000+ words threshold!');
}
