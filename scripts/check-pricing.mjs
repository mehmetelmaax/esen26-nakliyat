import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = 'C:/Users/mehme/.gemini/antigravity/scratch/esen26-nakliyat';

// Source paths
const factsSrc = path.join(projectRoot, 'src', 'lib', 'facts.ts');
const pricingSrc = path.join(projectRoot, 'src', 'lib', 'pricing.ts');
const configSrc = path.join(projectRoot, 'src', 'lib', 'site-config.ts');

// Temp paths
const tempFacts = path.join(projectRoot, 'scripts', 'temp-facts.mjs');
const tempPricing = path.join(projectRoot, 'scripts', 'temp-pricing.mjs');
const tempConfig = path.join(projectRoot, 'scripts', 'temp-site-config.mjs');

function cleanTs(content) {
  return content
    .replace(/import type\s+[\s\S]*?;/g, '')
    .replace(/export interface PriceInput \{[\s\S]*?\}/g, '')
    .replace(/export interface PriceEstimate \{[\s\S]*?breakdown: \{[\s\S]*?\}[\s\S]*?\}/g, '')
    .replace(/\s+as\s+any/g, '')
    .replace(/\s+as\s+const/g, '')
    .replace(/:\s*'sehirici'\s*\|\s*'ilceler'\s*\|\s*'sehirlerarasi'/g, '')
    .replace(/:\s*'1\+1'\s*\|\s*'2\+1'\s*\|\s*'3\+1'\s*\|\s*'4\+1\+'\s*\|\s*'ofis'/g, '')
    .replace(/:\s*(PriceInput|PriceEstimate|SiteConfig|RouteConfig|DistrictConfig|string|number|boolean|any)/g, '')
    .replace(/:\s*readonly\s+(DistrictConfig|ServiceConfig|RouteConfig)\[\]/g, '')
    .replace(/:\s*(readonly\s+)?(string|number|boolean)\[\]/g, '')
    .replace(/as const;/g, ';')
    .replace(/from\s+'\.\/facts'/g, "from './temp-facts.mjs'")
    .replace(/from\s+'\.\/site-config'/g, "from './temp-site-config.mjs'")
    .replace(/function\s+(\w+)\s*\(([\s\S]*?)\)\s*:\s*\w+/g, 'function $1($2)');
}

async function run() {
  console.log('--- RUNNING PRICING CONSISTENCY AUDIT ---');
  
  // 1. Strip TS annotations and create temp JS modules
  fs.writeFileSync(tempFacts, cleanTs(fs.readFileSync(factsSrc, 'utf8')), 'utf8');
  fs.writeFileSync(tempPricing, cleanTs(fs.readFileSync(pricingSrc, 'utf8')), 'utf8');
  fs.writeFileSync(tempConfig, cleanTs(fs.readFileSync(configSrc, 'utf8')), 'utf8');
  
  // 2. Import them dynamically
  const { FACTS } = await import('./temp-facts.mjs');
  const { estimatePrice } = await import('./temp-pricing.mjs');
  const { ROUTES } = await import('./temp-site-config.mjs');
  
  let hasErrors = false;
  
  console.log(`Checking ${ROUTES.length} intercity routes against estimatePrice...`);
  
  ROUTES.forEach(route => {
    const est = estimatePrice({
      rooms: '1+1',
      fromFloor: 1,
      toFloor: 1,
      fromElevator: false,
      toElevator: false,
      distanceType: 'sehirlerarasi',
      packing: false,
      carpentry: false,
      storage: false,
      distanceKm: route.distanceKm
    });
    
    const minDiff = Math.abs(est.min - route.priceRangeMin) / route.priceRangeMin;
    const maxDiff = Math.abs(est.max - route.priceRangeMax) / route.priceRangeMax;
    
    if (minDiff > 0.1 || maxDiff > 0.1) {
      hasErrors = true;
      console.error(`❌ Pricing deviation for route "${route.slug}" (${route.distanceKm} Km):`);
      console.error(`   - Route Min: ₺${route.priceRangeMin} vs Engine Min: ₺${est.min} (Diff: ${(minDiff * 100).toFixed(1)}%)`);
      console.error(`   - Route Max: ₺${route.priceRangeMax} vs Engine Max: ₺${est.max} (Diff: ${(maxDiff * 100).toFixed(1)}%)`);
    } else {
      console.log(`✅ Route "${route.slug}" is consistent (Min diff: ${(minDiff * 100).toFixed(1)}%, Max diff: ${(maxDiff * 100).toFixed(1)}%)`);
    }
  });
  
  // Clean up temp files
  try {
    fs.unlinkSync(tempFacts);
    fs.unlinkSync(tempPricing);
    fs.unlinkSync(tempConfig);
  } catch (e) {}
  
  if (hasErrors) {
    console.error('\n❌ Pricing consistency audit failed.');
    process.exit(1);
  } else {
    console.log('\n✅ Pricing consistency audit passed successfully!');
    process.exit(0);
  }
}

run().catch(err => {
  console.error('Error during pricing check:', err);
  try {
    fs.unlinkSync(tempFacts);
    fs.unlinkSync(tempPricing);
    fs.unlinkSync(tempConfig);
  } catch (e) {}
  process.exit(1);
});
