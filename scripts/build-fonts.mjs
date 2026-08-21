import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const FONTS_DIR = path.join(ROOT, 'public', 'fonts');

// Characters subset (Turkish tam kapsam + tipografi + nbsp U+00A0)
const SUBSET_TEXT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
  'ÇĞİÖŞÜçğıöşü' +
  '.,:;!?\'"()[]{}/\\-–—_+=%&@#*<>₺$€|~^\`…""\'\'\u00A0';

const fonts = [
  'Inter-Regular.ttf',
  'Inter-SemiBold.ttf',
  'Outfit-Regular.ttf',
  'Outfit-Bold.ttf',
  'Outfit-Black.ttf'
];

async function run() {
  console.log('--- FONT SUBSETTING & WOFF2 CONVERSION ---');
  
  for (const fontName of fonts) {
    const inputPath = path.join(FONTS_DIR, fontName);
    const outputName = fontName.replace('.ttf', '.woff2');
    const outputPath = path.join(FONTS_DIR, outputName);

    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️  Source font file "${inputPath}" not found. Skipping.`);
      continue;
    }

    console.log(`Processing: ${fontName} -> ${outputName}...`);
    try {
      const inputBuffer = fs.readFileSync(inputPath);
      const woff2Buffer = await subsetFont(inputBuffer, SUBSET_TEXT, {
        targetFormat: 'woff2'
      });
      
      fs.writeFileSync(outputPath, woff2Buffer);
      
      const oldSize = (inputBuffer.length / 1024).toFixed(1);
      const newSize = (woff2Buffer.length / 1024).toFixed(1);
      console.log(`✅ Success: ${outputName} (${oldSize} KB -> ${newSize} KB)`);
      
      // Delete original TTF file
      fs.unlinkSync(inputPath);
      console.log(`🗑️  Deleted: ${fontName}`);
    } catch (err) {
      console.error(`❌ Error processing ${fontName}:`, err);
    }
  }

  console.log('\nFont subsetting completed.\n');
}

run();
