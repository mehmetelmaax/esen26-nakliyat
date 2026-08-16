import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = 'C:/Users/mehme/.gemini/antigravity/scratch/esen26-nakliyat';

function locative(name) {
  const lastChar = name.slice(-1).toLowerCase();
  const lastVowel = name.match(/[aeıioöuü]/gi)?.pop()?.toLowerCase();
  const hasHardConsonant = /[fstkçşhp]/.test(lastChar);
  const isBackVowel = /[aıou]/.test(lastVowel);
  
  let loc = isBackVowel ? 'da' : 'de';
  if (hasHardConsonant) {
    loc = isBackVowel ? 'ta' : 'te';
  }
  if (['odunpazarı', 'tepebaşı'].includes(name.toLowerCase())) {
    loc = isBackVowel ? 'nda' : 'nde';
  }
  return name + "'" + loc;
}

function locativeKi(name) {
  const loc = locative(name);
  return loc + 'ki';
}

function genitive(name) {
  const lastChar = name.slice(-1).toLowerCase();
  const lastVowel = name.match(/[aeıioöuü]/gi)?.pop()?.toLowerCase();
  const isBackVowel = /[aıou]/.test(lastVowel);
  const isVowelEnding = /[aeıioöuü]/.test(lastChar);
  
  let suffix = '';
  if (isVowelEnding) {
    if (isBackVowel) {
      suffix = 'nın';
      if (lastVowel === 'o' || lastVowel === 'u') suffix = 'nun';
    } else {
      suffix = 'nin';
      if (lastVowel === 'ö' || lastVowel === 'ü') suffix = 'nün';
    }
  } else {
    if (isBackVowel) {
      suffix = 'ın';
      if (lastVowel === 'o' || lastVowel === 'u') suffix = 'un';
    } else {
      suffix = 'in';
      if (lastVowel === 'ö' || lastVowel === 'ü') suffix = 'ün';
    }
  }
  return name + "'" + suffix;
}

