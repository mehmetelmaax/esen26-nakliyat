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

function runNapCheck() {
  const htmlFiles = getHtmlFiles(appBuildDir);
  console.log(`--- RUNNING NAP CONSISTENCY AUDIT ---`);
  console.log(`Scanning ${htmlFiles.length} pages for Name, Address, Phone (NAP) consistency...\n`);

  // Target values
  const allowedPhones = ['+905320126026', '0532 012 60 26', '905320126026', '05320126026', '+90 532 012 60 26'];
  const allowedAddressPatterns = [/olgunluk/i, /çamlıca/i, /tepebaşı/i];

  let errors = 0;
  const report = [];

  for (const file of htmlFiles) {
    const relativePath = path.relative(appBuildDir, file);
    const route = '/' + relativePath.replace('.html', '').replace('\\', '/').replace('index', '');
    const html = fs.readFileSync(file, 'utf8');

    const pageErrors = [];

    // 1. Check Phone Numbers
    // Find all phone-like patterns, e.g., tel: links or 10-11 digit numbers starting with 5 or 05
    const telLinkMatches = [...html.matchAll(/href="tel:([^"]+)"/g)].map(m => m[1]);
    for (const tel of telLinkMatches) {
      const cleanTel = tel.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
      if (!allowedPhones.some(p => p.replace(/\s+/g, '') === cleanTel)) {
        pageErrors.push(`Prohibited phone in tel link: "${tel}"`);
      }
    }

    // Scan for text phone matches (e.g. 05xx xxx xx xx or similar)
    const textPhoneMatches = [...html.matchAll(/(?:\+90\s*|0\s*)?5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}/g)].map(m => m[0]);
    for (const phone of textPhoneMatches) {
      const cleanPhone = phone.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
      // Check if it ends with the clean phone digits
      const matchFound = allowedPhones.some(p => {
        const cleanP = p.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
        return cleanPhone.endsWith(cleanP) || cleanP.endsWith(cleanPhone);
      });
      if (!matchFound) {
        pageErrors.push(`Prohibited text phone: "${phone}"`);
      }
    }

    // 2. Check Address
    // Verify that if "Olgunluk" is mentioned, the address contains Tepebaşı, Çamlıca, and Olgunluk
    if (html.toLowerCase().includes('olgunluk')) {
      const hasCorrectAddress = allowedAddressPatterns.every(pattern => pattern.test(html));
      if (!hasCorrectAddress) {
        pageErrors.push('Inconsistent address: mention of "Olgunluk" found, but address parts do not match SITE definition');
      }
    }

    if (pageErrors.length > 0) {
      errors += pageErrors.length;
      report.push({ route, details: pageErrors.join(', ') });
    }
  }

  if (errors > 0) {
    console.log('| Route | Issues |');
    console.log('|---|---|');
    report.forEach(row => {
      console.log(`| ${row.route} | ❌ FAIL: ${row.details} |`);
    });
    console.error(`\nNAP consistency audit failed with ${errors} issue(s). All contacts must match SITE definition!`);
    process.exit(1);
  } else {
    console.log('✅ NAP consistency audit passed successfully! All names, addresses, and phone numbers are consistent.');
    process.exit(0);
  }
}

runNapCheck();
