const TR_MAP: Record<string, string> = {
  'ç':'c','Ç':'c','ğ':'g','Ğ':'g','ı':'i','I':'i','İ':'i','i':'i',
  'ö':'o','Ö':'o','ş':'s','Ş':'s','ü':'u','Ü':'u'
};

/**
 * Türkçe karakterleri güvenli bir şekilde ASCII karşılıklarına çevirerek slug üreten fonksiyon.
 * JS locale farklarından etkilenmeden tutarlı sonuç verir.
 */
export function generateSlug(text: string): string {
  if (!text) return '';
  
  let result = '';
  // Türkçe karakter eşleştirmesi
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    result += TR_MAP[char] !== undefined ? TR_MAP[char] : char;
  }
  
  return result
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')    // Alfanumerik, boşluk ve tire dışındakileri at
    .replace(/\s+/g, '-')            // Boşlukları tire yap
    .replace(/-+/g, '-')             // Ardışık tireleri teke indir
    .replace(/^-+|-+$/g, '');        // Baş/son tireleri kırp
}

export function locative(name: string): string {
  if (!name) return '';
  const clean = name.trim();
  const lastChar = clean[clean.length - 1].toLowerCase();
  
  // Sert ünsüzler: f, s, t, k, ç, ş, h, p
  const isSert = 'fstkçşhp'.includes(lastChar);
  const tOrD = isSert ? 't' : 'd';
  
  // Son ünlü harfi bulalım
  let lastVowel = '';
  for (let i = clean.length - 1; i >= 0; i--) {
    const char = clean[i].toLowerCase();
    if ('aıoueiöü'.includes(char)) {
      lastVowel = char;
      break;
    }
  }
  
  const isBack = 'aıou'.includes(lastVowel);
  const aOrE = isBack ? 'a' : 'e';
  
  // Özel durum: Tepebaşı ve Odunpazarı için -nda / -nde eklenir
  if (clean.endsWith('ı') && (clean.toLowerCase().includes('basi') || clean.toLowerCase().includes('pazari') || clean.toLowerCase().includes('baş') || clean.toLowerCase().includes('pazar'))) {
    return `${clean}'nda`;
  }
  
  return `${clean}'${tOrD}${aOrE}`;
}

export function locativeKi(name: string): string {
  const loc = locative(name);
  return `${loc}ki`;
}

export function genitive(name: string): string {
  if (!name) return '';
  const clean = name.trim();
  const lastChar = clean[clean.length - 1].toLowerCase();
  const isVowel = 'aıoueiöü'.includes(lastChar);
  
  let lastVowel = '';
  for (let i = clean.length - 1; i >= 0; i--) {
    const char = clean[i].toLowerCase();
    if ('aıoueiöü'.includes(char)) {
      lastVowel = char;
      break;
    }
  }
  
  let suffix = '';
  if (lastVowel === 'a' || lastVowel === 'ı') {
    suffix = isVowel ? 'nın' : 'ın';
  } else if (lastVowel === 'e' || lastVowel === 'i') {
    suffix = isVowel ? 'nin' : 'in';
  } else if (lastVowel === 'o' || lastVowel === 'u') {
    suffix = isVowel ? 'nun' : 'un';
  } else if (lastVowel === 'ö' || lastVowel === 'ü') {
    suffix = isVowel ? 'nün' : 'ün';
  }
  
  return `${clean}'${suffix}`;
}
