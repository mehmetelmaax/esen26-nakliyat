import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = 'C:/Users/mehme/.gemini/antigravity/scratch/esen26-nakliyat';

function searchDirectory(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        searchDirectory(filePath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.html')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('<video') || content.includes('video')) {
        // Log the lines containing it
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
          if (line.includes('<video') || line.includes('preload=')) {
            console.log(`Match in ${filePath}:${idx + 1} -> ${line.trim()}`);
          }
        });
      }
    }
  });
}

searchDirectory(path.join(projectRoot, 'src'));
console.log('Search finished.');
