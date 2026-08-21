import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { ArrowRight, FileText, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import ContractChecklist from '@/components/geo/ContractChecklist';

export const metadata: Metadata = {
  title: 'Eskişehir Nakliyat Sözleşmesi Örneği ve Rehberi | Esen 26',
  description: 'Resmi ve yazılı evden eve nakliyat sözleşmesinde olması gereken maddeler, fiyat sabitleme kuralları ve resmi nakliye sözleşmesi örneği rehberi.',
  alternates: {
    canonical: '/eskisehir-nakliyat-sozlesmesi',
  },
};

export default function NakliyatSozlesmesiPage() {
  const sss = [
    {
      question: 'Yazılı nakliyat sözleşmesi taşınma günü fiyat artışlarını nasıl önler?',
      answer: 'Sözleşmede taraflar arasında anlaşılan net bütçe, KDV durumu ve verilecek ek hizmetler (ambalajlama, asansör kurulumu vb.) yazılı olarak imza altına alınır. Bu sayede taşınma günü veya yolculuk bittiğinde "eşya çokmuş", "asansör zor kuruldu" gibi bahanelerle ek ücret talep edilmesi yasal olarak engellenir.'
    },
    {
      question: 'Sözleşmesiz yapılan taşımalarda eşya hasar tazmini nasıl talep edilir?',
      answer: 'Yazılı sözleşme ve resmi taşıma irsaliyesi/faturası bulunmayan durumlarda, hasar tazmin talepleriniz Tüketici Hakem Heyetleri veya mahkemeler tarafından yasal delil yetersizliği sebebiyle reddedilebilir. Sözleşme, yasal hak iddia edebilmeniz için en güçlü hukuki belgedir.'
    },
    {
      question: 'Nakliyat sözleşmesinde hangi maddeler mutlaka yer almalıdır?',
      answer: 'Sözleşmede; yükleme ve teslimat adresleri, taşıma tarihi, net anlaşma bedeli, K3 yetki belgesi bilgileri, sigorta poliçe sorumluluğu, de-montaj ve montaj yapılacak mobilyaların listesi ve tarafların iletişim/vergi numarası bilgileri mutlaka yer almalıdır.'
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      serviceSchema({
        name: 'Eskişehir Evden Eve Nakliyat Sözleşmesi Rehberi',
        description: 'Fiyat sabitleme garantisi sağlayan resmi yazılı nakliyat sözleşmesi maddeleri ve yasal rehberi.',
        slug: 'eskisehir-nakliyat-sozlesmesi',
        areaName: 'Eskişehir'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Nakliyat Sözleşmesi', url: '/eskisehir-nakliyat-sozlesmesi' }
      ]),
      faqSchema(sss)
    ]
  };

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Nakliyat Sözleşmesi', url: '/eskisehir-nakliyat-sozlesmesi' }]} className="pt-4" />
        
        {/* Hero Section */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5">
            <FileText className="w-5 h-5 text-orange" />
            <span>YASAL GÜVENCE REHBERİ</span>
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Resmi Nakliyat Sözleşmesi Rehberi
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto px-4 leading-relaxed">
            Eskişehir&apos;de ev taşırken fiyat sürprizlerini ve hasar anlaşmazlıklarını yasal olarak engelleyen sözleşme standartları ve maddeleri.
          </p>
        </section>

        {/* Detailed Copy Section */}
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-charcoal">
          
          <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <ShieldCheck className="text-orange shrink-0" /> Neden Nakliyat Sözleşmesi Yapmalısınız?
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-charcoal/90">
              Karayolu taşımacılık kanunları ve Tüketici Hakları mevzuatı uyarınca, ticari olarak gerçekleştirilen her türlü ev ve ofis taşımacılığı işlemi resmi bir sözleşmeye tabi olmalıdır. Ancak sektörde yetki belgesiz çalışan korsan firmalar, vergi kaydı ve sorumluluğu olmaması nedeniyle sözleşme yapmaktan kaçınırlar. Bu durum, haklarınızı aramanızı engeller. Detaylar için <Link href="/blog/tasinirken-yapilan-yasal-hatalar" className="text-orange hover:underline font-semibold">taşınırken yapılan yasal hatalar</Link> kılavuzumuza göz atabilirsiniz.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-charcoal/90">
              Esen 26 Nakliyat olarak, ekspertiz sonrasında anlaştığımız tüm detayları ıslak imzalı resmi nakliyat sözleşmesiyle kayıt altına alıyoruz. Bu sözleşme, taşınma gününde anlaşılan fiyatın üzerine hiçbir ek maliyet (yol bitti, eşya sığmadı vb.) eklenmeyeceğinin yasal teminatıdır. Ayrıca, hasarlara karşı güvence detaylarını <Link href="/blog/nakliyat-sigortasi-nedir" className="text-orange hover:underline font-semibold">nakliyat sigortası nedir</Link> içeriğimizden öğrenebilirsiniz.
            </p>
          </div>

          {/* Interactive / Static Contract Checklist component from geo folder */}
          <ContractChecklist />

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
              Sözleşmeli ve Sabit Fiyat Garantili Taşının
            </h3>
            <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
              Eşyalarınızın detaylarına göre fiyatı sabitlemek ve yasal güvence altında taşınmak için hemen fiyat hesaplayıcımızı kullanabilir veya bizi arayabilirsiniz.
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
