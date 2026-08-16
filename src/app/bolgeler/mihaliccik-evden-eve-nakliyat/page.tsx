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
  title: 'Mihalıççık Evden Eve Nakliyat | Esen 26 Nakliyat',
  description: "Eskişehir Mihalıççık ilçesinde Camikebir, Medrese ve Yenimahalle mahallelerinde Esen 26 ile sigortalı marangozlu ev taşıma.",
  alternates: {
    canonical: '/bolgeler/mihaliccik-evden-eve-nakliyat',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function MihalıççıkPage() {
  const name = 'Mihalıççık';
  const experienceYears = new Date().getFullYear() - FACTS.foundedYear;
  const sss = [
    {
      question: `${genitive(name)} dar sokaklarında asansörlü taşıma aracı kurmak güvenli midir?`,
      answer: `${locativeKi(name)} taşınma operasyonlarında güvenlik en ön planda tutulur. Cihazlarımızın ayakları zemin basıncını dağıtacak takozlarla desteklenerek kurulur. Mihalıççık dağlık bölgesinin kış aylarındaki kar ve buzlanma durumlarında araçlarımız kış lastiği ve zincir donanımlarıyla yola çıkarak taşıma güvenliğini sağlar.`
    },
    {
      question: `${name} ile Eskişehir merkez ofisiniz arasındaki nakliye ne kadar sürer?`,
      answer: `${name} ile Eskişehir merkez ofisimiz arasındaki taşıma rotası 90 kilometredir. Mihalıççık ile merkez şubemiz arasındaki nakliye güzergahı 90 km olup, engebeli dağ yolları sebebiyle seyahat 1.5 saat sürer.`
    },
    {
      question: `${locativeKi(name)} ev taşımalarında mobilya montajını kim yapıyor?`,
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
        name: 'Mihalıççık Evden Eve Nakliyat',
        description: "Eskişehir Mihalıççık ilçesinde Camikebir, Medrese ve Yenimahalle mahallelerinde Esen 26 ile sigortalı marangozlu ev taşıma.",
        slug: 'bolgeler/mihaliccik-evden-eve-nakliyat',
        areaName: 'Mihalıççık'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Bölgelerimiz', url: '/bolgeler' },
        { name: 'Mihalıççık', url: '/bolgeler/mihaliccik-evden-eve-nakliyat' }
      ]),
      faqSchema(sss)
    ]
  };

  const mahalleler = ['Camikebir', 'Medrese', 'Yenimahalle', 'Sazak', 'Yunusemre'];

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Bölgelerimiz', url: '/#ilcelerimiz' }, { name: 'Mihalıççık', url: '/bolgeler/mihaliccik-evden-eve-nakliyat' }]} className="pt-4" />
        
        {/* Intro Section */}
        <section className="py-20 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest font-sans">
            ESKİŞEHİR MIHALIÇÇIK BÖLGE OFİSİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Mihalıççık Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Gürleyik Şelalesi ve kiraz bahçeleriyle çevrili dağlık Mihalıççık ilçesinde, zorlu coğrafi ve iklimsel koşullara tam uyumlu ev taşıma hizmetleri sağlamaktayız. Kış şartlarında buzlanma ve kar yağışına karşı zincirli ve korumalı araçlarımızla nakliye yapıyoruz.
          </p>
        </section>

        {/* Detailed Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <MapPin className="text-orange-text" /> ${name} Bölgesinde Güvenli Ev Taşıma Standartları
            </h2>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Esen 26 Nakliyat olarak ${name} ilçesindeki tüm ev, ofis ve parça eşya lojistik taleplerinizde kurumsal ve yasal nakliye standartları uyguluyoruz. K3 yetki belgemiz altındaki araç filomuz ve kadrolu uzman kadromuz ile eşyalarınızı paketlemeden yeni yerleşim yerine kadar güvenle taşıyoruz.
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
          <BuildingAnalysis districtName="${name}" />

          {/* Neighborhoods List */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h3 className="font-display font-bold text-navy text-xl">
              ${name} Hizmet Verdiğimiz Başlıca Mahalleler
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
              ${name} İlçesinde Profesyonel Ev Taşıma Kılavuzu ve Yerel Lojistik Analizi
            </h2>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Mihalıççık ilçesinin engebeli dağ yollarında sarsıntıyı önleyici kasa içi sünger kaplamalı kamyonlarımız tercih edilir. Eşyaların dik rampalarda kaymasını önlemek için sabitleme kilitleri kullanılır. Mobilyalarınız ve elektronik eşyalarınız, su geçirmez kalın brandalı ambalajlarla sarılarak Mihalıççık hava şartlarından korunur.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Esen 26 Nakliyat, Eskişehir il genelinde edindiği köklü tecrübeyle taşınma stresinizi en aza indirgemeyi amaçlar. Taşınma gününün sabahında uzman kadromuz adrese gelerek tüm hassas eşyalarınızı tek tek sarar. Özellikle mutfak eşyaları, cam ve kristal gibi kırılacak hassas malzemeler önce sülfit beyaz ambalaj kağıtlarına sarılır ve mukavemeti yüksek çift oluklu Kraft kolilere dik bir şekilde istiflenir.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              İlçe genelindeki taşınma operasyonlarında, müşterilerimizin eşyalarının güvenli taşınabilmesi için modern ve kaliteli ambalajlama ekipmanları kullanmaktayız. Taşınma sırasında yaşanabilecek apartman içi veya bina yönetimi kısıtlamalarına karşı her zaman tedbirliyiz. Kendi mobil teleskopik asansör sistemlerimizle taşıma güvenliğini artırmakla kalmaz, aynı zamanda taşıma süresini kısaltarak zamandan tasarruf etmenizi sağlarız. Sektördeki ${experienceYears} yıllık tecrübemizle, yanınızdayız.
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
              ${name} Taşınma Fiyatınızı Şimdi Öğrenin
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

          <RelatedLinks currentSlug="${d.slug}" type="bolge" />
        </section>
      </main>
    </>
  );
}
