import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const targets = [];

// Add all bolgeler page files
const bolgelerDir = path.join(projectRoot, 'src', 'app', 'bolgeler');
if (fs.existsSync(bolgelerDir)) {
  fs.readdirSync(bolgelerDir).forEach(dir => {
    const filePath = path.join(bolgelerDir, dir, 'page.tsx');
    if (fs.existsSync(filePath)) {
      targets.push(path.relative(projectRoot, filePath));
    }
  });
}

// Add all hizmetler page files
const hizmetlerDir = path.join(projectRoot, 'src', 'app', 'hizmetler');
if (fs.existsSync(hizmetlerDir)) {
  fs.readdirSync(hizmetlerDir).forEach(dir => {
    const filePath = path.join(hizmetlerDir, dir, 'page.tsx');
    if (fs.existsSync(filePath)) {
      targets.push(path.relative(projectRoot, filePath));
    }
  });
}

// Add pricing page
targets.push('src/app/adana-nakliyat-fiyatlari/page.tsx');

targets.forEach(relPath => {
  const filePath = path.join(projectRoot, relPath);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Add Import if missing
  if (!content.includes("import QuoteForm from '@/components/QuoteForm'")) {
    // Insert import at the top
    content = "import QuoteForm from '@/components/QuoteForm';\n" + content;
  }

  // 2. Locate and replace CTA block
  if (relPath === 'src/app/adana-nakliyat-fiyatlari/page.tsx') {
    // For pricing page, insert above RelatedLinks
    if (!content.includes('<QuoteForm isInline={true} />')) {
      const targetStr = '            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">';
      // Find where we can insert it
      // Let's insert before RelatedLinks
      const relatedLinksStr = '<RelatedLinks currentSlug="adana-nakliyat-fiyatlari" type="blog" title="Yararlı Bağlantılar ve Rehberler" />';
      if (content.includes(relatedLinksStr)) {
        content = content.replace(
          relatedLinksStr,
          `{/* Quick Quote Form */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl border-b border-gray-light pb-3">
              Ücretsiz Sabit Fiyat Teklifi Alın
            </h2>
            <QuoteForm isInline={true} />
          </div>

          ` + relatedLinksStr
        );
      }
    }
  } else {
    // For service and district pages
    // Match the CTA block starting with bg-navy rounded-xl p-8 and ending before </section>
    // We can match:
    // <div className="bg-navy rounded-xl p-8 text-center text-white space-y-6"> ... </div>
    // Let's find the substring from `<div className="bg-navy rounded-xl p-8` to the end of that block
    const ctaStartIdx = content.indexOf('<div className="bg-navy rounded-xl p-8');
    if (ctaStartIdx !== -1) {
      // Find the closing </div> of this block by counting open/close tags
      let openTags = 1;
      let ptr = ctaStartIdx + '<div'.length;
      let endIdx = -1;

      while (openTags > 0 && ptr < content.length) {
        if (content.substring(ptr, ptr + 4) === '<div') {
          openTags++;
          ptr += 4;
        } else if (content.substring(ptr, ptr + 5) === '</div') {
          openTags--;
          if (openTags === 0) {
            endIdx = ptr + 6; // Include closing tag </div>
            break;
          }
          ptr += 5;
        } else {
          ptr++;
        }
      }

      if (endIdx !== -1) {
        const ctaBlock = content.substring(ctaStartIdx, endIdx);
        // Replace with inline QuoteForm
        const replacement = `
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h3 className="font-display font-bold text-navy text-xl md:text-2xl border-b border-gray-light pb-3">
              Hızlı ve Sabit Fiyat Teklifi Hesaplayın
            </h3>
            <QuoteForm isInline={true} />
          </div>
        `.trim();

        content = content.substring(0, ctaStartIdx) + replacement + content.substring(endIdx);
      }
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Inlined QuoteForm in: ${relPath}`);
  }
});