const districtsData = [
  {
    slug: 'alpu-evden-eve-nakliyat',
    name: 'Alpu',
    title: 'Alpu Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Alpu ilçesinde Fatih, Kemalpaşa ve Bahçelievler mahallelerinde Esen 26 ile sigortalı marangozlu ev taşıma ve asansörlü nakliyat.",
    mahalleler: ['Fatih', 'Kemalpaşa', 'Bahçelievler', 'Fevzipaşa', 'Bozyaka'],
    distanceKm: 40,
    robotsIndex: false,
    intro: "Alpu Ovası ve Alpu Tren İstasyonu çevresinde, tarım ve yerel yaşam alanlarının lojistik gereksinimlerine uygun ev taşıma hizmetleri sunuyoruz. İlçe merkezinde ve çevre köylerde, tarım arazilerinin getirdiği tozlanma faktörlerine karşı özel korumalı ambalajlama ve kapalı tırlarımızla güvenilir nakliye sağlıyoruz.",
    detail: "Kırsal nitelikli Alpu ilçesinde nakliye yaparken, yol mesafesi ve stabilize arazi yolları dikkate alınarak özel süspansiyonlu tırlarımız tercih edilir. Eşyalarınızın yol sarsıntılarından etkilenmemesi amacıyla iç kısımları MDF kaplı araçlarımızla sevk yapmaktayız. Kadromuzdaki uzman marangozlar mobilyalarınızın de-montaj işlemlerini Alpu şartlarına en uygun sürede tamamlar.",
    faq1: "Alpu köy ve yayla yollarında eşyaların tozlanmasını önlemek için tüm paketlerimizi endüstriyel streç film ile çift kat sararak muhafaza altına alıyoruz. Kapalı çelik kasalarımız dışarıdan gelebilecek toz ve yağmura karşı tamamen izoledir.",
    faq2: "Alpu ile merkez şubemiz arasındaki mesafe yaklaşık 40 km olup, nakliye tırlarımızın seyir süresi ortalama 1 saattir. Tüm taşıma süreci Anadolu Sigorta poliçesi kapsamında güvence altındadır."
  },
  {
    slug: 'beylikova-evden-eve-nakliyat',
    name: 'Beylikova',
    title: 'Beylikova Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Beylikova ilçesinde Yeni, Fatih ve Yunusemre mahallelerinde Esen 26 ile sigortalı ambalajlı marangozlu nakliyat çözümleri.",
    mahalleler: ['Yeni', 'Fatih', 'Yunusemre', 'Aşağı', 'Yukarı'],
    distanceKm: 75,
    robotsIndex: false,
    intro: "Eskişehir'in önemli hayvancılık ve süt üretim merkezi olan Beylikova'da, uzun mesafe lojistik hatlarımıza uygun emniyetli taşımacılık hizmeti veriyoruz. Organize sanayi bölgesi ve ilçe merkezindeki ev taşıma işlemlerinizde toz geçirmez ambalajlama standartları uygulamaktayız.",
    detail: "Beylikova'nın uzak mesafe köy yolları ve engebeli coğrafi yapısı nedeniyle, araç içi sabitleme sistemlerimiz çift kat güvenlikli gerdirmelerden oluşur. Beylikova genelinde beyaz eşyalarınız ve mobilyalarınız balonlu pıt pıt ambalajlarla sarılarak tozlanma riskine karşı endüstriyel streç film ile muhafaza edilmektedir.",
    faq1: "Beylikova genelinde kırsal alan ve tarlalardan kaynaklanabilecek tozlanmaya karşı kolilerinizi sıkı bantlayıp naylonla sarıyoruz. Araç içi askı sabitleyicilerle sarsıntıyı önlüyoruz.",
    faq2: "Beylikova ilçesi merkez ofisimize 75 km uzaklıkta olup, tır seyir süresi yaklaşık 1.5 saat sürmektedir. Taşıma Anadolu Sigorta güvencesindedir."
  },
  {
    slug: 'cifteler-evden-eve-nakliyat',
    name: 'Çifteler',
    title: 'Çifteler Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Çifteler ilçesinde Sakarya, Çiftçiler ve Erbap mahallelerinde Esen 26 ile profesyonel asansörlü ev taşıma hizmetleri.",
    mahalleler: ['Sakarya', 'Çiftçiler', 'Erbap', 'Yeni', 'Adalar'],
    distanceKm: 65,
    robotsIndex: true,
    intro: "Sakaryabaşı'nın eşsuz doğası ve su kaynaklarıyla bilinen Çifteler ilçesinde, nem oranına dayanıklı ambalajlama teknikleriyle korumalı ev taşıma hizmetleri sunuyoruz. Müstakil ve yazlık evlerin yer aldığı ilçemizde dar bahçe girişlerine uygun araçlarımızla lojistik sağlıyoruz.",
    detail: "Çifteler bölgesinde yüksek nem faktörüne bağlı olarak eşyaların zarar görmemesi adına havalı polietilen koruyucular kullanıyoruz. Sakarya Nehri kıyısındaki yerleşimlerin mimari koşullarına göre dış cephe nakliye asansörlerimizin kurulum açısını milimetrik ayarlayarak, dar kapı eşiklerinden eşya geçirme riskini ortadan kaldırıyoruz.",
    faq1: "Çifteler ilçesindeki nehir kenarı nem ve su serpintisi risklerine karşı taşıma kasalarımız neme dayanıklı MDF kaplamalı olup, tüm eşyalarınız su geçirmez ambalajlarla kaplanır.",
    faq2: "Çifteler ile Eskişehir merkez ofisimiz arasındaki nakliye mesafesi 65 km'dir ve tır transferi ortalama 1 saat içinde tamamlanır."
  },
  {
    slug: 'eskisehir-merkez-evden-eve-nakliyat',
    name: 'Eskişehir Merkez',
    title: 'Eskişehir Merkez Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir il merkezinde Tepebaşı ve Odunpazarı genelinde Esen 26 ile sabit fiyat garantili asansörlü sigortalı nakliye hizmeti.",
    mahalleler: ['Batıkent', 'Bağlar', 'Akarbaşı', 'Vişnelik', 'Büyükdere'],
    distanceKm: 10,
    robotsIndex: true,
    intro: "Eskişehir il merkezinin yoğun insan sirkülasyonu ve trafik akışına sahip bölgelerinde, şehir içi nakliyenin en hızlı ve güvenilir çözümlerini sunmaktayız. Porsuk Çayı ve Adalar çevresindeki dar cadde kısıtlarına uygun saatlerde taşınma planlaması yapıyoruz.",
    detail: "Merkez ilçelerdeki taşınma süreçlerinde en büyük zorluk, dar sokaklarda araç park yeri bulma kısıtları ve yoğun trafiktir. Esen 26 Nakliyat olarak, bu alanlarda trafik akışını engellemeyecek kompakt dış cephe asansörleri tercih ediyoruz. Binaların fiziki yapısı incelenerek merdiven koridorlarında oluşabilecek çiziklerin önüne zemin koruyucu sunta sererek geçmekteyiz.",
    faq1: "Merkez ilçedeki yoğun trafik ve dar sokak aralarında asansörümüzün konumlandırılması zabıta ve emniyet izinleriyle, trafiği aksatmayacak şekilde koordine edilir.",
    faq2: "Eskişehir merkez içindeki tüm nakliye operasyonlarımız, yükleme noktasından boşaltma noktasına kadar ortalama 4-6 saat sürmektedir."
  },
  {
    slug: 'gunyuzu-evden-eve-nakliyat',
    name: 'Günyüzü',
    title: 'Günyüzü Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Günyüzü ilçesinde Sümer, Yeni ve Gümüşkonak mahallelerinde Esen 26 ile sigortalı marangozlu evden eve taşımacılık.",
    mahalleler: ['Sümer', 'Yeni', 'Gümüşkonak', 'Fatih', 'Kaymaz'],
    distanceKm: 135,
    robotsIndex: false,
    intro: "İl merkezine en uzak ilçelerimizden olan Günyüzü'nde, uzun yol mukavemetine sahip özel nakliye filomuzla güvenli ev taşıma hizmeti veriyoruz. Günyüzü Ovası çevresindeki tüm mahallelerde K3 yetki belgeli araçlarımızla eşyalarınızı güvenceye alıyoruz.",
    detail: "Günyüzü nakliye operasyonlarındaki yaklaşık 135 kilometrelik yol mesafesi boyunca sarsıntısız taşıma için hava süspansiyonlu tırlarımız kullanılır. Yolculuk esnasında eşyaların birbirine sürtünmesini engellemek için aralara şok emici kalın köpük kalıplar ve askı sabitleyiciler yerleştirilerek Anadolu Sigorta güvencesiyle sevk gerçekleştirilir.",
    faq1: "Günyüzü'nün engebeli uzak mesafe yollarında mobilyaların sürtünme hasarını önlemek için her parçayı kat kat battaniye ve patpat naylonlarla sararak paketliyoruz.",
    faq2: "Günyüzü ilçesi şehir merkezine en uzak noktamız olup, tır nakliyesi yol durumu dahil 2 saati bulmaktadır. Taşınma tamamen sigortalıdır."
  },
  {
    slug: 'han-evden-eve-nakliyat',
    name: 'Han',
    title: 'Han Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Han ilçesinde Hacılar, Cumhuriyet ve Selimiye mahallelerinde Esen 26 ile sigortalı antika ve ev eşyası taşımacılığı.",
    mahalleler: ['Hacılar', 'Cumhuriyet', 'Selimiye', 'Karahisar', 'Gökçeyayla'],
    distanceKm: 105,
    robotsIndex: false,
    intro: "Yazılıkaya Midas Anıtı ve Frig Vadisi tarihi mirasına ev sahipliği yapan Han ilçesinde, sit alanı kısıtlamalarına tam uyumlu, hassas nakliye hizmetleri yürütüyoruz. Eski taş binaların ve dar sokakların mimari yapısını bozmadan modüler ekipmanlarımızla nakliye yapmaktayız.",
    detail: "Han ilçesinin dar geçişli tarihi sokaklarında ufak hacimli manevra kabiliyeti yüksek nakliye araçları kullanmaktayız. Antika mobilyalar ve değerli eşyalar için beyaz asitsiz ambalaj kağıtları tercih edilerek nem ve toz koruması sağlanır. Han'ın dik rampalı yollarında araç seyir hızı kontrollü olarak ayarlanmaktadır.",
    faq1: "Han ilçesindeki dar tarihi kapı girişlerinde ve sit alanlarında binalara hasar vermemek adına küçük boyutlu transpaletler ve askı halatları kullanmaktayız.",
    faq2: "Han ile Eskişehir merkez ofisimiz arasındaki 105 km'lik güzergah dik virajlar içerdiğinden nakliye kamyonlarımızın hızı saatte 60 km ile sınırlandırılır."
  },
  {
    slug: 'inonu-evden-eve-nakliyat',
    name: 'İnönü',
    title: 'İnönü Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir İnönü ilçesinde Çarşı, Orta ve İsmetpaşa mahallelerinde Esen 26 ile sigortalı asansörlü marangozlu ev ve ofis taşıma.",
    mahalleler: ['Çarşı', 'Orta', 'İsmetpaşa', 'Yeni', 'Erenler'],
    distanceKm: 35,
    robotsIndex: false,
    intro: "İnönü Mağaraları ve THK Havacılık Merkezi gibi rüzgarlı yüksek yamaç yollarına sahip ilçemizde, rüzgar hızı ölçümlü asansörlü taşıma hizmeti sunuyoruz. Sanayi bölgesi tır trafiğini dikkate alarak taşınma gününüzü organize etmekteyiz.",
    detail: "İnönü bölgesindeki yüksek katlı lojmanlarda ve apartman dairelerinde merdiven kazalarını önlemek amacıyla mobil dış cephe asansörlerimiz 25. kata kadar güvenle uzanır. İnönü'nün yüksek rüzgar alan yamaç yapısına göre asansör sabitleme çelik halatları ekstra mukavemetli gerdirmelerle desteklenir.",
    faq1: "İnönü'nün rüzgarlı yüksek tepelerindeki asansör kurulumlarında rüzgar hızı 35 km/s üzerine çıktığında iş güvenliği adına operasyonu rüzgar dinene kadar askıya alıyoruz.",
    faq2: "İnönü ile şehir merkezi arasındaki nakliye mesafesi 35 km olup, araç sevk süremiz ortalama 40 dakika sürmektedir."
  },
  {
    slug: 'mahmudiye-evden-eve-nakliyat',
    name: 'Mahmudiye',
    title: 'Mahmudiye Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Mahmudiye ilçesinde Işıklar, Yeni ve Yeni Mahalle mahallelerinde Esen 26 ile sigortalı asansörlü evden eve taşımacılık.",
    mahalleler: ['Işıklar', 'Yeni', 'Mesudiye', 'Orta', 'Cumhuriyet'],
    distanceKm: 55,
    robotsIndex: false,
    intro: "Devlet Haraları ve ünlü at çiftlikleriyle bilinen Mahmudiye'de, tarım ve hayvancılık alanlarının geniş yollarına uygun büyük boy nakliye araçlarımızla ev taşıma hizmeti sunuyoruz. Toz ve dış etken korumalı kapalı kasa sistemlerimizle eşyalarınızı sevk ediyoruz.",
    detail: "Mahmudiye genelindeki taşınmalarda, geniş çiftlik arazilerine ve stabilize toprak yollara uygun yüksek şasili taşıma kamyonlarımız görev alır. Araçlarımızın kasaları toz sızdırmaz fitillerle kaplı olduğundan, taşıma esnasında mobilyalarınızın temizliği korunur. Marangozlarımız demontaj işlemlerini hızlıca gerçekleştirir.",
    faq1: "Mahmudiye'nin stabilize tarla ve çiftlik yollarından kaynaklanan tozlanmaya karşı eşyalarınızı kalın naylon patpatlar ve streç ambalajlarla koruyoruz.",
    faq2: "Mahmudiye ile merkez şubemiz arasındaki nakliye güzergahı 55 km'dir ve tır intikali yaklaşık 50 dakika içinde tamamlanır."
  },
  {
    slug: 'mihalgazi-evden-eve-nakliyat',
    name: 'Mihalgazi',
    title: 'Mihalgazi Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Mihalgazi ilçesinde Cumhuriyet, Hürriyet ve Dokuz Mayıs mahallelerinde Esen 26 ile güvenli ev taşıma hizmetleri.",
    mahalleler: ['Cumhuriyet', 'Hürriyet', 'Dokuz Mayıs', 'Sarıcakaya', 'Alpagut'],
    distanceKm: 38,
    robotsIndex: false,
    intro: "Sakarya Vadisi'nin sıcak mikro klima iklimine sahip Mihalgazi ilçesinde, yüksek sıcaklık ve neme karşı korumalı paketleme teknikleriyle nakliye yapmaktayız. Seralar ve kaplıcalar bölgesinde yer alan ilçemizde lojistik çözümler sunuyoruz.",
    detail: "Mihalgazi'nin nemli havası ve vadi içi dar yolları, nakliyede ekstra özen gerektirir. Eşyalarınızın nemlenmesini önlemek için plastik ambalajlar yerine hava alabilen katmanlı pamuklu ambalaj örtüleri tercih ediyoruz. Keskin vadi virajlarında araç içindeki eşya istifinin kaymaması için gerdirmeli barikatlar kurulur.",
    faq1: "Mihalgazi vadisinde seracılık kaynaklı yüksek nem oranı sebebiyle mobilyalarınızın küflenmemesi adına hava kanallı koruyucu karton ambalajlar kullanmaktayız.",
    faq2: "Mihalgazi ilçesi ile Eskişehir arası vadi yolları virajlı olduğundan 38 km'lik mesafe yaklaşık 1 saatlik güvenli sürüşle katedilir."
  },
  {
    slug: 'mihaliccik-evden-eve-nakliyat',
    name: 'Mihalıççık',
    title: 'Mihalıççık Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Mihalıççık ilçesinde Camikebir, Medrese ve Yenimahalle mahallelerinde Esen 26 ile sigortalı marangozlu ev taşıma.",
    mahalleler: ['Camikebir', 'Medrese', 'Yenimahalle', 'Sazak', 'Yunusemre'],
    distanceKm: 90,
    robotsIndex: false,
    intro: "Gürleyik Şelalesi ve kiraz bahçeleriyle çevrili dağlık Mihalıççık ilçesinde, zorlu coğrafi ve iklimsel koşullara tam uyumlu ev taşıma hizmetleri sağlamaktayız. Kış şartlarında buzlanma ve kar yağışına karşı zincirli ve korumalı araçlarımızla nakliye yapıyoruz.",
    detail: "Mihalıççık ilçesinin engebeli dağ yollarında sarsıntıyı önleyici kasa içi sünger kaplamalı kamyonlarımız tercih edilir. Eşyaların dik rampalarda kaymasını önlemek için sabitleme kilitleri kullanılır. Mobilyalarınız ve elektronik eşyalarınız, su geçirmez kalın brandalı ambalajlarla sarılarak Mihalıççık hava şartlarından korunur.",
    faq1: "Mihalıççık dağlık bölgesinin kış aylarındaki kar ve buzlanma durumlarında araçlarımız kış lastiği ve zincir donanımlarıyla yola çıkarak taşıma güvenliğini sağlar.",
    faq2: "Mihalıççık ile merkez şubemiz arasındaki nakliye güzergahı 90 km olup, engebeli dağ yolları sebebiyle seyahat 1.5 saat sürer."
  },
  {
    slug: 'odunpazari-evden-eve-nakliyat',
    name: 'Odunpazarı',
    title: 'Odunpazarı Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Odunpazarı ilçesinde Emek, 75. Yıl, Yıldıztepe ve Akarbaşı mahallelerinde Esen 26 ile sigortalı asansörlü ev taşıma.",
    mahalleler: ['Akarbaşı', 'Vişnelik', 'Yıldıztepe', 'Emek', '75. Yıl', 'Kırmızıtoprak', 'Erenköy'],
    distanceKm: 5,
    robotsIndex: true,
    intro: "Tarihi Odunpazarı Evleri ve Kurşunlu Külliyesi gibi koruma altındaki sit alanlarında, dar sokak kısıtlamalarına ve tarihi binaların hassasiyetine uygun dar sokak nakliye ekiplerimizle hizmet veriyoruz. Sit alanlarında gürültüsüz ve emniyetli lojistik sağlıyoruz.",
    detail: "Odunpazarı'nın sit alanlarındaki dar sokaklarda park sorunlarını aşmak ve tarihi konakların dik merdiven yapılarında eşya taşımak yüksek deneyim ister. Eşyalarınızın merdiven boşluklarında zarar görmemesi amacıyla taşınabilir asansörler ve el vinçleri kullanıyoruz. Zeminlerde oluşabilecek aşınmalara karşı özel parke koruyucu kauçuklar yerleştirilmektedir." + ` Eskişehir'in bu köklü ilçesinde ${new Date().getFullYear() - 2015} yıllık tecrübemizle yanınızdayız.`,
    faq1: "Odunpazarı sit alanlarındaki ahşap konaklar ve dik merdivenli eski binalarda taşınırken dar dönüş açılarına uygun küçük ebatlı taşıma sedyeleri ve askı aparatları kullanmaktayız.",
    faq2: "Odunpazarı sınırları içindeki taşıma işlemlerimiz ortalama 4-5 saatlik çalışma ile hasarsız şekilde tamamlanmaktadır."
  },
  {
    slug: 'saricakaya-evden-eve-nakliyat',
    name: 'Sarıcakaya',
    title: 'Sarıcakaya Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Sarıcakaya ilçesinde Fatih, Hürriyet ve Yeni mahallelerinde Esen 26 ile sigortalı marangozlu ev taşıma çözümleri.",
    mahalleler: ['Fatih', 'Hürriyet', 'Yeni', 'Beyyayla', 'Laçin'],
    distanceKm: 42,
    robotsIndex: false,
    intro: "Sakarya Nehri yatağındaki seracılık vadisinde yer alan Sarıcakaya ilçesinde, yüksek nem ve sıcaklık faktörlerini optimize eden korumalı evden eve nakliyat çözümleri sunuyoruz. Sarıcakaya Vadisi boyunca K3 belgeli filomuzla hizmet veriyoruz.",
    detail: "Sarıcakaya vadisinin dik yokuşlu engebeli yollarında nakliye kamyonlarımızın seyir güvenliği şoförlerimizce hassasiyetle kontrol edilir. Eşyalarınızın sıcak vadi havasında genleşme veya hasar görmesini engellemek için ısı yalıtımlı kapalı kasalarımız tercih edilmektedir. Ambalajlama sürecinde çift kat koruyucu Kraft malzemeler kullanılır.",
    faq1: "Sarıcakaya'nın vadi içi yüksek nemli ve sıcak seracılık ikliminde mobilyaların nem hasarı görmemesi için hava kanallı mukavva ve beyaz koruyucu kağıt sargılar kullanıyoruz.",
    faq2: "Sarıcakaya ilçesi ile Eskişehir arası nakliye mesafesi 42 km'dir ve tır intikali ortalama 1 saat içinde tamamlanır."
  },
  {
    slug: 'seyitgazi-evden-eve-nakliyat',
    name: 'Seyitgazi',
    title: 'Seyitgazi Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Seyitgazi ilçesinde İkiçeşme, Dere ve Yunusemre mahallelerinde Esen 26 ile sigortalı asansörlü ev taşıma hizmetleri.",
    mahalleler: ['İkiçeşme', 'Dere', 'Yunusemre', 'Kırka', 'Bardakçı'],
    distanceKm: 45,
    robotsIndex: false,
    intro: "Seyyit Battal Gazi Külliyesi ve maden sahaları çevresindeki dağınık mahalle yapısına sahip Seyitgazi'de, geniş coğrafi alana yayılmış nakliye desteği sağlıyoruz. Kırka ve ilçe merkezindeki ev taşımalarınızda sigortalı lojistik sunmaktayız.",
    detail: "Seyitgazi ilçesindeki taşınma süreçlerinde, geniş mahalle mesafeleri ve boraks maden sahaları civarındaki ağır tır trafiği göz önünde bulundurulur. Taşınma öncesi emtia nakliyat sigortasıyla eşyalarınız garantiye alınır. Seyitgazi yollarının engebeli yapısına uygun süspansiyonlu kamyonlarımızla sarsıntısız taşıma sağlıyoruz.",
    faq1: "Seyitgazi'deki dağınık kırsal mahalle yerleşimleri ve engebeli yollar için eşyaları araç içine gerdirmeli kilit halatlarla sımsıkı sabitleyerek hasarsız sevk ediyoruz.",
    faq2: "Seyitgazi ile Eskişehir merkez arası nakliye rotası 45 km'dir ve kamyon intikal süresi yaklaşık 50 dakika doğrudur."
  },
  {
    slug: 'sivrihisar-evden-eve-nakliyat',
    name: 'Sivrihisar',
    title: 'Sivrihisar Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Sivrihisar ilçesinde Kurşunlu, Camikebir ve Hızırbey mahallelerinde Esen 26 ile sigortalı asansörlü ev taşıma.",
    mahalleler: ['Kurşunlu', 'Camikebir', 'Hızırbey', 'Karacalar', 'Elmalı'],
    distanceKm: 95,
    robotsIndex: true,
    intro: "Saat Kulesi ve Ulu Cami gibi UNESCO miraslarına ev sahipliği yapan Sivrihisar ilçesinde, tarihi taş sokaklara ve sert rüzgarlara uyumlu güvenli ev taşıma hizmetleri sunuyoruz. Tarihi dar konak kapılarına uygun asansörlü nakliye kurmaktayız.",
    detail: "Sivrihisar'ın yüksek rakımlı tepelerinde esen sert rüzgarlar, dış cephe asansör kurulumunda ekstra emniyet tedbirleri gerektirir. Rüzgar ölçümü yapılarak en stabil açıda kurulan mobil asansörümüz, eşyaları dar kapılardan geçirmeden pencerelerden hasarsız indirir. Sokakların taş kaplama olması sebebiyle zemin koruyucu kauçuklar yerleştirilir.",
    faq1: "Sivrihisar'ın yüksek tepelerinde esen sert rüzgarlı havalarda, asansör raylarını binaya çelik gergi telleriyle ekstra sabitleyerek güvenliği üst düzeye çıkarıyoruz.",
    faq2: "Sivrihisar ilçesi merkez ofisimize 95 km mesafede olup, nakliyat tırlarımızın seyir süresi yaklaşık 1 saat 15 dakikadır."
  },
  {
    slug: 'tepebasi-evden-eve-nakliyat',
    name: 'Tepebaşı',
    title: 'Tepebaşı Evden Eve Nakliyat | Esen 26 Nakliyat',
    description: "Eskişehir Tepebaşı ilçesinde Batıkent, Şirintepe, Çamlıca ve Uluönder mahallelerinde Esen 26 ile sigortalı asansörlü nakliyat.",
    mahalleler: ['Batıkent', 'Çamlıca', 'Şirintepe', 'Uluönder', 'Eskibağlar', 'Yenibağlar', 'Sütlüce'],
    distanceKm: 5,
    robotsIndex: true,
    intro: "Eskişehir'in modern, yüksek katlı yerleşim yerlerinden Tepebaşı ilçesinde, rezidans standartlarında lüks ve asansörlü ev taşıma hizmetleri sağlamaktayız. Haller ve Espark çevresindeki yoğun kent trafiğinde planlı zamanlamayla taşınma sağlıyoruz.",
    detail: "Tepebaşı genelindeki Batıkent ve Çamlıca gibi yeni yerleşimlerde, yüksek katlı binalardaki dairelere ulaşım için 25. kata kadar erişebilen teleskopik asansörlerimiz kurulur. Apartman içi asansör kullanım kısıtlamalarını aşarak, site yönetim kurallarına uygun, gürültüsüz ve çevreye rahatsızlık vermeyecek şekilde hızlı nakliye operasyonları yürütmekteyiz." + ` Tepebaşı bölgesinde ${new Date().getFullYear() - 2015} yıldır kesintisiz ev taşımaktayız.`,
    faq1: "Tepebaşı ilçesindeki yeni rezidans projlerinde bina yönetimi kuralları gereği bina içi asansörler yerine doğrudan kendi dış cephe teleskopik yük asansörlerimizi kullanmaktayız.",
    faq2: "Tepebaşı bölgesindeki şehir içi nakliye ve kurulum işlemlerimiz ortalama 4-6 saat sürmektedir."
  }
];

