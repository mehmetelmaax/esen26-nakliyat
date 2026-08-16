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
import { ArrowRight, MapPin, Building, Shield, ClipboardList, Coins, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sivrihisar Evden Eve Nakliyat | Esen 26 Nakliyat',
  description: "Eskişehir Sivrihisar ilçesinde Hızırbey, Yenice, Kurşunlu, Karabaş mahallelerinde sigortalı marangozlu ev taşıma ve asansörlü nakliyat.",
  alternates: {
    canonical: '/bolgeler/sivrihisar-evden-eve-nakliyat',
  },
};

export default function SivrihisarPage() {
  const name = 'Sivrihisar';
  const sss = [
    {
      question: `${genitive(name)} dar sokaklarında asansörlü taşıma aracı kurmak güvenli midir?`,
      answer: `${locativeKi(name)} eski yerleşim alanlarında bulunan dar sokaklarda mobil eşya asansörümüzü kurmadan önce detaylı bir çevre emniyeti almaktayız. Kompakt yapılı hidrolik ayaklara sahip teleskopik nakliye asansörümüz, dar sokaklarda bile trafiği engellemeden en ideal açıyla konumlandırılarak eşyalarınızı pencerelerden hasarsız şekilde indirir.`
    },
    {
      question: `${name} ile Eskişehir merkez ofisiniz arasındaki nakliye kaç saat sürmektedir?`,
      answer: `${name} ile Eskişehir merkez ofisimiz arasındaki mesafe ortalama 95 kilometredir. Eşyaların sökülmesi, paketlenmesi, taşınması ve kurulumu dahil tüm süreç yaklaşık 4 ila 6 saat sürer.`
    },
    {
      question: `${locativeKi(name)} ev taşımalarında mobilya montajını kim yapıyor?`,
      answer: "Nakit ve kredi kartı ödemeleri dahil, Esen 26 Nakliyat ekipleri içerisinde yer alan profesyonel marangoz ustalarımız, gardıroplarınızı ve mobilyalarınızı demonte hale getirir. Yeni evinizde ise dilediğiniz yerleşim planına göre sıfırdan monte ederek teslim eder."
    },
    {
      question: "Taşıma esnasında eşyalarımın zarar görme ihtimaline karşı sigorta yapıyor musunuz?",
      answer: "Evet. Sivrihisar lojistik operasyonlarımızın tamamında emtia nakliyat sigortası uygulamaktayız. Eskişehir genelinde taşınan eşyalarınız Anadolu Sigorta güvencesiyle koruma altındadır."
    },
    {
      question: "Asansörlü nakliye ücretleri asansörsüz taşımaya göre daha mı pahalıdır?",
      answer: "Dış cephe nakliyat asansörü kurulumu, merdivenden taşımaya kıyasla gereken personel sayısını azalttığı için iş gücü maliyetini dengeler. Asansör kurulumu eşyaların apartman koridorlarında hasar görme riskini sıfırlar."
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Sivrihisar Evden Eve Nakliyat',
        description: "Eskişehir Sivrihisar ilçesinde Hızırbey, Yenice, Kurşunlu, Karabaş mahallelerinde sigortalı marangozlu ev taşıma ve asansörlü nakliyat.",
        slug: 'bolgeler/sivrihisar-evden-eve-nakliyat',
        areaName: 'Sivrihisar'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Bölgelerimiz', url: '/bolgeler' },
        { name: 'Sivrihisar', url: '/bolgeler/sivrihisar-evden-eve-nakliyat' }
      ]),
      faqSchema(sss)
    ]
  };

  const mahalleler = ['Hızırbey', 'Yenice', 'Kurşunlu', 'Karabaş', 'Gedik'];

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Bölgelerimiz', url: '/#ilcelerimiz' }, { name: 'Sivrihisar', url: '/bolgeler/sivrihisar-evden-eve-nakliyat' }]} className="pt-4" />
        
        {/* Intro Section */}
        <section className="py-20 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest font-sans">
            ESKİŞEHİR SIVRIHISAR BÖLGE OFİSİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Sivrihisar Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Eskişehir Sivrihisar bölgesinde K3 yetki belgeli kapalı kasa tır ve kamyon filomuz, sertifikalı marangoz ekiplerimiz and mobil eşya asansörlerimizle sigortalı ve profesyonel ev taşıma çözümleri üretiyoruz.
          </p>
        </section>

        {/* Detailed Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <MapPin className="text-orange-text" /> Sivrihisar Bölgesinde Güvenli Ev Taşıma Nasıl Yapılır?
            </h2>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Esen 26 Nakliyat olarak Sivrihisar ilçesindeki tüm mahallelerde ve sokaklarda profesyonel evden eve nakliye hizmetleri sunmaktayız. Asansörlü nakliye araçlarımız sayesinde yüksek katlı binalardaki dairelerinize de hasarsız, hızlı ve sorunsuz nakliye sağlıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <Building className="text-orange-text" /> Asansörlü Taşıma Teknolojisi
              </h3>
              <p className="text-gray-medium text-sm leading-relaxed">
                Dar apartman merdivenlerinde eşyalarınızın çizilmesini önleyen dış cephe mobil nakliyat asansörümüz ile mobilyalarınızı, beyaz eşyalarınızı pencerelerden veya balkonlardan kolayca indirip araca yüklüyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <Shield className="text-orange-text" /> Anadolu Sigorta Güvencesi
              </h3>
              <p className="text-gray-medium text-sm leading-relaxed">
                Tüm eşyalarınız Eskişehir genelindeki lojistik intikal esnasında beklenmedik kaza ve hasar durumlarına karşı Anadolu Sigorta poliçesiyle tamamen teminat altına alınmaktadır.
              </p>
            </div>
          </div>

          {/* Pricing Matrix */}
          <PricingMatrix />

          {/* Building Analysis */}
          <BuildingAnalysis districtName="Sivrihisar" />

          {/* Neighborhoods List */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h3 className="font-display font-bold text-navy text-xl">
              Sivrihisar Hizmet Verdiğimiz Mahalleler
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
              Sivrihisar Taşınma Fiyatınızı Şimdi Öğrenin
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

          
          {/* Detailed SEO Content Block to reach 900+ words */}
          <section className="py-12 bg-white rounded-xl border border-gray-light p-8 max-w-4xl mx-auto space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl">
              Sivrihisar İlçesinde Profesyonel Ev Taşıma Kılavuzu Neler Sunuyor?
            </h2>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Eskişehir’in en önemli bölgelerinden biri olan Sivrihisar ilçesinde evden eve nakliyat süreçleri, bölgenin mimari yapısı ve coğrafi özelliklerine göre özel bir planlama gerektirir. Esen 26 Nakliyat olarak, bu bölgede yıllardır edindiğimiz deneyimle taşınma sürecinizi stressiz ve sorunsuz hale getiriyoruz. İlçe genelinde gerek dar sokaklar gerekse modern yüksek katlı binalar için geliştirdiğimiz özel lojistik çözümlerimiz sayesinde eşyalarınız kırılma, çizilme veya kaybolma riski olmadan taşınır.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Taşınma öncesinde sunduğumuz ücretsiz ekspertiz hizmetimiz ile eşyalarınızın hacmini, ambalajlama ihtiyaçlarını ve bina konumunun mobil asansör kurulumuna uygunluğunu yerinde tespit ediyoruz. Böylece taşınma günü herhangi bir sürpriz ek ücretle karşılaşmazsınız. Profesyonel kadromuzda bulunan marangoz ustalarımız, büyük gardıroplarınızı, yatak odası takımlarınızı ve diğer mobilyalarınızı özenle demonte eder ve yeni adresinizde dilediğiniz şekilde monte ederek teslim eder.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Eşyalarınızın güvenliği bizim için ilk sıradadır. Bu nedenle, taşıma esnasında kullandığımız ambalaj malzemeleri birinci sınıf kalitede balonlu patpat naylonlar, özel karton kutular ve mukavva köşebentlerden oluşur. Eskişehir Sivrihisar nakliye operasyonlarımızın tamamında Anadolu Sigorta güvencesiyle emtia nakliyat sigortası uygulayarak eşyalarınızı yolculuk boyunca güvence altına alıyoruz.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Müşteri memnuniyetini en üst düzeyde tutmayı hedefleyen Esen 26 Nakliyat, Eskişehir il sınırları içerisinde K3 yetki belgesiyle yasal ve lisanslı taşımacılık hizmeti vermektedir. Eşyalarınız kapalı kasa, içi MDF kaplı ve sarsıntıyı önleyici özel süspansiyonlu araçlarımızla taşınarak hedefine güvenle ulaştırılır. Bütçenize en uygun ev taşıma fiyatları ve esnek ödeme seçeneklerimiz hakkında bilgi almak için bizimle iletişime geçebilirsiniz.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              İlçe genelindeki taşınma operasyonlarında, müşterilerimizin eşyalarının güvenli taşınabilmesi için modern ve kaliteli ambalajlama ekipmanları kullanmaktayız. Taşınma gününün sabahında uzman kadromuz adrese gelerek tüm eşyalarınızı tek tek sarar. Özellikle mutfak eşyaları, cam ve kristal gibi kırılacak hassas malzemeler önce ambalaj kağıtlarına sarılır ve mukavemeti yüksek kolilere dik bir şekilde istiflenir. Bu sayede taşıma tırlarımızın hareketi esnasında oluşabilecek yol sarsıntılarından etkilenmezler.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Ayrıca, taşınma sırasında yaşanabilecek apartman içi veya bina yönetimi kısıtlamalarına karşı her zaman tedbirliyiz. Bina içinde yük asansörünün kullanımına izin verilmediği durumlarda, Eskişehir genelinde hizmet veren 25. kata kadar ulaşabilen kendi mobil teleskopik asansör sistemlerimizi devreye alıyoruz. Mobil asansör kullanımı sadece taşıma güvenliğini artırmakla kalmaz, aynı zamanda taşıma süresini neredeyse yarı yarıya kısaltarak iş gücü maliyetlerinden tasarruf etmenizi sağlar.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Taşınma sürecinde eşyalarınızın güvenliği ve hasarsızlığı açısından, araç filomuzda yer alan kamyonlarımızın tamamı evden eve nakliyat lojistiğine uygun özel süspansiyon sistemlerine sahiptir. Böylece Eskişehir'in engebeli yollarında veya uzun seyahatlerde bile eşyalarınızın sarsıntılardan etkilenmesi minimum düzeyde kalır. Sektördeki 20 yıllık tecrübemiz ve güler yüzlü profesyonel ekibimizle, taşınma gününüzü tamamen keyifli ve konforlu bir deneyime dönüştürüyoruz.
            </p>
          </section>

          <RelatedLinks currentSlug="sivrihisar-evden-eve-nakliyat" type="bolge" />
        </section>
      </main>
    </>
  );
}
