import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const metadataPath = path.join(__dirname, '..', 'src', 'lib', 'blog-metadata.ts');

async function runFreshnessAudit() {
  console.log(`--- RUNNING CONTENT FRESHNESS AUDIT ---`);
  
  if (!fs.existsSync(metadataPath)) {
    console.log('⚠️ blog-metadata.ts not found, skipping freshness audit.');
    process.exit(0);
  }

  const content = fs.readFileSync(metadataPath, 'utf8');
  const metaIndex = content.indexOf('blogMetadata');
  const jsonStart = content.indexOf('{', metaIndex);
  const jsonEnd = content.lastIndexOf('}');
  if (metaIndex === -1 || jsonStart === -1 || jsonEnd === -1) {
    console.error('❌ Failed to parse blog-metadata.ts for freshness check.');
    process.exit(1);
  }
  
  const jsonText = content.substring(jsonStart, jsonEnd + 1);
  let blogMetadata;
  try {
    blogMetadata = JSON.parse(jsonText);
  } catch (err) {
    console.error('❌ JSON parse error for freshness check:', err);
    process.exit(1);
  }

  const posts = Object.values(blogMetadata);
  const now = new Date();
  const sixMonthsInMs = 180 * 24 * 60 * 60 * 1000; // 180 days

  console.log(`Auditing freshness for ${posts.length} blog posts...\n`);

  let staleCount = 0;
  posts.forEach(post => {
    const postDate = new Date(post.date);
    const ageMs = now.getTime() - postDate.getTime();
    
    if (ageMs > sixMonthsInMs) {
      const ageDays = Math.floor(ageMs / (24 * 60 * 60 * 1000));
      console.warn(`⚠️ Warning: Blog post "${post.title}" (${post.id}) is ${ageDays} days old (last updated: ${post.date}).`);
      console.warn(`   Consider updating its content and updating the date to refresh Google SGE/freshness signals.\n`);
      staleCount++;
    }
  });

  console.log(`Freshness Audit Summary:`);
  console.log(`- Audited posts: ${posts.length}`);
  console.log(`- Stale posts (older than 6 months): ${staleCount}`);
  
  console.log('\n✅ Content freshness audit completed.');
  process.exit(0);
}

runFreshnessAudit();