function generatePageContent(d) {
  return `import QuoteForm from '@/components/QuoteForm';
import PricingMatrix from '@/components/geo/PricingMatrix';
import BuildingAnalysis from '@/components/geo/BuildingAnalysis';
import { FACTS } from '@/lib/facts';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import React from 'react';
import { locative, locativeKi, genitive } from '@/lib/slug';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Building, Shield, ClipboardList, Coins, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '${d.title}',
  description: "${d.description}",
  alternates: {
    canonical: '/bolgeler/${d.slug}',
  },
  robots: {
    index: ${d.robotsIndex},
    follow: true,
  },
};

export default function ${d.name.replace(/\s+/g, '')}Page() {
  const name = '${d.name}';
  const experienceYears = new Date().getFullYear() - FACTS.foundedYear;
  const sss = [
    {
      question: \`\${genitive(name)} dar sokaklarında asansörlü taşıma aracı kurmak güvenli midir?\`,
      answer: \`\${locativeKi(name)} taşınma operasyonlarında güvenlik en ön planda tutulur. Cihazlarımızın ayakları zemin basıncını dağıtacak takozlarla desteklenerek kurulur. ${d.faq1}\`
    },
    {
      question: \`\${name} ile Eskişehir merkez ofisiniz arasındaki nakliye ne kadar sürer?\`,
      answer: \`\${name} ile Eskişehir merkez ofisimiz arasındaki taşıma rotası ${d.distanceKm} kilometredir. ${d.faq2}\`
    },
    {
      question: \`\${locativeKi(name)} ev taşımalarında mobilya montajını kim yapıyor?\`,
      answer: "Tüm taşıma ekiplerimizin kadrosunda profesyonel mobilya marangoz ustalarımız bulunmaktadır. Gardırop, yatak odası takımı, yemek masası gibi demonte edilebilen tüm mobilyalarınızı özenle söker, ambalajlar ve yeni evinizde dilediğiniz odada sıfırdan kurarak kullanıma hazır teslim eder."
    },
    {
      question: "Taşıma esnasında eşyalarımın zarar görme ihtimaline karşı sigorta yapıyor musunuz?",
      answer: "Evet, Esen 26 Nakliyat olarak gerçekleştirdiğimiz tüm ev ve ofis taşıma hizmetlerinde emtia nakliyat sigortası zorunludur. Taşınma gününden önce düzenlenen poliçeyle eşyalarınız Anadolu Sigorta güvencesiyle teminat altına alınır."
    },
    {
      question: "Asansörlü nakliye ücretleri asansörsüz taşımaya göre daha mı pahalıdır?",
      answer: "Dış cephe asansörü kullanımı, binadaki taşıma süresini neredeyse yarı yarıya azalttığı ve gereken personel gücünü dengelediği için genel nakliye maliyetini artırmaz. Aksine, eşyaların dar apartman merdivenlerinde çizilme veya kırılma riskini sıfıra indirerek olası hasar masraflarının önüne geçer."
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: '${d.name} Evden Eve Nakliyat',
        description: "${d.description}",
        slug: 'bolgeler/${d.slug}',
        areaName: '${d.name}'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Bölgelerimiz', url: '/bolgeler' },
        { name: '${d.name}', url: '/bolgeler/${d.slug}' }
      ]),
      faqSchema(sss)
    ]
  };

  const mahalleler = [${d.mahalleler.map(m => `'${m}'`).join(', ')}];

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Bölgelerimiz', url: '/#ilcelerimiz' }, { name: '${d.name}', url: '/bolgeler/${d.slug}' }]} className="pt-4" />
        
        {/* Intro Section */}
        <section className="py-20 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest font-sans">
            ESKİŞEHİR ${d.name.toUpperCase()} BÖLGE OFİSİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            ${d.name} Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            ${d.intro}
          </p>
        </section>

        {/* Detailed Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <MapPin className="text-orange-text" /> \${name} Bölgesinde Güvenli Ev Taşıma Standartları
            </h2>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Esen 26 Nakliyat olarak \${name} ilçesindeki tüm ev, ofis ve parça eşya lojistik taleplerinizde kurumsal ve yasal nakliye standartları uyguluyoruz. K3 yetki belgemiz altındaki araç filomuz ve kadrolu uzman kadromuz ile eşyalarınızı paketlemeden yeni yerleşim yerine kadar güvenle taşıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <Building className="text-orange-text" /> Dış Cephe Yük Asansörleri
              </h3>
              <p className="text-gray-medium text-sm leading-relaxed">
                Dar apartman merdivenlerinde eşyalarınızın çizilmesini önleyen dış cephe mobil nakliyat asansörümüz ile mobilyalarınızı ve beyaz eşyalarınızı pencerelerden veya balkonlardan kolayca indirip araca yüklüyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <Shield className="text-orange-text" /> K3 Yetki Belgesi ve Sigorta
              </h3>
              <p className="text-gray-medium text-sm leading-relaxed">
                Tüm lojistik operasyonlarımız yasal K3 taşıma yetki belgesi altında yürütülür. Taşınan eşyalarınız Eskişehir genelindeki lojistik intikal esnasında Anadolu Sigorta poliçesiyle tamamen teminat altına alınmaktadır.
              </p>
            </div>
          </div>

          {/* Pricing Matrix */}
          <PricingMatrix />

          {/* Building Analysis */}
          <BuildingAnalysis districtName="\${name}" />

          {/* Neighborhoods List */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h3 className="font-display font-bold text-navy text-xl">
              \${name} Hizmet Verdiğimiz Başlıca Mahalleler
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {mahalleler.map((mah, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-medium text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-text shrink-0" />
                  <span>{mah} Mh.</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Local SEO Narrative */}
          <section className="py-12 bg-white rounded-xl border border-gray-light p-8 space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl">
              \${name} İlçesinde Profesyonel Ev Taşıma Kılavuzu ve Yerel Lojistik Analizi
            </h2>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              ${d.detail}
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Esen 26 Nakliyat, Eskişehir il genelinde edindiği köklü tecrübeyle taşınma stresinizi en aza indirgemeyi amaçlar. Taşınma gününün sabahında uzman kadromuz adrese gelerek tüm hassas eşyalarınızı tek tek sarar. Özellikle mutfak eşyaları, cam ve kristal gibi kırılacak hassas malzemeler önce sülfit beyaz ambalaj kağıtlarına sarılır ve mukavemeti yüksek çift oluklu Kraft kolilere dik bir şekilde istiflenir.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              İlçe genelindeki taşınma operasyonlarında, müşterilerimizin eşyalarının güvenli taşınabilmesi için modern ve kaliteli ambalajlama ekipmanları kullanmaktayız. Taşınma sırasında yaşanabilecek apartman içi veya bina yönetimi kısıtlamalarına karşı her zaman tedbirliyiz. Kendi mobil teleskopik asansör sistemlerimizle taşıma güvenliğini artırmakla kalmaz, aynı zamanda taşıma süresini kısaltarak zamandan tasarruf etmenizi sağlarız. Sektördeki \${experienceYears} yıllık tecrübemizle, yanınızdayız.
            </p>
          </section>

          {/* FAQ Section */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-navy text-2xl flex items-center gap-2">
              <HelpCircle className="text-orange-text" /> Sıkça Sorulan Sorular
            </h3>
            <div className="space-y-4">
              {sss.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-2">
                  <h4 className="font-display font-semibold text-navy text-base md:text-lg flex gap-2">
                    <span className="text-orange-text font-bold">Q.</span> {item.question}
                  </h4>
                  <p className="text-gray-medium text-sm md:text-base leading-relaxed pl-6">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-navy rounded-2xl p-8 md:p-12 text-white text-center space-y-6">
            <h3 className="font-display font-black text-2xl md:text-3xl">
              \${name} Taşınma Fiyatınızı Şimdi Öğrenin
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
              Eşyalarınızın miktarına ve taşınacağınız kat durumuna göre sabit fiyat garantisiyle teklif almak için teklif formumuzu doldurabilir veya doğrudan arayabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/teklif-al" className="bg-orange-text hover:bg-orange-hover text-white font-sans font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-orange-text/20">
                Fiyat Hesapla <ArrowRight size={18} />
              </Link>
              <a href={SITE.phoneHref} className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-sans font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                Hemen Ara: {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <RelatedLinks currentSlug="\${d.slug}" type="bolge" />
        </section>
      </main>
    </>
  );
}
`;
}

function run() {
  console.log('--- PROGRAMMATIC DISTRICT PAGES GENERATOR ---');
  districtsData.forEach(d => {
    const dirPath = path.join(projectRoot, 'src', 'app', 'bolgeler', d.slug);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const pagePath = path.join(dirPath, 'page.tsx');
    const content = generatePageContent(d);
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log(`✅ Generated: ${d.slug}/page.tsx`);
  });
  console.log('--- GENERATOR PROCESS COMPLETED ---');
}

run();
