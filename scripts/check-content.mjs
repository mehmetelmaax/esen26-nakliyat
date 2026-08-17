import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const buildDir = path.join(projectRoot, '.next', 'server', 'app');

function getHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else {
      if (path.extname(file) === '.html') {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

console.log('--- RUNNING CONTENT AND ENGLISH LEAK AUDIT ---');
const htmlFiles = getHtmlFiles(buildDir);

if (htmlFiles.length === 0) {
  console.error('Error: No compiled HTML files found. Please run "npm run build" first.');
  process.exit(1);
}

let hasErrors = false;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 1. Strip script tags (removes JSON-LD and JS)
  let visibleText = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ');
  // 2. Strip style tags (removes CSS)
  visibleText = visibleText.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
  // 3. Strip HTML comments
  visibleText = visibleText.replace(/<!--[\s\S]*?-->/g, ' ');
  // 4. Strip all HTML tags
  visibleText = visibleText.replace(/<[^>]+>/g, ' ');
  // 5. Decode basic HTML entities for cleaner matching
  visibleText = visibleText
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
    
  const errors = [];
  
  // Look for English leaks (and, the, with, for) with word boundaries
  // Note: we make sure not to flag words inside text that are not standalone (e.g. brand names)
  const leakRegex = /\b(and|the|with|for)\b/i;
  const matchLeak = visibleText.match(leakRegex);
  if (matchLeak) {
    // Extract context
    const index = matchLeak.index;
    const context = visibleText.substring(Math.max(0, index - 30), Math.min(visibleText.length, index + 30)).trim();
    errors.push(`English leak found: "${matchLeak[0]}" near "...${context}..."`);
  }
  
  // Look for placeholder text
  if (/TODO/i.test(visibleText)) {
    errors.push('Found placeholder: "TODO"');
  }
  if (/Lorem/i.test(visibleText)) {
    errors.push('Found placeholder: "Lorem"');
  }
  if (/\[Görsel:/i.test(visibleText)) {
    errors.push('Found placeholder: "[Görsel:"');
  }
  
  if (errors.length > 0) {
    hasErrors = true;
    const relPath = path.relative(buildDir, file);
    console.error(`❌ File: ${relPath}`);
    errors.forEach(err => console.error(`   - ${err}`));
  }
});

if (hasErrors) {
  console.log('\n❌ Content audit failed with errors.');
  process.exit(1);
} else {
  console.log(`\n✅ Content audit passed: Checked ${htmlFiles.length} HTML files. No English leaks or placeholders found.`);
  process.exit(0);
}
