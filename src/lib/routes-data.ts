export interface RouteData {
  slug: string;
  city: string;
  distanceKm: number;
  durationHours: number;
  priceRangeMin: number;
  priceRangeMax: number;
  viaRoute: string;
  notes: string;
  introText: string;
  distanceText: string;
  pricingText: string;
  routeText: string;
  insuranceText: string;
  tipsText: string;
  faq: { question: string; answer: string }[];
}

export const routesDatabase: Record<string, RouteData> = {
  'eskisehir-istanbul-evden-eve-nakliyat': {
    slug: 'eskisehir-istanbul-evden-eve-nakliyat',
    city: 'İstanbul',
    distanceKm: 300,
    durationHours: 4,
    priceRangeMin: 27000,
    priceRangeMax: 38000,
    viaRoute: 'D140 ve Anadolu Otoyolu/O-4',
    notes: 'İstanbul yönündeki taşımalarda, şehir girişindeki trafik kısıtlamaları ve dar sokakların geniş nakliye araçlarına uygunluğu önceden analiz edilmekte, gerekirse mobil asansör kurulumu planlanmaktadır.',
    introText: "Esen 26 Nakliyat, Eskişehir'den İstanbul'un tüm ilçelerine profesyonel, K3 yetki belgeli ve sigortalı şehirlerarası evden eve nakliyat hizmeti vermektedir. Uzun mesafe taşımacılığında uzman kadromuz, eşyalarınızın yol boyunca sarsıntı ve darbelere karşı zarar görmemesi için çift kat pıtpıt naylon ve özel kalın ambalaj malzemeleriyle koruma sağlar. Sabit fiyat garantimiz ile Eskişehir'den yola çıkan kamyonumuz, İstanbul'da kapıda ek ücret sürprizi yaşatmadan eşyalarınızı yeni dairenize teslim eder.",
    distanceText: "Eskişehir ile İstanbul arası karayolu mesafesi yaklaşık 300 kilometredir ve ev eşyası taşımacılığında teslimat süresi ortalama 1 gündür. Genellikle sabah saatlerinde yüklenen araçlarımız aynı gün akşamüstü veya ertesi gün sabahı İstanbul adresinizde olmaktadır. İlk gün Eskişehir'de de-montaj, paketleme ve yükleme işlemleri tamamlanır ve aracımız yola çıkar.",
    pricingText: "Eskişehir ile İstanbul arası nakliyat fiyatları Esen 26 Nakliyat tarafından 27.000 TL'den başlayarak hesaplanmaktadır. Fiyat teklifimize K3 belgeli kapalı kasa kamyon, paketleme malzemeleri, marangoz hizmeti, sigorta poliçesi ve asansör kurulumu dahildir. Daire oda sayısına ve kat durumlarına göre fiyatlar değişiklik gösterebilir.",
    routeText: "Eskişehir'den İstanbul'a giden araçlarımız sırasıyla Eskişehir - Bozüyük - Bilecik - Sakarya - Kocaeli güzergâhını takip eder. İstanbul sınırlarına girildiğinde ağır vasıtalar için zorunlu olan Yavuz Sultan Selim Köprüsü ve Kuzey Marmara Otoyolu bağlantısı kullanılır. Her sevkiyatımız anlık konum bilgisiyle takip edilmektedir.",
    insuranceText: "Esen 26 Nakliyat şehirlerarası nakliyat seferlerinin tamamını Anadolu Sigorta güvencesiyle geniş kapsamlı emtia taşıma sigortası ile koruma altına almaktadır. Eskişehir'den yüklenen eşyalarınız İstanbul'daki yeni adresinizde teslim edilene kadar oluşabilecek kaza, yangın, doğal afet risklerine karşı sigortalanır.",
    tipsText: "İstanbul'a taşınırken dikkat edilmesi gereken en kritik husus, şehir içi dar sokaklar ve site yönetimlerinin taşıma saatleri kısıtlamalarıdır. Kadıköy, Şişli gibi dar sokaklarda büyük kamyon yanaşamazsa küçük aktarma kamyonetlerimizle hizmet vermekteyiz.",
    faq: [
      { question: "Eskişehir İstanbul nakliye süreci kaç gün sürer?", answer: "Genellikle Eskişehir'de yükleme yapılan araçlarımız aynı gün veya ertesi gün sabah İstanbul'da teslimatı tamamlar." },
      { question: "İstanbul'da dar sokaklarda taşıma nasıl yapılıyor?", answer: "Büyük kamyonumuzun giremediği dar sokaklarda küçük aktarma kamyonetleri (pikap/kamyonet) kullanarak eşyaları güvenle taşırız." },
      { question: "Sigorta poliçesi neleri kapsar?", answer: "Sigorta poliçemiz yol kazaları, devrilme, yangın ve hırsızlık gibi majör riskleri yasal olarak güvence altına alır." }
    ]
  },
  'eskisehir-ankara-evden-eve-nakliyat': {
    slug: 'eskisehir-ankara-evden-eve-nakliyat',
    city: 'Ankara',
    distanceKm: 235,
    durationHours: 3,
    priceRangeMin: 25000,
    priceRangeMax: 34000,
    viaRoute: 'D200/E90 Karayolu',
    notes: 'Ankara merkez ilçelerindeki yüksek katlı rezidans ve sitelere taşımacılık yaparken, eşyalarınızın güvenliği için bina dış cephe asansörlerimiz kullanılmaktadır.',
    introText: "Esen 26 Nakliyat, Eskişehir'den başkent Ankara'nın tüm ilçelerine asansörlü ve marangozlu evden eve nakliyat çözümleri sunmaktadır. Haftalık düzenli seferler düzenleyen firmamız, parça eşyalarınızı veya komple evinizi profesyonel standartlarda taşır. K3 yetki belgeli araçlarımız ve kadrolu ekibimiz, Eskişehir'deki de-montaj işlemlerinden Ankara'daki anahtar teslim montaj sürecine kadar tüm adımları titizlikle yürütür.",
    distanceText: "Eskişehir ile Ankara arası karayolu mesafesi yaklaşık 235 kilometredir ve ev eşyası taşımacılığında sürüş süresi ortalama 3 saattir. Sabah başlanan yükleme işlemleri sonrasında aracımız aynı gün öğleden sonra Ankara'ya ulaşır ve boşaltma/kurulum işlemlerine geçilir.",
    pricingText: "Eskişehir ile Ankara arası nakliyat fiyatları Esen 26 Nakliyat tarafından 25.000 TL'den başlayarak hesaplanmaktadır. Fiyatlarımıza paketleme, marangoz montajı, sigorta ve nakliye asansörleri dahildir. Eşya hacmine ve bina kat durumlarına göre net fiyat teklifi belirlenir.",
    routeText: "Eskişehir'den Ankara'ya giden araçlarımız doğrudan D200/E90 karayolunu kullanır. Güzergâh sırasıyla Eskişehir - Mahmudiye - Sivrihisar - Polatlı hattı üzerinden Ankara merkeze ulaşır. Yol son derece düzgün ve konforludur, eşyalar minimum sarsıntıya maruz kalır.",
    insuranceText: "Esen 26 Nakliyat şehirlerarası nakliyat seferlerinin tamamını Anadolu Sigorta güvencesiyle koruma altına almaktadır. Eşyalarınız karayolunda seyir halindeyken yaşanabilecek her türlü kaza, devrilme, yangın riskine karşı tam bedel üzerinden sigortalanır.",
    tipsText: "Ankara'da Çankaya, Keçiören, Batıkent gibi bölgelerde rezidans ve yüksek apartmanlar yoğundur. Bu binalarda asansör kurulum alanının açık olması ve site yönetiminden taşınma izninin alınmış olması taşınma gününün sorunsuz geçmesini sağlar.",
    faq: [
      { question: "Eskişehir Ankara nakliyat kaç saat sürer?", answer: "Yükleme bittikten sonra iki şehir arası yolculuk ortalama 3 saattir. Aynı gün içinde kurulum tamamlanır." },
      { question: "Ankara'da yüksek katlı dairelere asansör kuruluyor mu?", answer: "Evet, Ankara'daki yeni dairenizde dış cephe asansörü kurulumuna uygun yer bulunması halinde mobil asansör desteği veriyoruz." }
    ]
  },
  'eskisehir-izmir-evden-eve-nakliyat': {
    slug: 'eskisehir-izmir-evden-eve-nakliyat',
    city: 'İzmir',
    distanceKm: 410,
    durationHours: 5.5,
    priceRangeMin: 31000,
    priceRangeMax: 42000,
    viaRoute: 'D230 ve O-5 Otoyolu',
    notes: 'Ege Bölgesi nakliyelerinde tır ve kamyon içi sabitleme sistemlerimizle uzun yolda sarsıntı hasarları sıfırlanır, eşyalarınız ambalajlı şekilde teslim edilir.',
    introText: "Esen 26 Nakliyat, Eskişehir'den İzmir'in tüm ilçelerine profesyonel, K3 belgeli ve sigortalı şehirlerarası evden eve nakliyat hizmeti sağlamaktadır. Lojistik kadromuz eşyalarınızı uzun yola hazırlarken çift kat balonlu ambalaj naylonları ve koruyucu stretch filmler kullanmaktadır.",
    distanceText: "Eskişehir ile İzmir arası karayolu mesafesi yaklaşık 410 kilometredir. Ev eşyası taşıyan araçlarımızın sürüş süresi ortalama 5.5 saattir. Sabah Eskişehir'de yüklenen aracımız, aynı gün akşam saatlerinde İzmir'deki yeni adresinize ulaşarak yerleştirme işlemine başlayabilmektedir.",
    pricingText: "Eskişehir ile İzmir arası nakliyat fiyatları Esen 26 Nakliyat tarafından 31.000 TL'den başlayarak hesaplanmaktadır. Kat yükseklikleri, eşya miktarı ve mobil asansör talebi fiyatı etkileyen temel unsurlardır.",
    routeText: "Eskişehir'den İzmir'e giden araçlarımız sırasıyla Eskişehir - Kütahya - Afyonkarahisar - Uşak - Manisa - İzmir güzergâhını takip eder. Güvenli sürüş kuralları çerçevesinde şoförlerimiz hız sınırlarına uygun seyreder.",
    insuranceText: "Eskişehir İzmir arası tüm lojistik operasyonlarımız emtia taşıma sigortası kapsamındadır. Eşyalarınız yola çıktığı andan itibaren İzmir'deki yeni adresinizde teslim edilene dek Anadolu Sigorta güvencesindedir.",
    tipsText: "İzmir'de Karşıyaka, Bornova veya Konak gibi yoğun ilçelerde dar sokaklar ve park yasakları olabilmektedir. Taşınma öncesinde belediyeden veya site yönetiminden yer ayırtılması süreci hızlandırır.",
    faq: [
      { question: "Eskişehir İzmir taşınması kaç gün sürer?", answer: "Eşya yüklemesi tamamlandıktan sonra genellikle 1 gün içinde (ertesi gün sabah) İzmir'de teslimat gerçekleştirilir." }
    ]
  },
  'eskisehir-bursa-evden-eve-nakliyat': {
    slug: 'eskisehir-bursa-evden-eve-nakliyat',
    city: 'Bursa',
    distanceKm: 150,
    durationHours: 2,
    priceRangeMin: 22000,
    priceRangeMax: 28000,
    viaRoute: 'D200 Karayolu',
    notes: 'Bursa yönündeki taşımalar genellikle aynı gün içinde teslim edilir. Tarihi ve dar sokaklar için küçük nakliye kamyonetlerimiz hazır bulundurulmaktadır.',
    introText: "Esen 26 Nakliyat, Eskişehir'den komşu ilimiz Bursa'ya hızlı ve güvenilir evden eve nakliyat çözümleri sunmaktadır. İki şehir arasındaki mesafe kısa olduğundan eşyalarınız aynı gün içerisinde paketlenip taşınarak yeni evinize kurulur.",
    distanceText: "Eskişehir ile Bursa arası mesafe 150 kilometredir. Kamyonlarımızın sürüş süresi yaklaşık 2 saattir. Sabah 08:00'de başlayan taşınma operasyonu öğleden sonra Bursa'da boşaltma ile devam eder ve akşam saatlerinde başarıyla bitirilir.",
    pricingText: "Eskişehir Bursa arası nakliyat fiyatları 22.000 TL ile 28.000 TL arasında değişmektedir. Kısa mesafe lojistik avantajıyla bütçe dostu, sabit fiyatlı taşıma hizmeti veriyoruz.",
    routeText: "Eskişehir'den Bursa'ya giden araçlarımız D200 karayolunu kullanarak Bozüyük - İnegöl hattından Bursa merkeze ulaşır. İnegöl geçişindeki yoğun mobilya lojistik trafiğine ve hava şartlarına dikkat edilerek ilerlenir.",
    insuranceText: "Bursa yönündeki tüm nakliyelerimiz sigortalıdır. Karayolunda oluşabilecek her türlü kaza ve hasar durumuna karşı emtia sigortamız devreye girer.",
    tipsText: "Bursa'nın Osmangazi, Yıldırım gibi tarihi bölgelerinde sokaklar oldukça dar ve yokuşludur. Bu alanlar için ekiplerimiz önceden küçük aktarma araçları planlamaktadır.",
    faq: [
      { question: "Aynı gün teslimat yapılıyor mu?", answer: "Evet, Eskişehir-Bursa nakliyat işlemleri kısa mesafe olması sayesinde tamamen aynı gün içerisinde tamamlanır." }
    ]
  },
  'eskisehir-antalya-evden-eve-nakliyat': {
    slug: 'eskisehir-antalya-evden-eve-nakliyat',
    city: 'Antalya',
    distanceKm: 420,
    durationHours: 5.5,
    priceRangeMin: 30000,
    priceRangeMax: 42000,
    viaRoute: 'D650 Karayolu',
    notes: 'Toros dağ geçişlerindeki dik rampalar ve virajlı yollarda tecrübeli şoförlerimiz ve bakımlı araç filomuzla güvenli nakliye garantisi veriyoruz.',
    introText: "Esen 26 Nakliyat, Eskişehir'den Antalya'ya profesyonel, K3 belgeli evden eve taşımacılık hizmeti sunar. Akdeniz hattındaki yazlık ve kışlık taşınma ihtiyaçlarınızda tecrübeli ekibimizle yanınızdayız.",
    distanceText: "Eskişehir ile Antalya arası karayolu mesafesi yaklaşık 420 kilometredir. Sürüş süresi yaklaşık 5.5 saattir. Yolculuk esnasında araçlarımız D650 karayolu üzerinden hareket eder.",
    pricingText: "Eskişehir Antalya arası nakliyat fiyatları 30.000 TL'den başlamaktadır. Fiyatlarımıza asansör kurulumu, paketleme, de-montaj ve montaj dahildir.",
    routeText: "Eskişehir'den Antalya'ya giden araçlarımız sırasıyla Eskişehir - Kütahya - Afyonkarahisar - Burdur (veya Isparta) - Antalya güzergâhını takip eder. Toroslar geçişinde kontrollü sürüş sağlanır.",
    insuranceText: "Tüm Eskişehir-Antalya nakliye seferlerimiz Anadolu Sigorta poliçesiyle teminat altına alınmıştır. Yolculuk boyu eşyalarınız güvendedir.",
    tipsText: "Antalya'da yaz aylarında aşırı sıcaklar yaşanır. Eşyalarınızın sıcaklıktan etkilenmemesi ve rutubet oluşmaması için havalandırmalı kapalı kasalarımız kullanılır.",
    faq: [
      { question: "Antalya taşınması kaç günde tamamlanır?", answer: "Eskişehir'de yüklenen kamyonumuz genellikle ertesi gün sabah Antalya'da boşaltma ve kurulumu tamamlar." }
    ]
  },
  'eskisehir-kutahya-evden-eve-nakliyat': {
    slug: 'eskisehir-kutahya-evden-eve-nakliyat',
    city: 'Kütahya',
    distanceKm: 80,
    durationHours: 1.2,
    priceRangeMin: 20000,
    priceRangeMax: 24000,
    viaRoute: 'D650 Karayolu',
    notes: 'Kısa mesafe avantajı sunan Kütahya taşımalarında yükleme ve yerleştirme işlemleri dahil birkaç saat içinde taşınma tamamlanmaktadır.',
    introText: "Esen 26 Nakliyat, Eskişehir ile Kütahya arasında günlük nakliye seferleri sunmaktadır. Yakın mesafe taşımacılığında en uygun fiyatlı ve hızlı çözümleri üretiyoruz.",
    distanceText: "Eskişehir Kütahya arası karayolu mesafesi 80 kilometredir. Araçlarımızın sürüş süresi ortalama 1 saat 15 dakikadır.",
    pricingText: "Eskişehir Kütahya arası ev taşıma fiyatları 20.000 TL ile 24.000 TL arasında değişmektedir. Kısa mesafe lojistik tarifeleri uygulanmaktadır.",
    routeText: "Araçlarımız D650 karayolu üzerinden doğrudan Eskişehir'den Kütahya'ya ulaşır. Yol konforlu ve çift şeritlidir.",
    insuranceText: "Eskişehir ile Kütahya arasındaki kısa mesafe taşımalarımızda da Esen 26 Nakliyat tarafından emtia nakliye sigortası poliçesi düzenlenerek eşyalarınızın güvenliği yasal koruma altına alınmaktadır.",
    tipsText: "Taşınma günü site içi asansör kurulum alanlarının müsaitliği ve bina kat bilgileri netleştirilmelidir.",
    faq: [
      { question: "Kütahya nakliyatı ne kadar sürer?", answer: "Yükleme, yol ve boşaltma dahil olmak üzere tüm süreç ortalama 4-5 saat içerisinde tamamlanır." }
    ]
  },
  'eskisehir-bilecik-evden-eve-nakliyat': {
    slug: 'eskisehir-bilecik-evden-eve-nakliyat',
    city: 'Bilecik',
    distanceKm: 85,
    durationHours: 1.2,
    priceRangeMin: 20000,
    priceRangeMax: 25000,
    viaRoute: 'D650 Karayolu',
    notes: 'Bilecik dik ve engebeli arazi yapısına sahip olduğundan, yük asansörünün kurulacağı zemin açısı ekspertiz ekibimizce önceden incelenmektedir.',
    introText: "Esen 26 Nakliyat, Eskişehir'den komşu ilimiz Bilecik ve ilçelerine (Bozüyük, Söğüt, Osmaneli) K3 belgeli araçlarıyla ev taşıma hizmeti sunmaktadır.",
    distanceText: "Eskişehir Bilecik arası mesafe 85 kilometredir. Sürüş süresi yaklaşık 1 saat 15 dakikadır. Yolculuk D650 Bilecik yolu üzerinden gerçekleşir.",
    pricingText: "Eskişehir Bilecik nakliye bütçesi 20.000 TL'den başlamaktadır. Paketleme ve marangozluk gibi ek hizmetler fiyata dahildir.",
    routeText: "Eskişehir'den çıkan araçlarımız D650 karayolu üzerinden Bozüyük - Bilecik yönüne ilerler. Bilecik rampalarında emniyetli sürüş önceliğimizdir.",
    insuranceText: "Tüm taşımalarımızda olduğu gibi Eskişehir-Bilecik nakliye seferlerinde de eşyalarınız taşıma sigortası poliçesiyle korunur.",
    tipsText: "Bilecik engebeli bir araziye sahiptir. Taşınacağınız dairede dış cephe asansörü kurulacaksa zemin eğimi kontrol edilmelidir.",
    faq: [
      { question: "Bozüyük ilçesine de taşıma yapıyor musunuz?", answer: "Evet, Bilecik merkez ve Bozüyük başta olmak üzere tüm ilçelerine günlük servisimiz vardır." }
    ]
  },
  'eskisehir-afyonkarahisar-evden-eve-nakliyat': {
    slug: 'eskisehir-afyonkarahisar-evden-eve-nakliyat',
    city: 'Afyonkarahisar',
    distanceKm: 130,
    durationHours: 1.8,
    priceRangeMin: 22000,
    priceRangeMax: 26000,
    viaRoute: 'D650 Karayolu',
    notes: 'Afyon kavşak noktası olması sebebiyle transit lojistik rotamız üzerindedir. Güvenli paketleme ve montaj dahil hızlı teslimat sunulur.',
    introText: "Esen 26 Nakliyat, Eskişehir ile Afyonkarahisar arasında profesyonel ev taşıma ve asansörlü nakliyat hizmeti sağlamaktadır.",
    distanceText: "Eskişehir Afyonkarahisar arası mesafe yaklaşık 130 kilometredir. Kamyonlarımızın sürüş süresi yaklaşık 1 saat 45 dakikadır.",
    pricingText: "Eskişehir Afyon nakliyat fiyatları 22.000 TL ile 26.000 TL aralığındadır. Fiyata tüm montaj, de-montaj ve paketleme süreçleri dahildir.",
    routeText: "Araçlarımız D650 karayolunu kullanarak Seyitgazi - Kırka üzerinden veya Kütahya güzergâhından Afyon'a ulaşır.",
    insuranceText: "Taşıma esnasında yaşanabilecek kaza ve hasarlara karşı sigortalı nakliyat sözleşmesi düzenlenmektedir.",
    tipsText: "Eşyaların zarar görmemesi için de-montaj esnasında tüm mobilya vidaları ve parçaları numaralandırılarak paketlenir.",
    faq: [
      { question: "Afyon nakliyesi ne kadar sürer?", answer: "Eskişehir'den Afyon'a ev taşıma işlemleri genellikle aynı gün 6-7 saat içinde tamamlanmış olur." }
    ]
  }
};
