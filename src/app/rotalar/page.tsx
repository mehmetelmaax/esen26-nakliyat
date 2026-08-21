import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, ROUTES } from '@/lib/site-config';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema , webPageSchema } from '@/lib/schema';
import { ArrowRight, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Şehirlerarası Taşımacılık Rotalarımız | Esen 26 Nakliyat',
  description: 'Eskişehir çıkışlı şehirlerarası evden eve nakliyat rotalarımız. Ankara, İstanbul, İzmir, Bursa ve Antalya şehirlerarası taşımacılık detayları.',
  alternates: {
    canonical: '/rotalar',
  },
  openGraph: {
    title: 'Şehirlerarası Taşımacılık Rotalarımız | Esen 26 Nakliyat',
    description: 'Eskişehir çıkışlı şehirlerarası evden eve nakliyat rotalarımız. Ankara, İstanbul, İzmir, Bursa ve Antalya şehirlerarası taşımacılık detayları.',
    url: '/rotalar',
    type: 'article',
    modifiedTime: '2026-08-16T08:00:00+03:00',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Şehirlerarası Taşımacılık Rotalarımız | Esen 26 Nakliyat' }],
  },
};

export default function RotalarHubPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Şehirlerarası Rotalarımız', url: '/rotalar' }
  ]),
      webPageSchema({
        name: 'Şehirlerarası Taşımacılık Rotalarımız | Esen 26 Nakliyat',
        description: 'Eskişehir çıkışlı şehirlerarası evden eve nakliyat rotalarımız. Ankara, İstanbul, İzmir, Bursa ve Antalya şehirlerarası taşımacılık detayları.',
        slug: '/rotalar',
        dateModified: '2026-08-16'
      })
    ]
  };

  return (
    <>
      <JsonLd data={schema} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Şehirlerarası Rotalarımız', url: '/rotalar' }]} className="pt-4" />
        
        {/* Hero Section */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs uppercase tracking-widest">
            TÜRKİYE GENELİ SEVKİYAT
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Şehirlerarası Nakliyat Rotalarımız
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4">
            Eskişehir merkezli olarak Türkiye genelinde en çok sefer düzenlediğimiz düzenli şehirlerarası evden eve nakliyat rotalarımız ve yol analizleri.
          </p>
        </section>

        {/* Routes Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROUTES.map((r) => (
              <div key={r.slug} className="bg-white p-8 rounded-2xl border border-gray-light flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="bg-orange/10 p-3 rounded-lg w-fit text-orange-text flex items-center gap-1.5 font-display font-black text-sm uppercase">
                    <MapPin className="w-4 h-4" />
                    <span>{r.city}</span>
                  </div>
                  <h2 className="font-display font-bold text-navy text-lg">Eskişehir &rarr; {r.city} Nakliyat</h2>
                  <p className="text-charcoal text-xs leading-relaxed">
                    <strong>Mesafe:</strong> {r.distanceKm} Km | <strong>Süre:</strong> {r.durationHours} Saat<br/>
                    <strong>Güzergah:</strong> {r.viaRoute}<br/>
                    <strong>Tahmini Fiyat Aralığı:</strong> {r.priceRangeMin.toLocaleString('tr-TR')} TL - {r.priceRangeMax.toLocaleString('tr-TR')} TL
                  </p>
                  <p className="text-gray-medium text-xs leading-relaxed italic border-t border-gray-light/60 pt-3">
                    {r.notes}
                  </p>
                </div>
                <Link
                  href={`/rotalar/${r.slug}`}
                  className="text-orange hover:text-navy font-bold text-xs flex items-center gap-1.5 transition-colors pt-2"
                >
                  <span>Güzergah Detaylarını Gör</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
