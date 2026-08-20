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

function runIntegrityCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- SCHEMA.ORG INTEGRITY CHECK ---`);
  console.log(`Scanning ${htmlFiles.length} pages for duplicate schemas...\n`);

  let errors = 0;
  const report = [];

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    const html = fs.readFileSync(file, 'utf8');

    const ldJsonMatches = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];

    const typeCounts = {
      BreadcrumbList: 0,
      FAQPage: 0,
      Organization: 0
    };

    const countTypes = (obj) => {
      if (!obj || typeof obj !== 'object') return;
      
      const type = obj['@type'];
      if (typeof type === 'string') {
        if (type === 'BreadcrumbList') typeCounts.BreadcrumbList++;
        if (type === 'FAQPage') typeCounts.FAQPage++;
        if (type === 'Organization') typeCounts.Organization++;
      } else if (Array.isArray(type)) {
        if (type.includes('BreadcrumbList')) typeCounts.BreadcrumbList++;
        if (type.includes('FAQPage')) typeCounts.FAQPage++;
        if (type.includes('Organization')) typeCounts.Organization++;
      }
    };

    for (const match of ldJsonMatches) {
      let schema;
      try {
        schema = JSON.parse(match[1].trim());
      } catch (err) {
        // Skip invalid syntax as check-schema handles that
        continue;
      }

      if (schema['@graph'] && Array.isArray(schema['@graph'])) {
        schema['@graph'].forEach(countTypes);
      } else if (Array.isArray(schema)) {
        schema.forEach(countTypes);
      } else {
        countTypes(schema);
      }
    }

    const pageIssues = [];
    if (typeCounts.BreadcrumbList > 1) {
      pageIssues.push(`Duplicate BreadcrumbList schema found (${typeCounts.BreadcrumbList} instances)`);
    }
    if (typeCounts.FAQPage > 1) {
      pageIssues.push(`Duplicate FAQPage schema found (${typeCounts.FAQPage} instances)`);
    }
    if (typeCounts.Organization > 1) {
      pageIssues.push(`Duplicate Organization schema found (${typeCounts.Organization} instances)`);
    }

    if (pageIssues.length > 0) {
      errors += pageIssues.length;
      report.push({ route, status: 'FAIL', details: pageIssues.join(', ') });
    }
  }

  if (errors > 0) {
    console.log('| Route | Status | Issues |');
    console.log('|---|---|---|');
    report.forEach(row => {
      console.log(`| ${row.route} | ❌ FAIL | ${row.details} |`);
    });
    console.error(`\nIntegrity check failed with ${errors} issue(s). Duplicate schemas are not allowed!`);
    process.exit(1);
  } else {
    console.log('✅ Integrity check passed: All pages contain at most one instance of BreadcrumbList, FAQPage, and Organization schemas.');
    process.exit(0);
  }
}

runIntegrityCheck();
