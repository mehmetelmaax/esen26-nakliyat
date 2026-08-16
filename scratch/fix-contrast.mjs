import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const targets = [
  'src/app/iletisim/page.tsx',
  'src/app/tasinma-kontrol-listesi/page.tsx',
  'src/app/teklif-al/page.tsx',
  'src/components/FAQAccordion.tsx',
  'src/components/PriceCalculator.tsx',
  'src/components/QuoteForm.tsx',
  'src/components/ServicesGrid.tsx'
];

// Add all bolgeler page files
const bolgelerDir = path.join(projectRoot, 'src', 'app', 'bolgeler');
if (fs.existsSync(bolgelerDir)) {
  fs.readdirSync(bolgelerDir).forEach(dir => {
    const filePath = path.join(bolgelerDir, dir, 'page.tsx');
    if (fs.existsSync(filePath)) {
      targets.push(path.relative(projectRoot, filePath));
    }
  });
}

// Add all hizmetler page files
const hizmetlerDir = path.join(projectRoot, 'src', 'app', 'hizmetler');
if (fs.existsSync(hizmetlerDir)) {
  fs.readdirSync(hizmetlerDir).forEach(dir => {
    const filePath = path.join(hizmetlerDir, dir, 'page.tsx');
    if (fs.existsSync(filePath)) {
      targets.push(path.relative(projectRoot, filePath));
    }
  });
}

targets.forEach(relPath => {
  const filePath = path.join(projectRoot, relPath);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace text-orange with text-orange-text on light backgrounds
  // We only replace if they are in span, Link, or text elements on light background
  content = content.replace(/text-orange\s+font-bold/g, 'text-orange-text font-bold');
  content = content.replace(/text-orange\s+text-xs/g, 'text-orange-text text-xs');
  content = content.replace(/text-orange\s+text-sm/g, 'text-orange-text text-sm');
  content = content.replace(/text-orange\s+text-[a-z0-9\-]+/g, (m) => m.replace('text-orange', 'text-orange-text'));
  
  // Specific replacements
  content = content.replace('text-orange font-black', 'text-orange-text font-black');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated contrast for: ${relPath}`);
  }
});
