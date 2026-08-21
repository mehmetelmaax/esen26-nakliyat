import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { ArrowRight, Building, Hammer, ShieldAlert, BadgeInfo, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Eskişehir Asansörsüz Bina Ev Taşıma Kılavuzu | Esen 26',
  description: 'Eskişehir genelinde yük asansörü kurulumuna elverişsiz veya asansörsüz binalarda güvenli, hasarsız insan gücüyle ev taşıma yöntemleri ve ipuçları.',
  alternates: {
    canonical: '/eskisehir-asansorsuz-bina-tasima',
  },
};

export default function AsansorsuzBinaTasimaPage() {
  const sss = [
    {
      question: 'Yol yapısı veya ağaçlar asansör kurulmasını engelliyorsa ne yapılır?',
      answer: 'Eskişehir Tepebaşı ve Odunpazarı genelindeki bazı dar sokaklarda elektrik telleri, ağaç dalları veya yolun darlığı dış cephe asansörünün kurulmasına engel olabilir. Bu gibi durumlarda, marangozlarımız mobilyaları daha küçük parçalara ayırarak paketler ve profesyonel taşıma ekibimiz insan gücüyle sırt askı sistemleri kullanarak eşyaları merdivenlerden hasarsız taşır.'
    },
    {
      question: 'Asansör kurulmayan binalarda merdivenlerden taşımada ek ücret alınır mı?',
      answer: 'Esen 26 Nakliyat olarak taşıma öncesinde yaptığımız ücretsiz ekspertiz sürecinde binanın cephe durumunu analiz ederiz. Eğer asansör kurulumu imkansızsa, gereken iş gücü saatleri ve personel sayısı baştan hesaplanarak fiyata yansıtılır ve sözleşmeyle sabitlenir. Taşınma günü sürpriz bir ek taşıma ücreti kesinlikle talep edilmez.'
    },
    {
      question: 'Bina içi asansörü nakliyede kullanmak yasal mıdır?',
      answer: 'Birçok sitenin ve rezidansın bina yönetim kuralları, ortak kullanım asansörlerinin ev taşımada kullanılmasını hasar ve gürültü riskleri sebebiyle yasaklar. Bu kuralları aşmak ve site yönetimiyle sorun yaşamamak için binaya asansör kurulabiliyorsa her zaman dış cephe asansörlerini tercih etmekteyiz.'
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Eskişehir Asansörsüz Bina Ev Taşıma Hizmeti',
        description: 'Dış cephe yük asansörü kurulamayan binalarda profesyonel insan gücü ve sırt askı aparatlarıyla hasarsız ev taşıma çözümleri.',
        slug: 'eskisehir-asansorsuz-bina-tasima',
        areaName: 'Eskişehir'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Asansörsüz Bina Taşıma', url: '/eskisehir-asansorsuz-bina-tasima' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Asansörsüz Bina Taşıma', url: '/eskisehir-asansorsuz-bina-tasima' }]} className="pt-4" />
        
        {/* Hero Section */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Building className="w-5 h-5 text-orange" />
            <span>ZORLU YAPILARDA TAŞINMA</span>
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Eskişehir Asansörsüz Bina Ev Taşıma Kılavuzu
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4 leading-relaxed">
            Dış cephe asansör kurulumuna elverişli olmayan dar sokaklarda veya eski yapılarda hasarsız, güvenli insan gücüyle ev taşıma yöntemleri.
          </p>
        </section>

        {/* Detailed Copy Section */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-charcoal">
          
          <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <ShieldAlert className="text-orange shrink-0" /> Asansör Kurulamayan Durumlarda Hasarsız Nakliye
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-charcoal/90">
              Modern nakliye sektöründe dış cephe mobil teleskopik yük asansörleri standart hale gelse de, Eskişehir&apos;in özellikle tarihi Odunpazarı bölgesi veya Tepebaşı&apos;nın dar sokaklara sahip eski yerleşimlerinde asansör kurulumu teknik olarak imkansız olabilir. Elektrik telleri, telefon hatları, dar sokak genişliği veya yoldaki ağaçlar asansör aracımızın açılmasına izin vermeyebilir. Detaylı asansör analizi için <Link href="/blog/asansorlu-nakliyat-mi-merdivenle-mi" className="text-orange hover:underline font-semibold">asansörlü nakliyat mı merdivenle mi</Link> kıyaslamamızı inceleyebilirsiniz.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-charcoal/90">
              Esen 26 Nakliyat olarak, asansör kurulmayan binalarda taşıma kalitemizi düşürmüyoruz. Ekibimizdeki personel sayısını artırarak, mobilyaları daha küçük parçalara ayırıp de-monte hale getiriyoruz. Her mobilya parçasını kalın balonlu patpat naylonlar ve koruyucu köşebentlerle sarıp, sırt askı sistemleriyle apartman merdivenlerinde duvarlara değmeden, çizilme riski olmadan hassas şekilde indiriyoruz. Özellikle beyaz eşyalarınızın zarar görmemesi için geliştirdiğimiz yöntemleri <Link href="/blog/beyaz-esya-tasima-rehberi" className="text-orange hover:underline font-semibold">beyaz eşya taşıma rehberi</Link> yazımızdan takip edebilirsiniz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-3">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <Hammer className="w-5 h-5 text-orange" /> Ekstra Demontaj / Marangozluk
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-charcoal/80">
                Merdiven dönüşlerinden geçemeyecek büyüklükteki gardırop ve üniteler marangozumuz tarafından en ufak vidasına kadar sökülüp, paketlenir ve hedeflenen odada yeniden monte edilir.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-light shadow-sm space-y-3">
              <h3 className="font-display font-bold text-navy text-lg flex items-center gap-2">
                <BadgeInfo className="w-5 h-5 text-orange" /> Askı ve Taşıma Aparatları
              </h3>
              <p className="text-xs md:text-sm leading-relaxed text-charcoal/80">
                Ağır beyaz eşya ve mobilyaların taşınmasında vücut ergonomisine uygun askı kemerleri kullanılır. Eşyanın ağırlığı dengelenerek merdivenlerden hasarsız geçişi sağlanır.
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
              Zorlu Bina Nakliye Fiyatınızı Öğrenin
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
              Binanız asansör kurulumuna uygun olmasa da sabit fiyat garantisiyle kurumsal taşınma teklifi almak için teklif formumuzu doldurabilir veya hemen bizi arayabilirsiniz.
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
