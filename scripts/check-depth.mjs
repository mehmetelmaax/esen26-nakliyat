import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appBuildDir = path.join(__dirname, '..', '.next', 'server', 'app');

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

function runDepthAudit() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- RUNNING LINK DEPTH & CONNECTIVITY AUDIT ---`);
  console.log(`Analyzing internal link graph for ${htmlFiles.length} pages...\n`);

  const graph = {};
  const inDegree = {};
  
  // Normalize routes
  const routes = htmlFiles.map(file => {
    const relativePath = path.relative(appBuildDir, file);
    let route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    // Clean trailing slash unless homepage
    if (route !== '/' && route.endsWith('/')) {
      route = route.slice(0, -1);
    }
    // Standardize backslashes for routes
    route = route.replace(/\\/g, '/');
    return { file, route };
  });

  // Initialize
  routes.forEach(r => {
    graph[r.route] = [];
    inDegree[r.route] = 0;
  });

  // Parse links
  routes.forEach(r => {
    const html = fs.readFileSync(r.file, 'utf8');
    const hrefRegex = /href="([^"]+)"/g;
    let match;
    const currentLinks = new Set();

    while ((match = hrefRegex.exec(html)) !== null) {
      let href = match[1];

      // Only check internal links
      if (href.startsWith('/') && !href.startsWith('//')) {
        // Strip query params and hashes
        href = href.split('?')[0].split('#')[0];
        // Clean trailing slash unless homepage
        if (href !== '/' && href.endsWith('/')) {
          href = href.slice(0, -1);
        }
        
        // If it is in our routes, add link
        if (graph[href] !== undefined && href !== r.route) {
          currentLinks.add(href);
        }
      }
    }

    currentLinks.forEach(link => {
      graph[r.route].push(link);
    });
  });

  // Count incoming links (in-degree)
  Object.keys(graph).forEach(src => {
    graph[src].forEach(dest => {
      inDegree[dest]++;
    });
  });

  // Calculate shortest path from homepage '/' using BFS
  const depth = {};
  Object.keys(graph).forEach(r => {
    depth[r] = Infinity;
  });
  
  const queue = ['/'];
  depth['/'] = 0;

  while (queue.length > 0) {
    const curr = queue.shift();
    const currDepth = depth[curr];

    if (graph[curr]) {
      for (const neighbor of graph[curr]) {
        if (depth[neighbor] === Infinity) {
          depth[neighbor] = currDepth + 1;
          queue.push(neighbor);
        }
      }
    }
  }

  let warnings = 0;
  let criticalErrors = 0;
  const report = [];

  Object.keys(graph).forEach(r => {
    const d = depth[r];
    const incoming = inDegree[r];

    let status = '✅ OK';
    let issue = '';

    if (d > 3) {
      criticalErrors++;
      status = '❌ FAIL';
      issue += `Depth ${d} exceeds max (3) clicks limit. `;
    }
    
    if (incoming < 2 && r !== '/') {
      warnings++;
      status = status === '✅ OK' ? '⚠️ WARN' : status;
      issue += `Incoming links count (${incoming}) is less than 2. `;
    }

    if (status !== '✅ OK') {
      report.push({ route: r, status, depth: d === Infinity ? 'Unreachable' : d, incoming, issue });
    }
  });

  if (report.length > 0) {
    console.log('| Route | Status | Depth | Incoming Links | Issues |');
    console.log('|---|---|---|---|---|');
    report.forEach(row => {
      console.log(`| ${row.route} | ${row.status} | ${row.depth} | ${row.incoming} | ${row.issue} |`);
    });
  }

  console.log(`\nConnectivity Summary:`);
  console.log(`- Total pages audited: ${Object.keys(graph).length}`);
  console.log(`- Critical errors (Depth > 3): ${criticalErrors}`);
  console.log(`- Warnings (Incoming links < 2): ${warnings}`);

  if (criticalErrors > 0) {
    console.error('\n❌ Depth audit failed due to pages exceeding the maximum click depth limit of 3!');
    process.exit(1);
  } else {
    console.log('\n✅ Link depth audit passed successfully! All pages are within 3 clicks from homepage.');
    process.exit(0);
  }
}

runDepthAudit();
