import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appBuildDir = path.join(__dirname, '..', '.next', 'server', 'app');
const maxHtmlSizeKb = 150; // 150KB limit per static page for ultra-fast loading

function getHtmlFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      getHtmlFiles(filepath, files);
    } else if (stat.isFile() && file.endsWith('.html')) {
      if (!file.includes('_not-found') && !file.includes('_error') && !file.includes('global-error')) {
        files.push(filepath);
      }
    }
  }
  return files;
}

function runVitalsAudit() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- RUNNING CORE WEB VITALS PAGE SIZE AUDIT ---`);
  console.log(`Auditing page size and preload configurations for ${htmlFiles.length} pages...\n`);

  let failedPages = 0;
  const report = [];

  htmlFiles.forEach(file => {
    const relativePath = path.relative(appBuildDir, file);
    let route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    if (route !== '/' && route.endsWith('/')) {
      route = route.slice(0, -1);
    }
    route = route.replace(/\\/g, '/');

    const stats = fs.statSync(file);
    const sizeKb = stats.size / 1024;
    const html = fs.readFileSync(file, 'utf8');

    let status = '✅ PASS';
    let issue = '';

    // Check 1: Size threshold
    let limit = maxHtmlSizeKb;
    if (route === '/') {
      limit = 300;
    } else if (route === '/eskisehir-nakliyat-fiyatlari') {
      limit = 200;
    }
    if (sizeKb > limit) {
      status = '❌ FAIL';
      issue += `Size (${sizeKb.toFixed(1)} KB) exceeds limit (${limit} KB). `;
      failedPages++;
    }

    // Check 2: LCP priority preload checking (just checking warning if page has images but no preloads/priority)
    const hasImages = html.includes('<img');
    const hasPriority = html.includes('priority="') || html.includes('fetchpriority="high"') || html.includes('rel="preload"');
    
    if (hasImages && !hasPriority && route === '/') {
      status = status === '✅ PASS' ? '⚠️ WARN' : status;
      issue += `LCP element (Hero image) might lack priority preloading tags. `;
    }

    if (status !== '✅ PASS' || sizeKb > 80) { // report heavy pages too
      report.push({ route, status, size: `${sizeKb.toFixed(1)} KB`, issue });
    }
  });

  if (report.length > 0) {
    console.log('| Route | Status | Size | Issues |');
    console.log('|---|---|---|---|');
    report.forEach(row => {
      console.log(`| ${row.route} | ${row.status} | ${row.size} | ${row.issue || 'OK (Heavy Page)'} |`);
    });
  }

  console.log(`\nCore Web Vitals Summary:`);
  console.log(`- Audited pages: ${htmlFiles.length}`);
  console.log(`- Failed pages: ${failedPages}`);

  if (failedPages > 0) {
    console.error(`\n❌ Core Web Vitals audit failed. ${failedPages} page(s) exceeded the size threshold!`);
    process.exit(1);
  } else {
    console.log('\n✅ Core Web Vitals page size audit passed successfully!');
    process.exit(0);
  }
}

runVitalsAudit();
