import QuoteForm from '@/components/QuoteForm';
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
import { ArrowRight, MapPin, Building, Shield, ClipboardList, Coins, HelpCircle, FileCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eskişehir Merkez Evden Eve Nakliyat | Esen 26',
  description: "Eskişehir merkez ilçeleri Tepebaşı ve Odunpazarı genelinde K3 belgeli, sigortalı, marangozlu ve asansörlü evden eve nakliye hizmetleri.",
  alternates: {
    canonical: '/bolgeler/eskisehir-merkez-evden-eve-nakliyat',
  },
};

export default function EskisehirMerkezPage() {
  const name = 'Eskişehir Merkez';
  const sss = [
    {
      question: "Eskişehir Merkez'de ev taşıma işlemleri ne kadar sürer?",
      answer: "Eskişehir Merkez sınırlarında Tepebaşı ve Odunpazarı ilçeleri arasındaki nakliye ve montaj işlemleri mesafeye bağlı kalmaksızın aynı gün içinde 5-7 saat arasında tamamlanmaktadır."
    },
    {
      question: "Eskişehir Merkez ofisinizden tüm mahallelere asansörlü nakliye aracı gönderiliyor mu?",
      answer: `Evet. ${genitive(name)} tüm mahallelerine (Çamlıca, Batıkent, Şirintepe, Uluönder, Yenibağlar, Akarbaşı, Vişnelik vb.) 25. kata kadar ulaşan mobil dış cephe asansörlerimizi sevk ediyoruz.`
    },
    {
      question: "Eskişehir Merkez'de mobilya montaj ve marangozluk hizmeti fiyata dahil midir?",
      answer: "Evet. Esen 26 Nakliyat ekiplerimiz içerisindeki uzman marangozlar, gardıroplarınızı söküp paketler ve yeni evinizde dilediğiniz yerleşim planına göre monte ederek teslim eder. Bu hizmet baz fiyatımıza dahildir."
    },
    {
      question: "Merkez taşımalarında eşya sigortası yapıyor musunuz?",
      answer: "Evet. Eskişehir Merkez and dış ilçe taşımalarımızın tamamında emtia nakliyat sigortası uygulamaktayız. Eşyalarınız Anadolu Sigorta güvencesiyle teminat altındadır."
    },
    {
      question: "Apartman asansörü kullanımına izin verilmeyen binalarda taşınma nasıl çözülür?",
      answer: "Yönetim yasakları veya dar apartman boşlukları nedeniyle bina içi taşıma yapılamayan durumlarda, balkon veya pencerelerden teleskopik dış cephe asansörlerimiz kurulur ve eşyalarınız binaya hiç sokulmadan doğrudan dairenize aktarılır."
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Eskişehir Merkez Evden Eve Nakliyat',
        description: "Eskişehir merkez ilçeleri Tepebaşı ve Odunpazarı genelinde K3 belgeli, sigortalı, marangozlu ve asansörlü evden eve nakliye hizmetleri.",
        slug: 'bolgeler/eskisehir-merkez-evden-eve-nakliyat',
        areaName: 'Eskişehir Merkez'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Bölgelerimiz', url: '#ilcelerimiz' },
        { name: 'Eskişehir Merkez', url: '/bolgeler/eskisehir-merkez-evden-eve-nakliyat' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      <main className="pt-24 bg-off-white text-charcoal">
        <Breadcrumb items={[{ name: 'Eskişehir Merkez', url: '/bolgeler/eskisehir-merkez-evden-eve-nakliyat' }]} className="pt-4" />

        {/* Hero Section */}
        <section className="bg-navy py-20 text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
            <span className="text-orange font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange" />
              <span>ESKİŞEHİR MERKEZ NAKLİYAT ŞUBESİ</span>
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
              Eskişehir Merkez Evden Eve Nakliyat
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
              Tepebaşı ve Odunpazarı ilçelerinin tamamında profesyonel, asansörlü ve marangoz montaj dahil anahtar teslim ev taşıma çözümleri.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Block 1 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6">
                <h2 className="font-display font-black text-navy text-xl md:text-2xl flex items-center gap-2 border-b border-gray-light pb-2">
                  <Building className="w-6 h-6 text-orange" />
                  <span>Eskişehir Merkez Asansörlü Taşımacılık Nasıl Yapılır?</span>
                </h2>
                <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                  Esen 26 Nakliyat olarak Eskişehir Merkez'de Tepebaşı ve Odunpazarı genelindeki tüm mahallelerde 25. kata kadar ulaşabilen kendi mobil teleskopik asansör sistemlerimizle taşıma yapmaktayız. Dar sokaklara uygun kompakt hidrolik araçlarımız, bina dış cephesine en uygun açıyla yaklaşarak eşyalarınızı merdiven veya bina içi asansör kullanımına gerek kalmadan doğrudan pencerelerden indirip yükler.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Asansörlü taşımacılık sistemimiz dar apartman merdivenlerinde eşyaların duvarlara çarpıp hasar görme riskini sıfıra indirirken, taşınma süresini neredeyse yarı yarıya kısaltarak zamandan tasarruf etmenizi sağlar.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Eskişehir genelindeki yüksek katlı sitelerde, sitelerin kendine ait peyzaj alanları ve otopark sınırları dikkate alınarak kurulum yapılır. Peyzaj zeminlerine zarar vermemek için asansör ayaklarının altına koruyucu kauçuk plakalar serilir. Böylece sitenizin ortak kullanım alanlarına hiçbir zarar vermeden, tamamen yasal ve profesyonel çerçevede ev taşıma işleminiz tamamlanır.
                </p>
              </div>

              {/* Block 2 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6">
                <h2 className="font-display font-black text-navy text-xl md:text-2xl flex items-center gap-2 border-b border-gray-light pb-2">
                  <Coins className="w-6 h-6 text-orange" />
                  <span>Eskişehir Merkez Evden Eve Nakliyat Fiyatları Neye Göre Değişir?</span>
                </h2>
                <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                  Eskişehir Merkez'de evden eve nakliyat fiyatlarımız, dairenin büyüklüğüne (1+1, 2+1, 3+1), taşınacak kat yüksekliklerine ve mobil asansör kurulum ihtiyacına bağlı olarak 12.000 TL ile 32.000 TL arasında belirlenir. Eşyaların taşınacağı adreslerin Tepebaşı veya Odunpazarı sınırlarında olması durumunda ek mesafe yakıt farkı yansıtılmamaktadır.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Ücretsiz ekspertiz hizmetimiz sayesinde eşyalarınız yerinde analiz edilir, asansör kurulum açısı kontrol edilir ve hiçbir ek ücret sürprizi içermeyen resmi nakliyat sözleşmesiyle fiyatınız sabitlenir.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Fiyatlandırmayı etkileyen bir diğer önemli unsur ise de-montaj ve paketleme süreçleridir. Ekiplerimiz bünyesinde yer alan sertifikalı marangoz ustası, gardıroplarınızı, yatak bazalarınızı ve ünitelerinizi zarar görmeden söker. Bu söküm işlemleri sonrasında eşyalar kalın Kraft kağıtlı havalı naylonlarla sarılır. Taşınma fiyatlarımıza marangozluk, paketleme, yükleme ve yeni adreste montaj işlemleri dahil olup şeffaf bir fiyatlandırma sunulmaktadır.
                </p>
              </div>

              {/* Block 3 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6">
                <h2 className="font-display font-black text-navy text-xl md:text-2xl flex items-center gap-2 border-b border-gray-light pb-2">
                  <Shield className="w-6 h-6 text-orange" />
                  <span>Merkez İlçelerde Eşya Depolama ve Paketleme Çözümlerimiz Nelerdir?</span>
                </h2>
                <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                  Esen 26 firmamız, Eskişehir Merkez şubemizde ev eşyalarınızın güvenle saklanabilmesi için 24 saat güvenlik kameralı ve rutubetsiz konteyner depolama çözümleri sunmaktadır. Nakliye öncesinde beyaz eşyalarınız, koltuklarınız ve hassas mobilyalarınız çift kat balonlu patpat naylonlar ve Kraft kartonlarla paketlenerek darbeye ve toza karşı tam korumalı hale getirilir.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Tüm paketleme işlemlerinde özel havalı ambalaj malzemeleri kullanılır ve elbiseleriniz için portatif askılı gardıroplarla kırışıksız taşıma gerçekleştirilir.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Depolarımız her ay düzenli olarak haşere ve neme karşı ilaçlanmakta olup, eşyalarınızın depoda kaldığı süre boyunca yangın, hırsızlık ve doğal afetlere karşı Anadolu Sigorta poliçesiyle teminat altında tutulması sağlanmaktadır. İstediğiniz zaman depomuzu ziyaret ederek eşyalarınızın durumunu yerinde kontrol etme hakkına sahipsiniz.
                </p>
              </div>

              {/* Block 4 */}
              <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6">
                <h2 className="font-display font-black text-navy text-xl md:text-2xl flex items-center gap-2 border-b border-gray-light pb-2">
                  <ClipboardList className="w-6 h-6 text-orange" />
                  <span>Eskişehir Merkez Ofis Taşıma Süreci Nasıl Planlanır?</span>
                </h2>
                <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                  Eskişehir Merkez ilçelerinde faaliyet gösteren şirketler, bürolar ve mağazalar için en az 3 kişiden oluşan uzman kadrolarımızla iş kaybı yaşatmayan hızlı ofis taşıma hizmeti veriyoruz. Dosya, arşiv ve bilgisayar ekipmanlarınız numaralandırılmış kasalarda sınıflandırılır, hassas sunucu ve elektronik sistemler koruyucu ambalajlarla nakledilir.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Ofis taşımalarımız kurumsal faturalı ve sözleşmeli olarak yapılmakta, taşınma süreci firmanızın talebine göre hafta sonu veya akşam saatlerinde koordine edilmektedir.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Taşınma günü öncesinde ofisinizde yapılan detaylı ekspertiz ile hangi masaların söküleceği, arşiv dosyalarının hangi kutulama sırasıyla taşınacağı ve yeni ofiste hangi odalara yerleştirileceği belirlenir. Bu planlı yaklaşım sayesinde, pazartesi sabahı iş başı yaptığınızda hiçbir aksaklık yaşamadan faaliyetlerinize devam edebilirsiniz.
                </p>
              </div>

              {/* Block 5: New Section for Word Count & SEO */}
              <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6">
                <h2 className="font-display font-black text-navy text-xl md:text-2xl flex items-center gap-2 border-b border-gray-light pb-2">
                  <FileCheck className="w-6 h-6 text-orange" />
                  <span>Eskişehir Merkez'de Taşınma Günü Yol Durumu ve Otopark İzinleri Nasıl Alınır?</span>
                </h2>
                <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                  Eskişehir Merkez bölgesinde Fatih, Akarbaşı, Vişnelik, Batıkent ve Yenibağlar gibi yoğun nüfuslu mahallelerde taşınma günlerinde otopark ve yol kapatma izinlerinin 1 gün önceden koordine edilmesi gerekmektedir. Esen 26 Nakliyat lojistik ekibi, taşınma gününden 1 gün önce ilgili belediye and trafik zabıta birimleriyle irtibata geçerek asansörlü nakliye kamyonunun yanaşacağı alanı bariyerlerle güvenceye alır.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Dar sokaklarda veya tramvay hatlarının geçtiği güzergahlarda yapılacak taşımalarda, asansör kurulumunun tramvay seferlerini aksatmayacak açıyla planlanması son derece önemlidir. Ekiplerimiz, yerel trafik akışını bozmamak için otopark rezervasyon işlemlerini önceden tamamlayarak taşınma günü yaşanabilecek olası krizlerin önüne geçer ve hızlıca yüklemeyi tamamlar.
                </p>
              </div>

              {/* Block 6: Another New Section */}
              <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6">
                <h2 className="font-display font-black text-navy text-xl md:text-2xl flex items-center gap-2 border-b border-gray-light pb-2">
                  <CheckCircle2 className="w-6 h-6 text-orange" />
                  <span>Tepebaşı ve Odunpazarı Sınırlarında Sorunsuz Eşya Paketleme Kuralları Nelerdir?</span>
                </h2>
                <p className="text-charcoal text-sm md:text-base leading-relaxed font-semibold">
                  Eskişehir Merkez ilçelerinde gerçekleştirdiğimiz nakliye faaliyetlerinde kullandığımız ambalaj malzemeleri, kırılma riskini en aza indirmek için 3 katmanlı koruma özelliğine sahiptir. Tabak, bardak ve cam aksesuarlar önce kalın Kraft ambalaj kağıtlarına sarılır, ardından özel mukavemetli kolilere diklemesine yerleştirilerek aralarındaki boşluklar dolgu malzemeleriyle kapatılır.
                </p>
                <p className="text-charcoal text-sm leading-relaxed">
                  Koltuk takımları ve yataklar lekelenmeye karşı önce şeffaf streç filmlerle kaplanır, ardından darbelere karşı kalın balonlu ambalaj naylonlarıyla sarılarak bantlanır. Beyaz eşyalarınız ise tesisatçı personelimiz tarafından söküldükten sonra köşe koruyucu köpüklerle desteklenerek paketlenir ve sarsıntısız araç içi sabitleme kayışlarıyla nakliye aracına yerleştirilir.
                </p>
              </div>

              {/* Geo components */}
              <BuildingAnalysis districtName="Tepebaşı" />
              <PricingMatrix />

              {/* FAQs section */}
              <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6">
                <h2 className="font-display font-black text-navy text-xl md:text-2xl flex items-center gap-2 border-b border-gray-light pb-2">
                  <HelpCircle className="w-6 h-6 text-orange" />
                  <span>Eskişehir Merkez Nakliyat Hakkında Sıkça Sorulan Sorular Nelerdir?</span>
                </h2>
                <div className="divide-y divide-gray-light">
                  {sss.map((item, idx) => (
                    <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-2">
                      <h3 className="font-display font-bold text-navy text-base">{item.question}</h3>
                      <p className="text-charcoal text-sm leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Quote Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 bg-white rounded-2xl p-6 border border-gray-light shadow-premium space-y-4">
              <div>
                <span className="text-orange text-[10px] font-black tracking-widest block">HEMEN FİYAT ALIN</span>
                <h3 className="font-display font-bold text-navy text-lg mt-0.5">Eskişehir Merkez Teklif Formu</h3>
              </div>
              <p className="text-charcoal text-xs leading-relaxed">
                Aşağıdaki alanları eksiksiz doldurarak Eskişehir Merkez içi asansörlü ev taşıma talebinizi anında iletebilirsiniz.
              </p>
              <QuoteForm isInline={true} />
            </div>
          </div>
        </section>

        {/* Bottom Related Links */}
        <section className="py-12 bg-white border-t border-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RelatedLinks currentSlug="eskisehir-merkez-evden-eve-nakliyat" type="bolge" />
          </div>
        </section>
      </main>
    </>
  );
}
