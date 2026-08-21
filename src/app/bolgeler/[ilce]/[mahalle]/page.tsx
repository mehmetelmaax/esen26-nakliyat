import QuoteForm from '@/components/QuoteForm';
import PricingMatrix from '@/components/geo/PricingMatrix';
import BuildingAnalysis from '@/components/geo/BuildingAnalysis';
import { FACTS } from '@/lib/facts';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/schema';
import { SITE, NEIGHBORHOODS } from '@/lib/site-config';
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin, Building, Shield, HelpCircle } from 'lucide-react';

interface PageProps {
  params: Promise<{
    ilce: string;
    mahalle: string;
  }>;
}

export async function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({
    ilce: n.district,
    mahalle: n.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { ilce, mahalle } = await params;
  const n = NEIGHBORHOODS.find((item) => item.slug === mahalle && item.district === ilce);
  if (!n) return {};

  const districtName = ilce === 'tepebasi' ? 'Tepebaşı' : 'Odunpazarı';
  const title = `${n.name} Evden Eve Nakliyat | Esen 26`;
  const description = `Eskişehir ${districtName} ${n.name} mahallesinde asansörlü taşıma, ambalajlama ve marangoz montaj dahil sigortalı evden eve nakliye hizmetleri.`;
  const canonical = `/bolgeler/${ilce}/${n.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: n.indexable,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      modifiedTime: `${n.updatedAt}T08:00:00+03:00`,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { ilce, mahalle } = await params;
  const n = NEIGHBORHOODS.find((item) => item.slug === mahalle && item.district === ilce);
  if (!n) {
    notFound();
  }

  const districtName = ilce === 'tepebasi' ? 'Tepebaşı' : 'Odunpazarı';
  const experienceYears = new Date().getFullYear() - FACTS.foundedYear;

  const sss = [
    {
      question: `${n.name} bölgesinde eşya taşıma asansörü kurulumu için apartman cephesi uygun mudur?`,
      answer: `${n.name} genelinde yaptığımız inceleme ve saha tecrübelerimize göre, ${n.characteristics} Bu doğrultuda asansör kurulumunun yapılacağı cephe açısı ve zemin uygunluğu uzman ekspertiz ekibimizce ücretsiz olarak önceden analiz edilerek en güvenli kurulum planı hazırlanmaktadır.`
    },
    {
      question: `${n.name} sakinleri için ev taşıma süresi ortalama ne kadar sürmektedir?`,
      answer: `${n.name} ile Eskişehir merkez yerleşkemiz arasındaki mesafe yakın olup, şehir içi taşıma operasyonlarımız (ambalajlama, yükleme, transfer ve yeni adreste marangoz montaj kurulumu dahil) ortalama 4-6 saat sürmektedir. Eşyalarınız aynı gün içerisinde yeni yuvanıza hasarsız teslim edilir.`
    },
    {
      question: `${n.name} evden eve nakliye hizmetine mobilya söküm ve montaj dahil midir?`,
      answer: "Evet, Esen 26 Nakliyat bünyesindeki tüm taşımalarda profesyonel marangoz montaj hizmetimiz standarttır. Gardırop, yatak odası mobilyaları, üniteler ve yemek masası gibi tüm de-monte mobilyalarınız ustalarımız tarafından sökülür, yeni evinizde dilediğiniz odada sıfırdan kurularak teslim edilir."
    },
    {
      question: "Taşınma sırasında oluşabilecek hasarlara karşı sigorta yapıyor musunuz?",
      answer: `Evet, ${n.name} nakliye hizmetlerimizde eşyalarınız Anadolu Sigorta poliçesiyle tamamen teminat altına alınır. Taşınma öncesinde hazırlanan emtia sigorta poliçesi, transfer esnasındaki tüm risklere karşı eşya güvenliğinizi yasal koruma altına alır.`
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: `${n.name} Evden Eve Nakliyat`,
        description: `Eskişehir ${districtName} ${n.name} mahallesinde asansörlü taşıma, ambalajlama ve marangoz montaj dahil sigortalı evden eve nakliye hizmetleri.`,
        slug: `bolgeler/${ilce}/${n.slug}`,
        areaName: `${n.name}, ${districtName}`
      }),
      webPageSchema({
        name: `${n.name} Evden Eve Nakliyat | Esen 26`,
        description: `Eskişehir ${districtName} ${n.name} mahallesinde asansörlü taşıma, ambalajlama ve marangoz montaj dahil sigortalı evden eve nakliye hizmetleri.`,
        slug: `bolgeler/${ilce}/${n.slug}`,
        dateModified: n.updatedAt
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Bölgelerimiz', url: '/bolgeler' },
        { name: districtName, url: `/bolgeler/${ilce}-evden-eve-nakliyat` },
        { name: n.name, url: `/bolgeler/${ilce}/${n.slug}` }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[
          { name: 'Bölgelerimiz', url: '/bolgeler' },
          { name: districtName, url: `/bolgeler/${ilce}-evden-eve-nakliyat` },
          { name: n.name, url: `/bolgeler/${ilce}/${n.slug}` }
        ]} className="pt-4" />
        
        {/* Intro Section */}
        <section className="py-20 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest font-sans uppercase">
            ESKİŞEHİR {districtName.toUpperCase()} / {n.name.toUpperCase()} NAKLİYE
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            {n.name} Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Eskişehir {districtName} ilçesi {n.name} sakinlerine özel, asansörlü ve sigortalı evden eve taşımacılık hizmeti. {n.characteristics}
          </p>
        </section>

        {/* Detailed Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <MapPin className="text-orange-text shrink-0" /> {n.name} Güvenli Ev Taşıma Standartları
            </h2>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Esen 26 Nakliyat olarak, {n.name} bölgesindeki tüm ev taşıma ihtiyaçlarınızda kurumsal ve yasal taşımacılık hizmetleri sağlıyoruz. K3 yetki belgemiz, modern kapalı kasa araçlarımız ve kendi asansör sistemlerimizle mobilyalarınızı, beyaz eşyalarınızı ve hassas kırılabileceklerinizi hasar riskini sıfıra indirerek taşıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <Building className="text-orange-text shrink-0" /> Mobil Dış Cephe Asansörleri
              </h3>
              <p className="text-gray-medium text-sm leading-relaxed">
                Dar apartman merdivenlerinde eşyaların çizilmesini veya kırılmasını engellemek amacıyla mobil teleskopik yük asansörleri kullanıyoruz. {n.name} çevresindeki konut yapısına göre asansörlü kurulum işlemlerimizi gerçekleştiriyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <Shield className="text-orange-text shrink-0" /> Yasal Taşımacılık & Anadolu Sigorta
              </h3>
              <p className="text-gray-medium text-sm leading-relaxed">
                Esen 26 Nakliyat ile taşınan her parça eşyanız Anadolu Sigorta güvencesi altındadır. K3 yetki belgemiz altındaki tır ve kamyonetlerimizle güvenilir yasal lojistik prosedürlerini uyguluyoruz.
              </p>
            </div>
          </div>

          {/* Pricing Matrix */}
          <PricingMatrix />

          {/* Building Analysis */}
          <BuildingAnalysis districtName={districtName} />

          {/* Detailed Local SEO Narrative */}
          <section className="py-12 bg-white rounded-xl border border-gray-light p-8 space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl">
              {n.name} Ev Taşıma ve Yerel Lojistik Analizi
            </h2>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              {n.name} çevresindeki taşınma süreçlerinde, bölgenin mimari özellikleri ve sokak durumları yakından analiz edilmektedir. Mahalle genelinde {n.characteristics} Yakın çevrede bulunan {n.landmarks} gibi bilinen noktalar, nakliye koordinasyonunu ve adres tespitini kolaylaştırmaktadır.
            </p>
            <p className="text-gray-medium text-sm md:text-base leading-relaxed">
              Taşınma gününün sabahında uzman kadromuz adresinize gelerek tüm mobilyalarınızı, beyaz eşyalarınızı ve kırılacak mutfak eşyalarınızı özel ambalaj malzemeleriyle paketler. Hassas cam eşyalar ve koliler özel sabitleme bantları ile desteklenerek araçlarımıza yerleştirilir. {experienceYears} yıllık deneyimimizle her taşıma aşamasını profesyonel olarak planlıyoruz.
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
              {n.name} Taşınma Fiyatınızı Şimdi Hesaplayın
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
              Eşyalarınızın miktarına ve kat durumuna göre sabit fiyat garantisiyle teklif almak için teklif formumuzu doldurabilir veya hemen bizi arayabilirsiniz.
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

          <RelatedLinks currentSlug={`/bolgeler/${ilce}/${n.slug}`} type="bolge" />
        </section>
      </main>
    </>
  );
}
