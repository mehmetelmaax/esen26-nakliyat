import PricingMatrix from '@/components/geo/PricingMatrix';
import QuoteForm from '@/components/QuoteForm';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import JsonLd from '@/components/JsonLd';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eskişehir Şehirlerarası Ev Taşıma | Esen 26 Nakliyat',
  description: "Eskişehir'den Türkiye genelinde 81 ile sigortalı, marangozlu ve sözleşmeli şehirlerarası evden eve nakliyat hizmeti. Sabit fiyat garantisiyle taşının.",
  alternates: {
    canonical: '/hizmetler/sehirlerarasi-evden-eve-nakliyat',
  },
};

export default function SehirlerarasiPage() {
  const sss = [
  {
    "question": "Eskişehir - İstanbul evden eve nakliye kaç gün sürer?",
    "answer": "Eskişehir’dan İstanbul’a taşınmalarımız Aksaray, Ankara, Bolu güzergahı üzerinden yaklaşık 950 km olup, yükleme yapıldıktan 24 saat sonra (ertesi gün sabah) teslim edilmektedir."
  },
  {
    "question": "Eskişehir - Ankara ev taşıma süresi ve montajı nasıl yapılır?",
    "answer": "Eskişehir - Ankara arası mesafemiz Pozantı tünelleri ve Aksaray yolu üzerinden 490 km’dir. Eşyalarınız aynı gün akşamüstü yeni evinizde marangoz montaj dahil anahtar teslim edilir."
  },
  {
    "question": "Eskişehir - İzmir nakliyat seferleriniz hangi sıklıktadır?",
    "answer": "İzmir güzergahımıza (Manisa, Uşak, Afyon üzerinden 900 km) haftada 3 gün düzenli parsiyel ve komple eşya taşıma seferleri düzenlenmektedir."
  },
  {
    "question": "Eskişehir - Bursa arası mobilya paketleme standardınız nedir?",
    "answer": "Bursa yönüne (780 km) olan tüm taşımalarımızda eşyalarınız çift kat patpat naylonlarla sarılır ve yol sarsıntısına karşı araç içinde kilitli gergilerle sabitlenir."
  },
  {
    "question": "Eskişehir - Antalya nakliye fiyatları ne kadardır?",
    "answer": "Antalya rotası (Alanya, Manavgat geçişli 620 km) için fiyatlar oda sayısına göre ortalama 30.000 TL ile 45.000 TL arasındadır."
  },
  {
    "question": "Eskişehir - Kütahya arası asansörlü nakliye yapıyor musunuz?",
    "answer": "Evet. Kütahya yönüne (80 km) 25. kata kadar ulaşabilen kendi mobil eşya asansörlerimizle sigortalı taşımacılık sunmaktayız."
  },
  {
    "question": "Eskişehir - Konya nakliye süresi ne kadardır?",
    "answer": "Konya (Ereğli geçişli 350 km) ev taşıma operasyonlarımız sabah yüklenip, aynı gün akşamüstü Konya’daki dairenizde sonlandırılır."
  },
  {
    "question": "Eskişehir - Bilecik arası parça eşya taşır mısınız?",
    "answer": "Evet. Bilecik yönüne (85 km) parça eşyalarınızı diğer müşterilerimizin eşyalarıyla birleştirerek uygun fiyata sevk ediyoruz."
  },
  {
    "question": "Eskişehir - Afyonkarahisar ev taşıma operasyonları kaç saat sürer?",
    "answer": "Eskişehir - Afyonkarahisar arası (130 km) taşımalarımız sabah yüklenip, yaklaşık 3 ila 4 saat içerisinde montaj dahil teslim edilerek tamamlanır."
  },
  {
    "question": "Eskişehir - Hatay nakliye hizmeti K3 belgeli mi?",
    "answer": "Evet. İskenderun ve Antakya (190 km) güzergahındaki tüm ev taşıma kamyonlarımız Ulaştırma Bakanlığı onaylı K3 belgesine sahiptir."
  },
  {
    "question": "Eskişehir - Kahramanmaraş arası asansör kurulabilir mi?",
    "answer": "Evet. Kahramanmaraş merkez ilçelerine (180 km) kendi mobil asansör araçlarımızla gidip yüksek katlı rezidanslara kurulum sunmaktadır."
  },
  {
    "question": "Eskişehir - Şanlıurfa taşınma fiyatı nasıl belirlenir?",
    "answer": "Şanlıurfa (360 km) nakliyat bedeli, otoyol geçiş ücretleri, kat numaraları ve oda yoğunluğuna göre sabit fiyatlı sözleşmeyle belirlenir."
  }
];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Şehirlerarası Evden Eve Nakliyat',
        description: "Eskişehir'den Türkiye genelinde 81 ile sigortalı, marangozlu ve sözleşmeli şehirlerarası evden eve nakliyat hizmeti. Sabit fiyat garantisiyle taşının.",
        slug: 'hizmetler/sehirlerarasi-evden-eve-nakliyat'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Hizmetlerimiz', url: '/#hizmetler' },
        { name: 'Şehirlerarası Evden Eve Nakliyat', url: '/hizmetler/sehirlerarasi-evden-eve-nakliyat' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Hizmet Seçenekleri', url: '/#hizmetlerimiz' }, { name: 'Şehirlerarası Nakliyat', url: '/hizmetler/sehirlerarasi-evden-eve-nakliyat' }]} className="pt-4" />
        {/* Intro */}
        <section className="py-20 bg-navy text-white text-center space-y-4">
          <span className="text-orange-text font-bold text-xs tracking-widest">
            TÜRKİYE GENELİ LOJİSTİK
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Şehirlerarası Evden Eve Nakliyat
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Eskişehir'den 81 ile emtia nakliyat sigortalı ve marangoz montaj dahil yasal şehirlerarası eşya taşımacılığı.
          </p>
        </section>

        {/* Detailed Content (GEO & SEO Optimized) */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl">
              Şehirlerarası Ev Taşıma Sigortası Neleri Kapsar?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Esen 26 Nakliyat şehirlerarası ev taşıma hizmetlerinde, eşyalarınızın tamamı {FACTS.insurer} emtia nakliyat sigortasıyla yangın, kaza ve doğal afet hasarlarına karşı güvence altına alınmaktadır. Emtia nakliyat sigortası, eşyaların taşıma esnasında karşılaşabileceği kaza, yangın ve hırsızlık gibi riskleri yasal teminat altına alan poliçe türüdür. Bu sigorta poliçesi, kamyonun seyir halindeyken karşılaşabileceği fiziksel hasarları yasal olarak tazmin eder.
            </p>
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="p-3 border border-gray-300 font-semibold">Şehirlerarası Nakliyat Hizmet Kapsamı</th>
                    <th className="p-3 border border-gray-300 font-semibold text-center w-32">Durum</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="bg-white">
                    <td className="p-3 border border-gray-300">Şehirlerarası Yolda Emtia Nakliyat Sigortası</td>
                    <td className="p-3 border border-gray-300 text-center text-green-600 font-bold">Dahil</td>
                  </tr>
                  <tr className="bg-off-white">
                    <td className="p-3 border border-gray-300">Köprü ve Otoyol Geçiş Ücretleri</td>
                    <td className="p-3 border border-gray-300 text-center text-green-600 font-bold">Dahil</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border border-gray-300">Mobilya Demontaj ve Yeni Evde Kurulum</td>
                    <td className="p-3 border border-gray-300 text-center text-green-600 font-bold">Dahil</td>
                  </tr>
                  <tr className="bg-off-white">
                    <td className="p-3 border border-gray-300">Yeni Eve Avize ve Korniş Montajı</td>
                    <td className="p-3 border border-gray-300 text-center text-red-600 font-bold">Hariç</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl">
              Şehirlerarası Nakliye Fiyatları Nasıl Hesaplanır?
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              K3 Yetki Belgesi, ev ve ofis eşyalarının ticari araçlarla karayolunda taşınması için Ulaştırma Bakanlığı tarafından zorunlu kılınan yasal yetki belgesidir. Şehirlerarası evden eve nakliye 1 fiyatları, yükleme noktası ile teslim noktası arasındaki tam kilometre mesafesine ve taşınacak eşyaların kapladığı hacme göre hesaplanır. Fiyat belirlemede otoban/köprü geçiş ücretleri ile asansör kurulum kat sayıları da maliyet parametrelerine eklenmektedir.
            </p>
          </div>

          {/* SSS Section */}
          
          {/* Section: Şehirlerarası Rotalarımız */}
          <div id="rotalar" className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-orange" />
              <span>Sıkça Hizmet Verdiğimiz Şehirlerarası Nakliyat Rotaları Nelerdir?</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Esen 26 Nakliyat merkezli olarak Türkiye genelinde en çok sefer düzenlediğimiz popüler şehirlerarası 81 il nakliyat hatlarımızı aşağıda bulabilirsiniz. İlgili bağlantılara tıklayarak rota detayları, kilometre mesafeleri, sürüş süreleri ve güncel fiyat listelerine erişebilirsiniz:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/rotalar/eskisehir-istanbul-evden-eve-nakliyat" className="bg-off-white hover:bg-orange/10 p-4 rounded-lg border border-gray-light/60 font-bold text-navy text-sm flex justify-between items-center transition-colors group">
                <span>Eskişehir - İstanbul Nakliyat</span>
                <ArrowRight className="w-4 h-4 text-orange transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/rotalar/eskisehir-ankara-evden-eve-nakliyat" className="bg-off-white hover:bg-orange/10 p-4 rounded-lg border border-gray-light/60 font-bold text-navy text-sm flex justify-between items-center transition-colors group">
                <span>Eskişehir - Ankara Nakliyat</span>
                <ArrowRight className="w-4 h-4 text-orange transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/rotalar/eskisehir-istanbul-evden-eve-nakliyat" className="bg-off-white hover:bg-orange/10 p-4 rounded-lg border border-gray-light/60 font-bold text-navy text-sm flex justify-between items-center transition-colors group">
                <span>Eskişehir - İstanbul Nakliyat</span>
                <ArrowRight className="w-4 h-4 text-orange transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/rotalar/eskisehir-ankara-evden-eve-nakliyat" className="bg-off-white hover:bg-orange/10 p-4 rounded-lg border border-gray-light/60 font-bold text-navy text-sm flex justify-between items-center transition-colors group">
                <span>Eskişehir - Ankara Nakliyat</span>
                <ArrowRight className="w-4 h-4 text-orange transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/rotalar/eskisehir-izmir-evden-eve-nakliyat" className="bg-off-white hover:bg-orange/10 p-4 rounded-lg border border-gray-light/60 font-bold text-navy text-sm flex justify-between items-center transition-colors group">
                <span>Eskişehir - İzmir Nakliyat</span>
                <ArrowRight className="w-4 h-4 text-orange transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/rotalar/eskisehir-antalya-evden-eve-nakliyat" className="bg-off-white hover:bg-orange/10 p-4 rounded-lg border border-gray-light/60 font-bold text-navy text-sm flex justify-between items-center transition-colors group">
                <span>Eskişehir - Antalya Nakliyat</span>
                <ArrowRight className="w-4 h-4 text-orange transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/rotalar/eskisehir-izmir-evden-eve-nakliyat" className="bg-off-white hover:bg-orange/10 p-4 rounded-lg border border-gray-light/60 font-bold text-navy text-sm flex justify-between items-center transition-colors group">
                <span>Eskişehir - İzmir Nakliyat</span>
                <ArrowRight className="w-4 h-4 text-orange transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/rotalar/eskisehir-bursa-evden-eve-nakliyat" className="bg-off-white hover:bg-orange/10 p-4 rounded-lg border border-gray-light/60 font-bold text-navy text-sm flex justify-between items-center transition-colors group">
                <span>Eskişehir - Bursa Nakliyat</span>
                <ArrowRight className="w-4 h-4 text-orange transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <PricingMatrix />
          <RelatedLinks currentSlug="sehirlerarasi-evden-eve-nakliyat" type="hizmet" />

          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl border-b border-gray-light pb-3">
              Şehirlerarası Rotalara Göre Sıkça Sorulanlar (İl Bazlı Detaylar)
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {sss.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-3" : ""}>
                  <span className="font-bold text-navy block mb-1">{item.question}</span>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h3 className="font-display font-bold text-navy text-xl md:text-2xl border-b border-gray-light pb-3">
              Hızlı ve Sabit Fiyat Teklifi Hesaplayın
            </h3>
            <QuoteForm isInline={true} />
          </div>

        </section>
      </main>
    </>
  );
}
