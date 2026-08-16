import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, DISTRICTS } from '@/lib/site-config';
import HeroSlider from '@/components/HeroSlider';
import TrustStrip from '@/components/TrustStrip';
import ServicesGrid from '@/components/ServicesGrid';
import FAQAccordion from '@/components/FAQAccordion';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import JsonLd from '@/components/JsonLd';
import { faqSchema, videoSchema } from '@/lib/schema';
import { faqs } from '@/lib/faq-data';
import { Star, ShieldAlert, BadgeCheck, Users2, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { reviewsDatabase as reviews } from '@/lib/reviews';

export const metadata: Metadata = {
  title: 'Eskişehir Evden Eve Nakliyat | Esen 26 Nakliyat Sabit Fiyat',
  description: "Eskişehir'de taşınma günü ek ücret çıkarmayan, sabit fiyat garantili asansörlü evden eve nakliyat firması. Tepebaşı ve Odunpazarı'nda sigortalı taşıma.",
  keywords: [
    'eskisehir evden eve nakliyat',
    'esen 26 evden eve nakliyat',
    'esen 26 evden eve',
    'tepebasi evden eve nakliyat',
    'odunpazari evden eve nakliyat',
    'eskisehir nakliyat firmalari',
  ],
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      faqSchema(faqs),
      videoSchema()
    ]
  };

  return (
    <>
      <JsonLd data={graphSchema} />
      
      <main className="flex-1 w-full">
        <h1 className="sr-only">Eskişehir Evden Eve Nakliyat | Sabit Fiyatlı Asansörlü Taşımacılık</h1>
        {/* Hero Area */}
        <HeroSlider />

        {/* Local Verified badges */}
        <TrustStrip />

        {/* Neden Esen 26 Section */}
        <section className="py-20 bg-white" id="neden-esenler">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-orange-text font-bold text-xs tracking-widest">
                KURUMSAL FARKIMIZ
              </span>
              <h2 className="font-display font-black text-navy text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
                Neden Esen 26 Eskişehir Nakliyat?
              </h2>
              <p className="text-charcoal text-base md:text-lg leading-relaxed">
                Taşınma günündeki sürpriz ek masraf ve hasar endişelerinizi yasal garantilerle ortadan kaldırıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-light/60 shadow-premium shadow-premium-hover space-y-4">
                <div className="bg-orange/10 text-orange p-3.5 rounded-lg w-fit">
                  <BadgeCheck className="w-6 h-6 text-orange-text" />
                </div>
                <h3 className="font-display font-bold text-navy text-lg">Sabit Fiyat Sözleşmesi</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Taşıma öncesinde hazırladığımız resmi sözleşme ile anlaşılan fiyatı sabitliyoruz. Taşınma günü veya yol bittiğinde hiçbir ad altında ek ücret talep etmiyoruz.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-light/60 shadow-premium shadow-premium-hover space-y-4">
                <div className="bg-orange/10 text-orange p-3.5 rounded-lg w-fit">
                  <Users2 className="w-6 h-6 text-orange-text" />
                </div>
                <h3 className="font-display font-bold text-navy text-lg">Eğitimli Kadrolu Personel</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Ekiplerimizin tamamı marangozluk ve beyaz eşya tesisatı konularında deneyimli kendi çalışanlarımızdır. Günlük yevmiyeli veya güvencesiz hamal çalıştırmıyoruz.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-light/60 shadow-premium shadow-premium-hover space-y-4">
                <div className="bg-orange/10 text-orange p-3.5 rounded-lg w-fit">
                  <Building2 className="w-6 h-6 text-orange-text" />
                </div>
                <h3 className="font-display font-bold text-navy text-lg">Kendi Mobil Asansör Filomuz</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Dışarıdan kiralık asansör aramak yerine, 25. kata kadar ulaşan kendi araç filomuzdaki mobil asansör sistemlerini sevk ederek işlerin aksamasını önlüyoruz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Priority Services */}
        <ServicesGrid />

        {/* Operational Steps */}
        <section className="py-20 bg-white" id="surec">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-orange-text font-bold text-xs tracking-widest">
                İŞLEYİŞ MODELİ
              </span>
              <h2 className="font-display font-black text-navy text-3xl md:text-4xl tracking-tight leading-tight">
                Nasıl Taşıyoruz?
              </h2>
              <p className="text-charcoal text-sm md:text-base">
                Taşınma gününün karmaşasını ortadan kaldıran 4 adımlı standart çalışma modelimiz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="space-y-4 text-center md:text-left relative">
                <span className="font-display font-black text-orange/30 text-5xl md:text-6xl block">01</span>
                <h3 className="font-display font-bold text-navy text-lg">Hızlı Keşif ve Fiyatlama</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Oda sayınızı ve eşya miktarınızı analiz edip net, sabit fiyat teklifimizi sözleşmeyle sunarız.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-display font-black text-orange/30 text-5xl md:text-6xl block">02</span>
                <h3 className="font-display font-bold text-navy text-lg">Özenli Paketleme</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Eşyalarınızı çift katlı havalı balonlu naylonlar ve kalın Kraft karton kutularla darbeye karşı sararız.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-display font-black text-orange/30 text-5xl md:text-6xl block">03</span>
                <h3 className="font-display font-bold text-navy text-lg">Asansörlü Yükleme</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Kendi dış cephe asansörlerimizle eşyaları dar apartman merdivenlerine sokmadan doğrudan araca indiririz.
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-4 text-center md:text-left">
                <span className="font-display font-black text-orange/30 text-5xl md:text-6xl block">04</span>
                <h3 className="font-display font-bold text-navy text-lg">Montaj ve Yerleşim</h3>
                <p className="text-charcoal text-sm leading-relaxed">
                  Yeni evinizde gardırop marangoz montajını yapar, beyaz eşyaları bağlar ve çalışır halde teslim ederiz.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Eskişehir'in Tüm İlçelerinde Hizmetteyiz Section */}
        <section className="py-20 bg-white" id="ilcelerimiz">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-orange-text font-bold text-xs tracking-widest">
                GENİŞ HİZMET AĞI
              </span>
              <h2 className="font-display font-black text-navy text-3xl md:text-4xl tracking-tight leading-tight">
                Eskişehir'in Tüm İlçelerinde Hizmetteyiz
              </h2>
              <p className="text-charcoal text-base leading-relaxed">
                Eskişehir merkezli araç filomuzla Tepebaşı'dan Sivrihisar'a kadar 14 ilçenin tamamında asansörlü ve sigortalı ev taşıma desteği sağlıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {DISTRICTS.map((d, idx) => {
                const anchors = [
                  `${d.name} evden eve nakliyat`,
                  `${d.name} ev taşıma firması`,
                  `${d.name} asansörlü nakliye`,
                  `${d.name} nakliyat hizmetleri`,
                ];
                const anchorText = anchors[idx % anchors.length];
                return (
                  <div key={d.slug} className="bg-off-white p-6 rounded-xl border border-gray-light hover:border-orange/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-3">
                    <h3 className="font-display font-bold text-navy text-base">{d.name} Şubesi</h3>
                    <p className="text-charcoal/80 text-xs leading-relaxed">
                      {d.name} bölgesinde yüksek katlı daireler için modüler dış cephe asansörlerimizle sabit fiyatlı ev nakliyat hizmeti vermekteyiz.
                    </p>
                    <Link
                      href={`/bolgeler/${d.slug}`}
                      className="text-orange-text hover:underline text-xs font-bold block"
                    >
                      {anchorText} ➔
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tanıtım Videosu Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="text-orange-text font-bold text-xs tracking-widest uppercase">
                Operasyonel Kalitemiz
              </span>
              <h2 className="font-display font-black text-navy text-3xl md:text-4xl tracking-tight leading-tight">
                Esen 26 Nakliyat Faaliyet Videosu
              </h2>
              <p className="text-charcoal text-base max-w-2xl mx-auto leading-relaxed">
                Asansörlü nakliye araçlarımızın kurulumunu, mobilya paketleme standartlarımızı ve kurumsal ekibimizin çalışma operasyonlarını izleyin.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video max-w-4xl mx-auto bg-navy/5">
              <video
                src="/img/esen-video.mp4"
                controls
                muted
                playsInline
                loop
                preload="none"
                className="w-full h-full object-cover"
                poster="/img/esen-slayt-1.jpg"
              />
            </div>
          </div>
        </section>

        {/* Google Maps Reviews Section */}
        <section className="py-20 bg-gray-light/30" id="yorumlar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <span className="text-orange-text font-bold text-xs tracking-widest">
                MÜŞTERİ DENEYİMLERİ
              </span>
              <h2 className="font-display font-black text-navy text-3xl md:text-4xl tracking-tight leading-tight">
                Google Harita Yorumlarımız
              </h2>
              
              {/* Average rating badge */}
              <div className="flex items-center justify-center gap-2 mt-4 bg-white px-4 py-2 rounded-full w-fit mx-auto border border-gray-light shadow-sm">
                <Star className="w-5 h-5 fill-orange text-orange" />
                <span className="text-navy font-bold text-sm">4.9 / 5.0</span>
                <span className="text-gray-400 font-semibold text-xs border-l border-gray-light pl-2">184 Değerlendirme</span>
              </div>
            </div>

            {/* Reviews Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review, idx) => (
                <div 
                  key={idx}
                  className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-light/60 shadow-premium shadow-premium-hover space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex gap-1 text-orange">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {/* Comment */}
                    <p className="text-charcoal text-sm leading-relaxed font-semibold italic">
                      "{review.comment}"
                    </p>
                  </div>
                  {/* User Meta */}
                  <div className="border-t border-gray-light/60 pt-4 flex justify-between items-center text-xs">
                    <span className="font-bold text-navy">{review.name}</span>
                    <span className="text-orange-text font-bold tracking-wider">{review.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Google Review action */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
              <a
                href="https://maps.app.goo.gl/oZBkztaiuicPXVQT8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange hover:bg-navy text-navy hover:text-white font-black px-6 py-3.5 rounded-xl border border-navy transition-all duration-200 text-sm flex items-center gap-2 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Star className="w-4 h-4 fill-current animate-spin-slow" />
                <span>Google'da Yorum Yazın (Değerlendirin)</span>
              </a>
              <a
                href="https://maps.app.goo.gl/oZBkztaiuicPXVQT8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy hover:text-orange font-bold text-sm flex items-center gap-1.5 transition-colors py-3"
              >
                <span>Tüm Yorumları Google Haritalar'da Oku</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Bottom Call to Action banner */}
        <section className="py-16 bg-navy text-white text-center space-y-6">
          <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl tracking-tight max-w-xl mx-auto">
            Hemen Sabit Fiyatlı Teklifinizi Alın
          </h2>
          <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
            Dairenizin oda durumunu seçin, asansör ihtiyacınızı belirterek taşınma bedelinizi hemen hesaplayın.
          </p>
          <Link
            href="/teklif-al"
            className="bg-orange hover:bg-white text-navy font-black px-8 py-4 rounded border border-navy transition-all duration-200 inline-block text-base shadow-md cursor-pointer active:scale-95"
          >
            Maliyeti Hesapla
          </Link>
        </section>

        {/* FAQ Area */}
        <FAQAccordion />
      </main>

      {/* Floating CTA */}
      <StickyMobileCTA />
    </>
  );
}
