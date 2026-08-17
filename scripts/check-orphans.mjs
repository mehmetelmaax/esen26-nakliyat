import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const serverAppDir = path.join(projectRoot, '.next', 'server', 'app');

function getHtmlFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, filesList);
    } else if (file.endsWith('.html') && !file.includes('_not-found') && !file.includes('global-error')) {
      filesList.push(filePath);
    }
  });
  return filesList;
}

function extractLinks(html) {
  const links = [];
  const regex = /href="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    let href = match[1];
    // Normalize relative links
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (href.includes('esen26nakliyat.com')) {
        const urlObj = new URL(href);
        href = urlObj.pathname;
      } else {
        continue; // external link
      }
    }
    // Ignore hashes, telephone, mailto, manifest, etc.
    if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:') || href.includes('manifest') || href.endsWith('.png') || href.endsWith('.ico')) {
      continue;
    }
    // Clean trailing slashes
    if (href !== '/' && href.endsWith('/')) {
      href = href.slice(0, -1);
    }
    links.push(href);
  }
  return links;
}

function run() {
  console.log('--- RUNNING LINK GRAPH ORPHAN PAGES AUDIT ---');
  if (!fs.existsSync(serverAppDir)) {
    console.log('⚠️  App server directory not found. Please run next build first.');
    process.exit(0);
  }

  const htmlFiles = getHtmlFiles(serverAppDir);
  console.log(`Found ${htmlFiles.length} compiled pages to inspect.`);

  const linkGraph = {};
  const allRoutes = new Set();

  htmlFiles.forEach(filePath => {
    // Map file path back to route path
    // e.g. .next/server/app/bolgeler/alpu-evden-eve-nakliyat.html -> /bolgeler/alpu-evden-eve-nakliyat
    let route = '/' + path.relative(serverAppDir, filePath).replace(/\\/g, '/').replace('.html', '');
    if (route.endsWith('/page')) {
      route = route.slice(0, -5);
    }
    if (route === '/page' || route === '/index') {
      route = '/';
    }
    
    // Clean trailing slashes
    if (route !== '/' && route.endsWith('/')) {
      route = route.slice(0, -1);
    }

    allRoutes.add(route);

    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const links = extractLinks(htmlContent);
    
    linkGraph[route] = links;
  });

  // Check which routes are targeted by incoming links from OTHER pages
  const incomingLinks = {};
  allRoutes.forEach(r => {
    incomingLinks[r] = new Set();
  });

  Object.keys(linkGraph).forEach(sourceRoute => {
    linkGraph[sourceRoute].forEach(targetRoute => {
      // Direct match or partial match
      if (allRoutes.has(targetRoute) && targetRoute !== sourceRoute) {
        incomingLinks[targetRoute].add(sourceRoute);
      }
    });
  });

  let hasOrphans = false;
  console.log('\nAnalyzing route connectivity...');
  
  allRoutes.forEach(route => {
    if (route === '/') return; // root has no incoming requirement
    
    // Ignore API routes and opengraph/sitemap endpoints which are not HTML documents
    if (route.includes('/api/') || route === '/sitemap.xml' || route === '/robots.txt') {
      return;
    }

    const parentPages = incomingLinks[route];
    if (!parentPages || parentPages.size === 0) {
      hasOrphans = true;
      console.error(`❌ Orphan Page found: "${route}" (Has 0 incoming internal links)`);
    } else {
      // console.log(`✅ Route "${route}" is linked from: ${[...parentPages].join(', ')}`);
    }
  });

  if (hasOrphans) {
    console.error('\n❌ Link graph orphan pages audit failed.');
    process.exit(1);
  } else {
    console.log('\n✅ Link graph orphan pages audit passed successfully! All pages are reachable.');
    process.exit(0);
  }
}

run();
