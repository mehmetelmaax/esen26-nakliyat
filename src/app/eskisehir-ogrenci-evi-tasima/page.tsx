import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema, serviceSchema , webPageSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { ArrowRight, GraduationCap, Clock, ShieldCheck, HeartHandshake, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eskişehir Öğrenci Evi Taşıma ve Parça Nakliye | Esen 26',
  description: 'Eskişehir Anadolu ve Osmangazi Üniversitesi öğrencilerine özel indirimli, asansörlü apart taşıma ve parça eşya nakliyat fiyatları ve rehberi.',
  alternates: {
    canonical: '/eskisehir-ogrenci-evi-tasima',
  },
  openGraph: {
    title: 'Eskişehir Öğrenci Evi Taşıma ve Parça Nakliye | Esen 26',
    description: 'Eskişehir Anadolu ve Osmangazi Üniversitesi öğrencilerine özel indirimli, asansörlü apart taşıma ve parça eşya nakliyat fiyatları ve rehberi.',
    url: '/eskisehir-ogrenci-evi-tasima',
    type: 'article',
    modifiedTime: '2026-08-16T08:00:00+03:00',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Eskişehir Öğrenci Evi Taşıma ve Parça Nakliye | Esen 26' }],
  },
};

export default function OgrenciEviTasimaPage() {
  const sss = [
    {
      question: 'Öğrenci evi nakliyesinde tek parça veya az eşya için fiyatlar nasıl belirlenir?',
      answer: 'Öğrenci evlerinde genellikle beyaz eşya ve birkaç mobilya gibi sınırlı sayıda eşya bulunur. Büyük nakliye kamyonları yerine daha düşük yakıt tüketen küçük panelvan veya nakliye kamyonetlerimizi sevk ederek maliyetleri minimize ediyor, öğrencilere özel indirimli fiyatlar uyguluyoruz.'
    },
    {
      question: 'Öğrenci apartlarında asansörlü taşıma aracı kurmak mümkün müdür?',
      answer: 'Eskişehir Bağlar, Eskibağlar ve Yenibağlar gibi öğrenci apartlarının yoğun olduğu dar sokaklarda mobil teleskopik asansörlerimizin kurulacağı zemin açısı önceden incelenir. Uygun olduğunda bina içi merdivenleri kullanmadan pencerelerden asansörlü güvenli yükleme yapıyoruz.'
    },
    {
      question: 'Buzdolabı, çamaşır makinesi ve gardırop söküm-montajı ücrete dahil midir?',
      answer: 'Evet. Paket içeriğine uzman marangoz marifetiyle beyaz eşya sökümü, ambalajlanması, yeni adreste montajı ve çalışır durumda bağlantılarının yapılması standart olarak dahildir. Öğrencilerimizden marangozluk için ek bir ücret talep edilmez.'
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageSchema({
        name: 'Eskişehir Öğrenci Evi Taşıma ve Parça Nakliye | Esen 26',
        description: 'Eskişehir Anadolu ve Osmangazi Üniversitesi öğrencilerine özel indirimli, asansörlü apart taşıma ve parça eşya nakliyat fiyatları ve rehberi.',
        slug: '/eskisehir-ogrenci-evi-tasima',
        dateModified: '2026-08-16'
      }),
      serviceSchema({
        name: 'Eskişehir Öğrenci Evi Taşıma Hizmeti',
        description: 'Eskişehir üniversite öğrencilerine özel, indirimli apart taşıma, parça eşya nakliyesi ve asansörlü lojistik desteği.',
        slug: 'eskisehir-ogrenci-evi-tasima',
        areaName: 'Eskişehir'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Öğrenci Evi Taşıma', url: '/eskisehir-ogrenci-evi-tasima' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Öğrenci Evi Taşıma', url: '/eskisehir-ogrenci-evi-tasima' }]} className="pt-4" />
        
        {/* Hero Section */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
            <GraduationCap className="w-5 h-5 text-orange" />
            <span>ÖĞRENCİ DOSTU NAKLİYE</span>
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Eskişehir Öğrenci Evi Taşıma Kılavuzu
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4 leading-relaxed">
            Anadolu Üniversitesi ve Eskişehir Osmangazi Üniversitesi öğrencilerine özel indirimli fiyatlarla, apart daire ve parça eşya nakliye çözümleri.
          </p>
        </section>

        {/* Detailed Copy Section */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-charcoal">
          
          <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <HeartHandshake className="text-orange shrink-0" /> Öğrenci Bütçesine Uygun Nakliyat Çözümleri
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-charcoal/90">
              Eskişehir, büyük öğrenci nüfusuyla bilinen dinamik bir üniversite şehridir. Her yıl binlerce öğrenci mezuniyet, ev değişikliği veya yeni kayıt dönemlerinde taşınma ihtiyacı duyar. Esen 26 Nakliyat olarak, öğrencilerimizin kısıtlı bütçelerini göz önünde bulundurarak özel indirimli tarifeler hazırlıyoruz. Eskişehir genelinde doğru mahalleyi seçmek için <Link href="/blog/eskisehir-semt-rehberi" className="text-orange hover:underline font-semibold">Eskişehir semt rehberi</Link> makalemize göz atabilir ve en sakin taşınma dönemleri için <Link href="/blog/eskisehirda-tasinmak-icin-en-uygun-zaman" className="text-orange hover:underline font-semibold">taşınmak için en uygun zaman</Link> analizimizi inceleyebilirsiniz.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-charcoal/90">
              Büyük nakliye tırları yerine daha ekonomik yakıt tüketen küçük panelvan ve kamyonet araçlarımızla parça eşyalarınızı (örneğin sadece yatak, buzdolabı ve çalışma masası) çok uygun maliyetlerle taşıyoruz. Eşyalarınızın paketlenmesini isterseniz, ekibimiz ambalajlama ve montaj dahil tüm süreçleri üstlenerek sizi zahmetten kurtarır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-3">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange" /> Aynı Gün Teslimat
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-charcoal/80">
                Bağlar, Eskibağlar ve Yenibağlar bölgelerindeki apart daire taşımalarımızı aynı gün içerisinde birkaç saatlik planlama ile hızlı ve pratik şekilde tamamlıyoruz.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-3">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange" /> Sigortalı Taşınma Güvencesi
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-charcoal/80">
                Öğrenci evi de olsa tüm taşıma işlemlerimiz Anadolu Sigorta güvencesiyle emtia sigortalı olarak yürütülür, taşıma esnasında eşyalarınız güvence altındadır.
              </p>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-light shadow-sm">
            <h3 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <HelpCircle className="text-orange shrink-0" /> Sıkça Sorulan Sorular
            </h3>
            <div className="space-y-4">
              {sss.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-4" : ""}>
                  <span className="font-bold text-navy text-sm md:text-base block mb-2">{item.question}</span>
                  <p className="text-xs md:text-sm leading-relaxed text-charcoal/80">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-navy rounded-2xl p-8 md:p-12 text-white text-center space-y-6">
            <h3 className="font-display font-black text-2xl md:text-3xl">
              Öğrenci İndirimli Nakliye Teklifi Alın
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
              Bütçenize en uygun parça nakliyat fiyatını öğrenmek ve randevu oluşturmak için teklif formumuzu doldurabilir veya hemen bizi arayabilirsiniz.
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

        </section>
      </main>
    </>
  );
}
