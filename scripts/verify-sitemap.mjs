import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const APP_DIR = path.join(ROOT, '.next', 'server', 'app');
const SITEMAP_PATH = path.join(APP_DIR, 'sitemap.xml.body');

function runSitemapVerification() {
  console.log('--- RUNNING SITEMAP VERIFICATION ---');
  
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error(`❌ sitemap.xml.body not found at ${SITEMAP_PATH}. Please run "npm run build" first.`);
    process.exit(1);
  }

  const sitemapXml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  
  // 1. Extract all URLs from sitemap
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Parsed ${urls.length} URLs from sitemap.xml.body.`);

  // Parse baseURL from first URL
  if (urls.length === 0) {
    console.error('❌ sitemap.xml.body has no URLs!');
    process.exit(1);
  }
  const urlObj = new URL(urls[0]);
  const baseUrl = urlObj.origin;
  console.log(`Base URL detected: ${baseUrl}`);

  let hasError = false;
  const sitemapRoutes = new Set();

  // 2. Sitemap -> Build check (Verify all sitemap URLs exist as compiled HTML)
  urls.forEach(url => {
    const route = url.replace(baseUrl, '');
    const cleanRoute = route === '' ? '/' : route;
    sitemapRoutes.add(cleanRoute);

    // Map route to html file path
    const normalizedRoute = cleanRoute === '/' ? 'index' : cleanRoute.replace(/^\//, '');
    const htmlFile = path.join(APP_DIR, `${normalizedRoute}.html`);

    if (!fs.existsSync(htmlFile)) {
      console.error(`❌ Sitemap URL "${url}" does not exist in build output at "${htmlFile}"`);
      hasError = true;
    } else {
      // Check if this page has noindex in metadata
      const htmlContent = fs.readFileSync(htmlFile, 'utf8');
      const isNoIndex = /<meta\s+name=["']robots["']\s+content=["'][^"']*(noindex|none)[^"']*["']/i.test(htmlContent);
      if (isNoIndex) {
        console.error(`❌ Sitemap URL "${url}" has "noindex" robots tag in its HTML! (Sitemap vs Noindex conflict)`);
        hasError = true;
      }
    }
  });

  // 3. Build -> Sitemap check (Verify all indexable build HTML files exist in sitemap)
  function getHtmlFiles(dir, files = []) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const filepath = path.join(dir, file);
      const stat = fs.statSync(filepath);
      if (stat.isDirectory()) {
        getHtmlFiles(filepath, files);
      } else if (stat.isFile() && file.endsWith('.html')) {
        if (!file.includes('_not-found') && !file.includes('_error') && !file.includes('global-error')) {
          files.push(filepath);
        }
      }
    });
    return files;
  }

  if (fs.existsSync(APP_DIR)) {
    const buildFiles = getHtmlFiles(APP_DIR);
    buildFiles.forEach(file => {
      const relative = path.relative(APP_DIR, file).replace('.html', '').replace(/\\/g, '/');
      const route = relative === 'index' ? '/' : `/${relative}`;
      
      const htmlContent = fs.readFileSync(file, 'utf8');
      const isNoIndex = /<meta\s+name=["']robots["']\s+content=["'][^"']*(noindex|none)[^"']*["']/i.test(htmlContent);

      if (!isNoIndex && !sitemapRoutes.has(route)) {
        console.error(`❌ Indexable route "${route}" is present in build output but missing from sitemap.xml!`);
        hasError = true;
      }
    });
  }

  if (hasError) {
    console.error('\n❌ Sitemap verification failed with errors.');
    process.exit(1);
  } else {
    console.log(`\n✅ Sitemap verification complete: All ${urls.length} URLs verified successfully (double-sided check passed).`);
    process.exit(0);
  }
}

runSitemapVerification();
