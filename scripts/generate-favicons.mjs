import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const logoPath = 'public/img/esen-26-logo-v3.png';
const iconOut = 'src/app/icon.png';
const appleIconOut = 'src/app/apple-icon.png';
const faviconOut = 'src/app/favicon.ico';

async function generate() {
  try {
    // 1. Extract and pad the E26 house emblem
    const base = sharp(logoPath)
      .extract({ left: 0, top: 40, width: 450, height: 205 })
      .extend({
        top: 122,
        bottom: 123,
        left: 0,
        right: 0,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      });

    // 2. Generate standard favicon icon.png (32x32)
    if (fs.existsSync(iconOut)) {
      fs.unlinkSync(iconOut);
    }
    await base.clone().resize(32, 32).toFile(iconOut);
    console.log('✅ Generated src/app/icon.png (32x32)');

    // 3. Generate apple-icon.png for Apple devices (180x180)
    if (fs.existsSync(appleIconOut)) {
      fs.unlinkSync(appleIconOut);
    }
    await base.clone().resize(180, 180).toFile(appleIconOut);
    console.log('✅ Generated src/app/apple-icon.png (180x180)');

    // 4. Generate fallback favicon.ico (32x32 PNG container)
    if (fs.existsSync(faviconOut)) {
      fs.unlinkSync(faviconOut);
    }
    await base.clone().resize(32, 32).toFile(faviconOut);
    console.log('✅ Generated src/app/favicon.ico (32x32)');
  } catch (err) {
    console.error('❌ Error generating icons:', err);
  }
}

generate();
