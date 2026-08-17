export const SITE = {
  name: 'Esen 26 Nakliyat',
  legalName: 'Esen Nakliyat & Temizlik & Kolileme',
  shortName: 'Esen Nakliyat',
  url: process.env.NEXT_PUBLIC_SITE_URL || 
       (process.env.VERCEL_ENV === 'production' 
         ? 'https://www.esen26nakliyat.com' 
         : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.esen26nakliyat.com')),
  locale: 'tr_TR',
  description: "Eskişehir içi ve şehirlerarası asansörlü, sigortalı evden eve nakliyat, ofis taşıma ve profesyonel lojistik hizmetleri.",
  phone: '+905320126026',
  phoneDisplay: '0532 012 60 26',
  phoneHref: 'tel:+905320126026',
  whatsapp: '905320126026',
  whatsappHref: 'https://wa.me/905320126026',
  whatsappDefaultHref: 'https://wa.me/905320126026?text=Merhaba,%20Esen%2026%20Nakliyat%20%C3%BCzerinden%20nakliyat%20teklifi%20almak%20istiyorum.',
  email: 'info@esen26nakliyat.com',
  address: {
    street: 'Çamlıca Mahallesi, Olgunluk Sokak, No: 50/6',
    locality: 'Tepebaşı',
    region: 'Eskişehir',
    postalCode: '26180',
    country: 'TR',
  },
  geo: { lat: 39.7794044, lng: 30.4561791 },
  hours: { opens: '08:00', closes: '20:00' },
  foundingYear: 2015,
  priceRange: '₺₺',
  social: {
    facebook: 'https://www.facebook.com/esen26nakliyat',
    instagram: 'https://www.instagram.com/esen26nakliyat',
    youtube: '',
  },
} as const;

export const SERVICES = [
  {
    slug: 'sehirici-evden-eve-nakliyat',
    name: 'Şehiriçi Evden Eve Nakliyat',
    shortName: 'Şehiriçi Nakliyat',
    title: 'Eskişehir Şehir İçi Ev Taşıma | Esen 26 Nakliyat',
    description: "Eskişehir merkez ilçelerinde aynı gün içinde asansörlü, sigortalı ve marangoz montaj dahil şehir içi evden eve nakliyat hizmeti. Hemen sabit fiyat alın.",
    icon: 'Truck',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'sehirlerarasi-evden-eve-nakliyat',
    name: 'Şehirlerarası Evden Eve Nakliyat',
    shortName: 'Şehirlerarası Nakliyat',
    title: 'Eskişehir Şehirlerarası Ev Taşıma | Esen 26 Nakliyat',
    description: "Eskişehir'den Türkiye genelinde 81 ile sigortalı, marangozlu ve sözleşmeli şehirlerarası evden eve nakliyat hizmeti. Sabit fiyat garantisiyle taşının.",
    icon: 'Globe',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'asansorlu-evden-eve-nakliyat',
    name: 'Asansörlü Evden Eve Nakliyat',
    shortName: 'Asansörlü Nakliyat',
    title: 'Eskişehir Asansörlü Ev Taşıma | Esen 26 Nakliyat',
    description: "Eskişehir'de yüksek katlı daireler için 25. kata kadar ulaşan mobil dış cephe eşya asansörü kiralama ve güvenli asansörlü evden eve nakliye hizmeti.",
    icon: 'ArrowUpRight',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'ofis-ve-isyeri-tasimaciligi',
    name: 'Ofis ve İşyeri Taşımacılığı',
    shortName: 'Ofis Taşıma',
    title: 'Eskişehir Ofis ve İşyeri Taşıma | Esen 26 Nakliyat',
    description: "Eskişehir'de kurumsal ofis, arşiv, büro ve işyeri taşıma hizmeti. Numaralı etiketli kutulama, asansörlü taşıma ve sigorta güvencesiyle sıfır kayıp.",
    icon: 'Building2',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'profesyonel-esya-paketleme',
    name: 'Profesyonel Eşya Paketleme',
    shortName: 'Eşya Paketleme',
    title: 'Profesyonel Eşya Paketleme Hizmeti | Esen 26 Nakliyat',
    description: "Eskişehir'de ev taşırken mobilya, beyaz eşya ve kırılacak cam eşyaların çift kat balonlu naylon, Kraft kağıt ve koruma kutularıyla ambalajlanması.",
    icon: 'ShieldCheck',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'ucretsiz-ekspertiz',
    name: 'Ücretsiz Ekspertiz',
    shortName: 'Ücretsiz Ekspertiz',
    title: 'Ücretsiz Ekspertiz Hizmeti | Esen 26 Nakliyat',
    description: "Eskişehir'de taşınma öncesinde eşya hacmini ve asansör kurulum açısını yerinde inceleyerek sabit fiyat teklifi çıkarma süreci.",
    icon: 'FileText',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'esya-depolama',
    name: 'Eşya Depolama',
    shortName: 'Eşya Depolama',
    title: 'Eskişehir Eşya Depolama Hizmeti | Esen 26 Nakliyat',
    description: "Eskişehir'de aylık kiralık eşya depolama çözümleri. Güvenlik kameralı, rutubetsiz ve sigortalı konteyner depolarımızda eşyalarınızı güvenle saklayın.",
    icon: 'Warehouse',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'parca-esya-tasima',
    name: 'Parça Eşya Taşıma',
    shortName: 'Parça Eşya Taşıma',
    title: 'Eskişehir Parça Eşya Taşıma | Esen 26 Nakliyat',
    description: "Eskişehir'de tek parça, az eşya veya öğrenci evi taşımacılığı. Uygun fiyatlı parça eşya nakliye tır ve kamyonetlerimizle hızlı taşıma hizmeti.",
    icon: 'Package',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'piyano-ve-kasa-tasima',
    name: 'Piyano ve Kasa Taşıma',
    shortName: 'Piyano ve Kasa Taşıma',
    title: 'Eskişehir Piyano ve Ağır Kasa Taşıma | Esen 26 Nakliyat',
    description: "Eskişehir'de kuyruklu/duvar piyanosu, çelik para kasası ve hassas ağır yük taşımacılığı. Özel liftli araçlar ve askı sistemleriyle hasarsız transfer.",
    icon: 'Boxes',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'ev-ve-ofis-temizligi',
    name: 'Ev ve Ofis Temizliği',
    shortName: 'Temizlik Hizmetleri',
    title: 'Eskişehir Ev ve Ofis Temizliği Hizmeti | Esen 26',
    description: "Eskişehir'de taşınma öncesi veya sonrası profesyonel ev ve ofis temizliği. Deneyimli temizlik personellerimiz ve kaliteli malzemelerimizle hijyenik temizlik.",
    icon: 'Sparkles',
    updatedAt: '2026-08-16'
  }
] as const;

export const DISTRICTS = [
  {
    slug: 'eskisehir-merkez-evden-eve-nakliyat',
    name: 'Eskişehir Merkez',
    tier: 'merkez',
    neighbors: ['tepebasi', 'odunpazari'],
    distanceKm: 0,
    indexable: true,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'tepebasi-evden-eve-nakliyat',
    name: 'Tepebaşı',
    tier: 'merkez',
    neighbors: ['odunpazari', 'inonu', 'alpu'],
    distanceKm: 0,
    indexable: true,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'odunpazari-evden-eve-nakliyat',
    name: 'Odunpazarı',
    tier: 'merkez',
    neighbors: ['tepebasi', 'seyitgazi', 'alpu'],
    distanceKm: 0,
    indexable: true,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'cifteler-evden-eve-nakliyat',
    name: 'Çifteler',
    tier: 'ilce',
    neighbors: ['mahmudiye', 'han', 'sivrihisar'],
    distanceKm: 65,
    indexable: true,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'sivrihisar-evden-eve-nakliyat',
    name: 'Sivrihisar',
    tier: 'ilce',
    neighbors: ['cifteler', 'gunyuzu', 'alpu'],
    distanceKm: 95,
    indexable: true,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'alpu-evden-eve-nakliyat',
    name: 'Alpu',
    tier: 'ilce',
    neighbors: ['odunpazari', 'tepebasi', 'beylikova'],
    distanceKm: 40,
    indexable: false,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'beylikova-evden-eve-nakliyat',
    name: 'Beylikova',
    tier: 'ilce',
    neighbors: ['alpu', 'mihaliccik'],
    distanceKm: 70,
    indexable: false,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'inonu-evden-eve-nakliyat',
    name: 'İnönü',
    tier: 'ilce',
    neighbors: ['tepebasi'],
    distanceKm: 35,
    indexable: false,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'mahmudiye-evden-eve-nakliyat',
    name: 'Mahmudiye',
    tier: 'ilce',
    neighbors: ['cifteler', 'odunpazari'],
    distanceKm: 50,
    indexable: false,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'mihalgazi-evden-eve-nakliyat',
    name: 'Mihalgazi',
    tier: 'ilce',
    neighbors: ['saricakaya', 'tepebasi'],
    distanceKm: 35,
    indexable: false,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'mihaliccik-evden-eve-nakliyat',
    name: 'Mihalıççık',
    tier: 'ilce',
    neighbors: ['beylikova', 'alpu'],
    distanceKm: 90,
    indexable: false,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'saricakaya-evden-eve-nakliyat',
    name: 'Sarıcakaya',
    tier: 'ilce',
    neighbors: ['mihalgazi', 'tepebasi'],
    distanceKm: 40,
    indexable: false,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'seyitgazi-evden-eve-nakliyat',
    name: 'Seyitgazi',
    tier: 'ilce',
    neighbors: ['odunpazari', 'han'],
    distanceKm: 45,
    indexable: false,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'han-evden-eve-nakliyat',
    name: 'Han',
    tier: 'ilce',
    neighbors: ['seyitgazi', 'cifteler'],
    distanceKm: 80,
    indexable: false,
    updatedAt: '2026-08-16'
  },
  {
    slug: 'gunyuzu-evden-eve-nakliyat',
    name: 'Günyüzü',
    tier: 'ilce',
    neighbors: ['sivrihisar'],
    distanceKm: 130,
    indexable: false,
    updatedAt: '2026-08-16'
  }
] as const;

export const ROUTES = [
  {
    slug: 'eskisehir-istanbul-evden-eve-nakliyat',
    city: 'İstanbul',
    distanceKm: 300,
    durationHours: 4,
    priceRangeMin: 21000,
    priceRangeMax: 27000,
    viaRoute: 'D140 ve Anadolu Otoyolu/O-4',
    notes: 'İstanbul yönündeki taşımalarda, şehir girişindeki trafik kısıtlamaları ve dar sokakların geniş nakliye araçlarına uygunluğu önceden analiz edilmekte, gerekirse mobil asansör kurulumu planlanmaktadır.',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'eskisehir-ankara-evden-eve-nakliyat',
    city: 'Ankara',
    distanceKm: 235,
    durationHours: 3,
    priceRangeMin: 19050,
    priceRangeMax: 25050,
    viaRoute: 'D200/E90 Karayolu',
    notes: 'Ankara merkez ilçelerindeki yüksek katlı rezidans ve sitelere taşımacılık yaparken, eşyalarınızın güvenliği için bina dış cephe asansörlerimiz kullanılmaktadır.',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'eskisehir-izmir-evden-eve-nakliyat',
    city: 'İzmir',
    distanceKm: 410,
    durationHours: 5.5,
    priceRangeMin: 24300,
    priceRangeMax: 30300,
    viaRoute: 'D230 ve O-5 Otoyolu',
    notes: 'Ege Bölgesi nakliyelerinde tır ve kamyon içi sabitleme sistemlerimizle uzun yolda sarsıntı hasarları sıfırlanır, eşyalarınız ambalajlı şekilde teslim edilir.',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'eskisehir-bursa-evden-eve-nakliyat',
    city: 'Bursa',
    distanceKm: 150,
    durationHours: 2,
    priceRangeMin: 16500,
    priceRangeMax: 22500,
    viaRoute: 'D200 Karayolu',
    notes: 'Bursa yönündeki taşımalar genellikle aynı gün içinde teslim edilir. Tarihi ve dar sokaklar için küçük nakliye kamyonetlerimiz hazır bulundurulmaktadır.',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'eskisehir-antalya-evden-eve-nakliyat',
    city: 'Antalya',
    distanceKm: 420,
    durationHours: 5.5,
    priceRangeMin: 24600,
    priceRangeMax: 30600,
    viaRoute: 'D650 Karayolu',
    notes: 'Toros dağ geçişlerindeki dik rampalar ve virajlı yollarda tecrübeli şoförlerimiz ve bakımlı araç filomuzla güvenli nakliye garantisi veriyoruz.',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'eskisehir-kutahya-evden-eve-nakliyat',
    city: 'Kütahya',
    distanceKm: 80,
    durationHours: 1.2,
    priceRangeMin: 14400,
    priceRangeMax: 20400,
    viaRoute: 'D650 Karayolu',
    notes: 'Kısa mesafe avantajı sunan Kütahya taşımalarında yükleme ve yerleştirme işlemleri dahil birkaç saat içinde taşınma tamamlanmaktadır.',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'eskisehir-bilecik-evden-eve-nakliyat',
    city: 'Bilecik',
    distanceKm: 85,
    durationHours: 1.2,
    priceRangeMin: 14550,
    priceRangeMax: 20550,
    viaRoute: 'D650 Karayolu',
    notes: 'Bilecik dik ve engebeli arazi yapısına sahip olduğundan, yük asansörünün kurulacağı zemin açısı ekspertiz ekibimizce önceden incelenmektedir.',
    updatedAt: '2026-08-16'
  },
  {
    slug: 'eskisehir-afyonkarahisar-evden-eve-nakliyat',
    city: 'Afyonkarahisar',
    distanceKm: 130,
    durationHours: 1.8,
    priceRangeMin: 15900,
    priceRangeMax: 21900,
    viaRoute: 'D650 Karayolu',
    notes: 'Afyon kavşak noktası olması sebebiyle transit lojistik rotamız üzerindedir. Güvenli paketleme ve montaj dahil hızlı teslimat sunulur.',
    updatedAt: '2026-08-16'
  }
] as const;
