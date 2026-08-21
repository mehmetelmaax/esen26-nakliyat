import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, DISTRICTS, NEIGHBORHOODS } from '@/lib/site-config';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema , webPageSchema } from '@/lib/schema';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hizmet Bölgelerimiz | Esen 26 Nakliyat Eskişehir',
  description: 'Esen 26 Nakliyat olarak Eskişehir Tepebaşı, Odunpazarı ve tüm ilçelerinde asansörlü, sigortalı evden eve nakliyat hizmetleri sunuyoruz.',
  alternates: {
    canonical: '/bolgeler',
  },
  openGraph: {
    title: 'Hizmet Bölgelerimiz | Esen 26 Nakliyat Eskişehir',
    description: 'Esen 26 Nakliyat olarak Eskişehir Tepebaşı, Odunpazarı ve tüm ilçelerinde asansörlü, sigortalı evden eve nakliyat hizmetleri sunuyoruz.',
    url: '/bolgeler',
    type: 'article',
    modifiedTime: '2026-08-16T08:00:00+03:00',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Hizmet Bölgelerimiz | Esen 26 Nakliyat Eskişehir' }],
  },
};

export default function BolgelerHubPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Bölgelerimiz', url: '/bolgeler' }
  ]),
      webPageSchema({
        name: 'Hizmet Bölgelerimiz | Esen 26 Nakliyat Eskişehir',
        description: 'Esen 26 Nakliyat olarak Eskişehir Tepebaşı, Odunpazarı ve tüm ilçelerinde asansörlü, sigortalı evden eve nakliyat hizmetleri sunuyoruz.',
        slug: '/bolgeler',
        dateModified: '2026-08-16'
      })
    ]
  };

  const tepebasiMh = NEIGHBORHOODS.filter((n) => n.district === 'tepebasi');
  const odunpazariMh = NEIGHBORHOODS.filter((n) => n.district === 'odunpazari');

  return (
    <>
      <JsonLd data={schema} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Bölgelerimiz', url: '/bolgeler' }]} className="pt-4" />
        
        {/* Hero Section */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs uppercase tracking-widest">
            GENİŞ HİZMET AĞI
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Hizmet Bölgelerimiz
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4">
            Eskişehir merkez ve taşra ilçelerinin tamamında, mahalle bazlı saha tecrübemiz ve dış cephe asansörlerimizle sabit fiyat garantili nakliye hizmeti sunuyoruz.
          </p>
        </section>

        {/* Regions Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Tepebaşı & Odunpazarı Special Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tepebaşı */}
            <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange/10 p-3 rounded-lg text-orange-text">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-black text-navy text-2xl">Tepebaşı Bölgesi</h2>
                  <p className="text-gray-medium text-xs">Eskişehir Kuzey/Batı Yakası Nakliyat</p>
                </div>
              </div>
              
              <p className="text-charcoal text-sm leading-relaxed">
                Rezidans ve modern sitelerin yoğun olduğu Tepebaşı bölgesinde 25. kata kadar kurulabilen mobil dış cephe asansörlerimizle kurumsal ev taşıma desteği sağlıyoruz.
              </p>
              
              <div className="border-t border-gray-light pt-4 space-y-3">
                <span className="text-xs font-bold text-navy uppercase tracking-wider block">Hizmet Verdiğimiz Mahalleler:</span>
                <div className="grid grid-cols-2 gap-2">
                  {tepebasiMh.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/bolgeler/tepebasi/${m.slug}`}
                      className="text-xs text-charcoal hover:text-orange-text font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                      <span>{m.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/bolgeler/tepebasi-evden-eve-nakliyat"
                className="text-orange hover:text-navy text-xs font-bold flex items-center gap-1 transition-colors pt-2"
              >
                <span>Tepebaşı İlçe Detaylarını Gör</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Odunpazarı */}
            <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange/10 p-3 rounded-lg text-orange-text">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display font-black text-navy text-2xl">Odunpazarı Bölgesi</h2>
                  <p className="text-gray-medium text-xs">Eskişehir Güney/Doğu Yakası Nakliyat</p>
                </div>
              </div>
              
              <p className="text-charcoal text-sm leading-relaxed">
                Tarihi dokunun ve geniş caddelerin yer aldığı Odunpazarında, dar sokaklar için özel küçük kamyonet filomuz ve deneyimli kadromuzla hasarsız nakliye sunuyoruz.
              </p>
              
              <div className="border-t border-gray-light pt-4 space-y-3">
                <span className="text-xs font-bold text-navy uppercase tracking-wider block">Hizmet Verdiğimiz Mahalleler:</span>
                <div className="grid grid-cols-2 gap-2">
                  {odunpazariMh.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/bolgeler/odunpazari/${m.slug}`}
                      className="text-xs text-charcoal hover:text-orange-text font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" />
                      <span>{m.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/bolgeler/odunpazari-evden-eve-nakliyat"
                className="text-orange hover:text-navy text-xs font-bold flex items-center gap-1 transition-colors pt-2"
              >
                <span>Odunpazarı İlçe Detaylarını Gör</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Other Districts Grid */}
          <div className="space-y-6">
            <h3 className="font-display font-black text-navy text-xl border-b border-gray-light pb-3">Diğer İlçelerimiz</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {DISTRICTS.filter((d) => d.slug !== 'tepebasi-evden-eve-nakliyat' && d.slug !== 'odunpazari-evden-eve-nakliyat' && d.slug !== 'eskisehir-merkez-evden-eve-nakliyat').map((d) => (
                <div key={d.slug} className="bg-white p-6 rounded-xl border border-gray-light flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-display font-bold text-navy text-base">{d.name}</h4>
                    <p className="text-charcoal/80 text-xs leading-relaxed mt-2">
                      {d.name} ilçesindeki taşınma ihtiyaçlarınızda kapalı kasa araçlarımız ve asansör sistemlerimizle yanınızdayız.
                    </p>
                  </div>
                  <Link
                    href={`/bolgeler/${d.slug}`}
                    className="text-orange-text hover:text-navy font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <span>{d.name} Şubesine Git</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
