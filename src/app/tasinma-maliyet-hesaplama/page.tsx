import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PriceCalculator from '@/components/PriceCalculator';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, serviceSchema , webPageSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Eskişehir Ev Taşıma Maliyeti Hesaplama | Esen 26',
  description: 'Oda sayısı, kat yükseklikleri, asansör durumu ve yol mesafesine göre Eskişehir evden eve nakliyat maliyetini hesaplayın. Sabit fiyat garantisi.',
  alternates: {
    canonical: '/tasinma-maliyet-hesaplama',
  },
  openGraph: {
    title: 'Eskişehir Ev Taşıma Maliyeti Hesaplama | Esen 26',
    description: 'Oda sayısı, kat yükseklikleri, asansör durumu ve yol mesafesine göre Eskişehir evden eve nakliyat maliyetini hesaplayın. Sabit fiyat garantisi.',
    url: '/tasinma-maliyet-hesaplama',
    type: 'article',
    modifiedTime: '2026-08-16T08:00:00+03:00',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Eskişehir Ev Taşıma Maliyeti Hesaplama | Esen 26' }],
  },
};

export default function TasinmaMaliyetHesaplamaPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageSchema({
        name: 'Eskişehir Ev Taşıma Maliyeti Hesaplama | Esen 26',
        description: 'Oda sayısı, kat yükseklikleri, asansör durumu ve yol mesafesine göre Eskişehir evden eve nakliyat maliyetini hesaplayın. Sabit fiyat garantisi.',
        slug: '/tasinma-maliyet-hesaplama',
        dateModified: '2026-08-16'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Taşınma Maliyet Hesaplama', url: '/tasinma-maliyet-hesaplama' }
      ]),
      serviceSchema({
        name: 'Eskişehir Nakliyat Fiyat Hesaplama Hizmeti',
        description: 'Daire oda durumu, kat yüksekliği ve mesafeye göre asansörlü ev taşıma maliyeti hesaplama aracı.',
        slug: 'tasinma-maliyet-hesaplama',
        areaName: 'Eskişehir'
      })
    ]
  };

  return (
    <>
      <JsonLd data={schema} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Fiyat Hesaplama', url: '/tasinma-maliyet-hesaplama' }]} className="pt-4" />
        
        {/* Intro Section */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs uppercase tracking-widest">
            BÜTÇE HESAPLAMA ROBOTU
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Eskişehir Taşınma Maliyeti Hesaplama
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4 leading-relaxed">
            Eşyalarınızın durumunu, bulunduğunuz kat seviyelerini ve mesafe kriterlerini girerek nakliye maliyetinizi anında görün. Taşınma gününde sürpriz ek ücret yok!
          </p>
        </section>

        {/* Calculator Widget Container */}
        <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <PriceCalculator />
          
          {/* Informative Local SEO Copy below the calculator */}
          <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm mt-12 space-y-6 text-charcoal">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl">
              Eskişehir Nakliyat Fiyatları Nasıl Belirlenir?
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-charcoal/90">
              Eskişehir'de ev taşımacılığı fiyatlarında ana maliyet unsurlarını iş gücü saatleri (çalışacak personel sayısı), ambalajlama malzemeleri sarfiyatı, dış cephe yük asansörü kurulumu ve araç yakıt giderleri oluşturur. 2026 yılı fiyat analizleri ve ayrıntılı rakamlar için <Link href="/blog/eskisehir-tasinma-maliyeti-2026" className="text-orange hover:underline font-semibold">Eskişehir taşınma maliyeti 2026</Link> incelememizi okuyabilirsiniz.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-charcoal/90">
              Giriş ve hedef kat seviyeleri asansör kurulumunun gerekip gerekmediğini tayin eder. Asansör kurulumu, apartman içi merdivenlerden elle taşıma yapılmasına kıyasla eşya hasar ihtimalini tamamen sıfıra indirirken, toplam operasyon süresini yarı yarıya düşürerek iş gücünden tasarruf etmenizi sağlar. Esen 26 Nakliyat olarak, yaptığımız tüm hesaplamaları sözleşme ile sabitleyerek taşınma günü ek maliyet yansıtılmayacağını taahhüt ediyoruz.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
