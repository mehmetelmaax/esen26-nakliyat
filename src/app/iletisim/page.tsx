import { SITE, STATIC_PAGES_CONFIG } from '@/lib/site-config';
import React from 'react';
import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import JsonLd from '@/components/JsonLd';
import { localBusinessSchema, organizationSchema, webPageSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';
import MapEmbed from '@/components/MapEmbed';

export const metadata: Metadata = {
  title: 'İletişim - Esen 26 Nakliyat Eskişehir',
  description: "Esen 26 Nakliyat Tepebaşı ofis iletişim bilgileri. Fiyat teklifi almak, rezervasyon yapmak veya bilgi edinmek için bize ulaşın.",
  alternates: {
    canonical: '/iletisim',
  },
};

export default function IletisimPage() {
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      localBusinessSchema(),
      webPageSchema({
        name: 'İletişim - Esen 26 Nakliyat Eskişehir',
        description: "Esen 26 Nakliyat Tepebaşı ofis iletişim bilgileri. Fiyat teklifi almak, rezervasyon yapmak veya bilgi edinmek için bize ulaşın.",
        slug: '/iletisim',
        dateModified: STATIC_PAGES_CONFIG['/iletisim']
      })
    ]
  };

  return (
    <>
      <JsonLd data={graphSchema} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'İletişim', url: '/iletisim' }]} className="pt-4" emitSchema />
        {/* Intro */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest">
            BİZE ULAŞIN
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            İletişim Bilgilerimiz
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto">
            Taşınma planınız için teklif almak veya rezervasyon yapmak üzere bizimle irtibata geçin.
          </p>
        </section>

        {/* Contact Info & Simple form */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
                <h2 className="font-display font-bold text-navy text-xl border-b border-gray-light pb-3">
                  Ofis ve İletişim Detayları
                </h2>
                
                <div className="space-y-4 text-sm text-charcoal">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block mb-0.5">Adres:</span>
                      <p>{`${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.locality} / ${SITE.address.region}`}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Phone className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block mb-0.5">Telefon / GSM:</span>
                      <a href={SITE.phoneHref} className="hover:text-orange transition-colors font-bold">
                        0532 012 60 26
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Mail className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block mb-0.5">E-Posta:</span>
                      <a href={`mailto:${SITE.email}`} className="hover:text-orange transition-colors">
                        {SITE.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <Clock className="w-5 h-5 text-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block mb-0.5">Çalışma Saatleri:</span>
                      <p>Hafta İçi ve Hafta Sonu: 07:00 – 22:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Google Maps Location Embed */}
            <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-gray-light shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="font-display font-bold text-navy text-xl border-b border-gray-light pb-3">
                  Google Haritalar Ofis Konumumuz
                </h2>
                <p className="text-charcoal text-xs md:text-sm leading-relaxed font-semibold">
                  Tepebaşı merkezli garajımız ve ofisimize ait harita konumu aşağıda yer almaktadır. Yol tarifi almak için haritayı kullanabilir veya alttaki butona tıklayabilirsiniz.
                </p>
              </div>

              {/* Map Iframe */}
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-light shadow-inner bg-navy/5 relative">
                <MapEmbed />
              </div>

              {/* Yol Tarifi Button */}
              <a
                href="https://maps.app.goo.gl/oZBkztaiuicPXVQT8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange hover:bg-navy text-navy hover:text-white font-black py-3.5 px-6 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md w-full text-center"
              >
                <MapPin className="w-4 h-4" />
                <span>Google Haritalar'da Yol Tarifi Alın</span>
              </a>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
