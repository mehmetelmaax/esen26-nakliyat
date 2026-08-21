import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, SERVICES } from '@/lib/site-config';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema , webPageSchema } from '@/lib/schema';
import { ArrowRight, Truck, Globe, ArrowUpRight, Building2, ShieldCheck, FileText, Warehouse, Package, Boxes, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Truck,
  Globe,
  ArrowUpRight,
  Building2,
  ShieldCheck,
  FileText,
  Warehouse,
  Package,
  Boxes,
  Sparkles
};

export const metadata: Metadata = {
  title: 'Profesyonel Nakliyat Hizmetlerimiz | Esen 26 Nakliyat',
  description: 'Esen 26 Nakliyat olarak Eskişehir genelinde sunduğumuz evden eve nakliyat, asansörlü taşıma, ofis nakliyesi ve eşya depolama hizmetleri detayları.',
  alternates: {
    canonical: '/hizmetler',
  },
  openGraph: {
    title: 'Profesyonel Nakliyat Hizmetlerimiz | Esen 26 Nakliyat',
    description: 'Esen 26 Nakliyat olarak Eskişehir genelinde sunduğumuz evden eve nakliyat, asansörlü taşıma, ofis nakliyesi ve eşya depolama hizmetleri detayları.',
    url: '/hizmetler',
    type: 'article',
    modifiedTime: '2026-08-16T08:00:00+03:00',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Profesyonel Nakliyat Hizmetlerimiz | Esen 26 Nakliyat' }],
  },
};

export default function HizmetlerHubPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hizmetlerimiz', url: '/hizmetler' }
  ]),
      webPageSchema({
        name: 'Profesyonel Nakliyat Hizmetlerimiz | Esen 26 Nakliyat',
        description: 'Esen 26 Nakliyat olarak Eskişehir genelinde sunduğumuz evden eve nakliyat, asansörlü taşıma, ofis nakliyesi ve eşya depolama hizmetleri detayları.',
        slug: '/hizmetler',
        dateModified: '2026-08-16'
      })
    ]
  };

  return (
    <>
      <JsonLd data={schema} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Hizmetlerimiz', url: '/hizmetler' }]} className="pt-4" />
        
        {/* Hero Section */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs uppercase tracking-widest">
            PROFESYONEL ÇÖZÜMLER
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Hizmetlerimiz
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4">
            Marangoz montajlı paketlemeden 25. kata kadar ulaşan asansörlü filomuza kadar tüm lojistik süreçlerinizde kurumsal çözümler sunuyoruz.
          </p>
        </section>

        {/* Services Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((s) => {
              const IconComponent = iconMap[s.icon] || Truck;
              return (
                <div key={s.slug} className="bg-white p-8 rounded-2xl border border-gray-light flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-4">
                    <div className="bg-orange/10 p-3.5 rounded-xl w-fit text-orange-text">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h2 className="font-display font-bold text-navy text-xl">{s.name}</h2>
                    <p className="text-charcoal text-xs leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                  <Link
                    href={`/hizmetler/${s.slug}`}
                    className="text-orange hover:text-navy font-bold text-xs flex items-center gap-1.5 transition-colors pt-2"
                  >
                    <span>Detayları İncele</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
