import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema, serviceSchema , webPageSchema } from '@/lib/schema';
import { SITE } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import { ArrowRight, HelpCircle, Shield, FileText, ClipboardList, CheckCircle2, AlertOctagon, Scale } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';
import K3InfoBlock from '@/components/geo/K3InfoBlock';
import ContractChecklist from '@/components/geo/ContractChecklist';

export const metadata: Metadata = {
  title: 'Eskişehir En İyi Evden Eve Nakliyat Firmaları Seçim Rehberi',
  description: "Eskişehir'de ev taşırken korsan ve yetkisiz firmalardan korunma yolları. K3 yetki belgesi sorgulama, sigorta poliçesi doğrulama ve 12 altın kural.",
  alternates: {
    canonical: '/eskisehir-nakliyat-firmalari',
  },
  openGraph: {
    title: 'Eskişehir En İyi Evden Eve Nakliyat Firmaları Seçim Rehberi',
    description: 'Eskişehir',
    url: '/eskisehir-nakliyat-firmalari',
    type: 'article',
    modifiedTime: '2026-08-21T08:00:00+03:00',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Eskişehir En İyi Evden Eve Nakliyat Firmaları Seçim Rehberi' }],
  },
};

export default function FirmalarRehberiPage() {
  const experienceYears = new Date().getFullYear() - FACTS.foundedYear;

  const firmalarFaqs = [
    {
      question: 'K3 Yetki Belgesi nedir ve nakliyede neden zorunludur?',
      answer: 'K3 yetki belgesi, Ulaştırma ve Altyapı Bakanlığı tarafından ticari amaçla yurt içinde ev ve ofis eşyası taşımacılığı yapacak firmalara verilen resmi ve yasal çalışma iznidir. Bu belgeye sahip olmayan araçlar korsan taşımacı sınıfına girer ve trafik denetimlerinde bağlanır.'
    },
    {
      question: 'Eşya taşıma sigortası poliçesi taşınma öncesinde nasıl kontrol edilir?',
      answer: 'Taşıma işlemini gerçekleştirecek sigorta acentesinden poliçe numarasını talep edebilirsiniz. Ardından ilgili sigorta şirketini doğrudan arayarak veya e-Devlet/SBM platformu üzerinden adınıza, taşınma günü ve güzergahı belirtilerek aktif edilmiş bir emtia sigortası olup olmadığını sorgulatabilirsiniz.'
    },
    {
      question: 'Kapora dolandırıcılığı veya kapora tuzağı nasıl işler?',
      answer: 'Piyasa fiyatının çok altında teklif verip sizden yüksek miktarda kapora isteyen ve taşınma günü telefonlarını kapatıp gelmeyen sahte nakliye sitelerine karşı kapora ödemeden sözleşme isteyiniz.'
    },
    {
      question: 'Sözleşmesiz ev taşımanın yasal riskleri nelerdir?',
      answer: 'Sözleşmeniz olmadığında, taşıma sırasında kırılan eşyalarınızın tazminini talep edemez, kararlaştırılan fiyatın taşınma günü artırılmasına karşı yasal bir hak iddia edemezsiniz.'
    },
    {
      question: 'Taşıma sırasında fiyat artırmak isteyen firmalara karşı ne yapılmalı?',
      answer: 'Eğer elinizde yazılı ve ıslak imzalı nakliyat sözleşmesi bulunuyorsa, anlaşılan rakam dışındaki hiçbir ödemeyi yapmayacağınızı belirtebilir, gerekirse emniyet birimlerine başvurabilirsiniz.'
    },
    {
      question: 'Nakliyat firmaları hakkındaki şikayetler nereye iletilir?',
      answer: 'Tüketici Hakem Heyetlerine, CİMER üzerinden Ulaştırma Bakanlığına veya Tüketici Mahkemelerine resmi faturanız ve sözleşmenizle şikayette bulunabilirsiniz.'
    }
  ];

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageSchema({
        name: 'Eskişehir En İyi Evden Eve Nakliyat Firmaları Seçim Rehberi',
        description: 'Eskişehir',
        slug: '/eskisehir-nakliyat-firmalari',
        dateModified: '2026-08-21'
      }),
      serviceSchema({
        name: 'Eskişehir Nakliyat Firmaları Seçim Rehberi',
        description: "Eskişehir'de ev taşırken korsan ve yetkisiz firmalardan korunma yolları. K3 yetki belgesi sorgulama, sigorta poliçesi doğrulama ve 12 altın kural.",
        slug: 'eskisehir-nakliyat-firmalari',
        areaName: 'Eskişehir'
      }),
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Firma Seçim Rehberi', url: '/eskisehir-nakliyat-firmalari' }
      ]),
      faqSchema(firmalarFaqs)
    ]
  };

  const kontrolMaddeleri = [
    'Ulaştırma Bakanlığı K3 Yetki Belgesi varlığı kontrol edilmeli.',
    'Araçların firmanın kendi öz malı veya yasal kiralık kaydı olup olmadığı bakılmalı.',
    'Taşıma öncesinde mutlaka ıslak imzalı yazılı sözleşme imzalanmalı.',
    'Eşya emtia sigortası poliçe örneği taşınma gününden önce talep edilmeli.',
    'Çalışacak personelin firmanın kadrolu çalışanı olup olmadığı teyit edilmeli.',
    'Fiyat teklifine asansör kurulumunun dahil olup olmadığı netleştirilmeli.',
    'Marangoz ve beyaz eşya montaj işçiliklerinin fiyat kapsamı teyit edilmeli.',
    'Taşıma günü kullanılacak ambalaj malzemesi kalitesi ve çeşidi sorulmalı.',
    'İnternet üzerindeki gerçek müşteri yorumları ve şikayet geçmişi incelenmeli.',
    'Piyasa rayici altında kalan şüpheli ucuz tekliflere karşı temkinli olunmalı.',
    'İletişim kurulacak yetkilinin sabit adres ve fatura bilgileri sorgulanmalı.',
    'Ön kapora ödemesi yapmadan önce mutlaka kurumsal referanslar talep edilmeli.'
  ];

  return (
    <>
      <JsonLd data={schemas} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Firma Seçim Rehberi', url: '/eskisehir-nakliyat-firmalari' }]} className="pt-4" />
        {/* Intro Section */}
        <section className="py-20 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs tracking-widest">
            BİLİNÇLİ TÜKETİCİ REHBERİ
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight px-4">
            Eskişehir Nakliyat Firmaları Seçim Rehberi
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Eskişehir'de ev veya ofis taşırken korsan komisyoncu sitelerden korunma yolları, yasal K3 yetki belgesi sorgulama adımları ve güvenli firma seçim rehberi.
          </p>
        </section>

        {/* Detailed SEO Content Section */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: Giriş */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6 text-orange" />
              <span>Güvenli Nakliyat Firması Seçimi</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Ev taşımak, maddi ve manevi olarak hayatımızın en önemli aşamalarından biridir. Ancak internet arama motorlarında reklam vererek kendini "köklü nakliyat firması" olarak tanıtan, gerçekte ise tek bir kamyonu dahi olmayan komisyoncu sitelerin sayısı her geçen gün artmaktadır. Bu sahte siteler, sizden aldıkları işleri hiçbir güvenlik denetimi yapmadan vasıfsız üçüncü şahıslara komisyon karşılığı devretmektedir. Esen 26 Nakliyat olarak, tüketicilerimizin haklarını korumak ve hasarsız taşınmalarını sağlamak amacıyla bu şeffaf karşılaştırma ve denetim rehberini hazırladık. Kendi K3 yetki belgemiz altındaki {experienceYears} yıllık tecrübemizle, güvenli lojistik standartlarını açıklıyoruz. Kapora tuzağına düşmemek ve korsan firmaları önceden anlamak için <Link href="/blog/kapora-tuzagi-ucuz-nakliyat" className="text-orange hover:underline font-semibold">kapora tuzağı ve ucuz nakliyat</Link> tehlikeleri analizimizi inceleyebilirsiniz.
            </p>
          </div>

          {/* Section 2: 12 Altın Kontrol Maddesi */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-orange" />
              <span>Nakliyat Firması Seçerken 12 Kontrol Maddesi</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Bir taşıma firmasıyla el sıkışmadan önce mutlaka aşağıdaki 12 yasal ve operasyonel kriteri kontrol etmeli, teyit almalısınız:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-charcoal">
              {kontrolMaddeleri.map((madde, idx) => (
                <div key={idx} className="flex gap-2 bg-off-white p-3 rounded-lg border border-gray-light/60">
                  <CheckCircle2 className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                  <span>{madde}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: K3 Belgesi Sorgulama */}
          <div className="space-y-4">
            <K3InfoBlock licenseNumber={process.env.NEXT_PUBLIC_K3_BELGE_NO} />
            <p className="text-center text-xs text-charcoal font-semibold">
              Firmamız yasal U-NET sistemine kayıtlı K3 Yetki Belgesi ({process.env.NEXT_PUBLIC_K3_BELGE_NO || "26.K3.xxxx"}) ile taşıma yapmakta olup, tüm taşımalarımız Anadolu Sigorta poliçesi kapsamında güvence altındadır.
            </p>
          </div>

          {/* Section 3b: Contract Checklist */}
          <ContractChecklist />

          {/* Section 4: Sigorta ve Sözleşme Riskleri */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <AlertOctagon className="w-6 h-6 text-orange" />
              <span>Sözleşmesiz ve Sigortasız Taşınmanın Büyük Riskleri</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Birçok korsan nakliyeci "biz sigortalı taşıyoruz" beyanında bulunsa da gerçekte hiçbir sigorta poliçesi düzenlememektedir. Gerçek bir eşya sigortası, taşınma gününden en az bir gün önce firmanın anlaşmalı acentesi üzerinden adınıza, taşınma kaynak ve hedef adresleriniz belirtilerek düzenlenmelidir. Sözleşme imzalanmadığında ise taşıma günü aniden fiyat artıran firmalara karşı yasal tüketici hak iddia etmeniz imkansızlaşır. Kapora dolandırıcılığı tuzağına düşmemek için kurumsal fatura bilgileri olmayan hesaplara yüksek tutarlı kaporalar göndermekten kaçınınız.
            </p>
          </div>

          {/* Section 5: Tüketici Hakları ve Şikayet */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <Scale className="w-6 h-6 text-orange" />
              <span>Tüketici Hakları ve Yasal Şikayet Kanalları</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Taşınma sırasında eşyalarınızın kırılması, çizilmesi veya kaybolması durumunda, eğer elinizde yazılı nakliye sözleşmesi ve resmi nakliyat faturası bulunuyorsa haklarınızı arayabilirsiniz. Hasarlı mobilyaların fotoğraflarını çekip tutanak hazırladıktan sonra Eskişehir Valiliği Tüketici Hakem Heyetine veya e-Devlet (Tüketici Bilgi Sistemi - TÜBİS) üzerinden başvuru yapabilirsiniz. Yetki belgesiz korsan taşıma yapan araçları ise doğrudan emniyet birimlerine ve Ulaştırma Bakanlığı bölge müdürlüklerine ihbar etme hakkınız bulunmaktadır.
            </p>
          </div>

          {/* Section 6: Komisyoncu Siteler */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <AlertOctagon className="w-6 h-6 text-orange" />
              <span>Komisyoncu Acente Sitelerinin Gizli Tehlikeleri</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              İnternette kendilerini dev bir nakliyat şirketi gibi gösteren ancak fiziksel bir adresi, ofisi ve öz mal tırı bulunmayan komisyoncu portallara karşı dikkatli olun. Bu siteler aldıkları işleri %25-30 komisyon kesintisi yaptıktan sonra en ucuz teklif veren yetkisiz şahıslara devrederler. Taşınma günü kapınıza gelen nakliye kamyonunun üzerindeki logo ile anlaştığınız şirketin logosu farklıysa bu durumun bir komisyonculuk faaliyeti olduğunu anlayabilirsiniz. Eşya hasarı durumunda karşınızda hiçbir muhatap bulamazsınız.
            </p>
          </div>

          {/* Section 7: Fatura ve Vergilendirme */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-4">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <FileText className="w-6 h-6 text-orange" />
              <span>Resmi Taşıma Faturası ve KDV Zorunluluğu</span>
            </h2>
            <p className="text-charcoal text-sm md:text-base leading-relaxed">
              Profesyonel nakliye firmaları yasal vergi mükellefidir ve yaptıkları her operasyon için resmi taşıma irsaliyesi ve KDV dahil fatura düzenlerler. Korsan firmalar ise vergi kaydı olmadığı için fatura kesemezler. Taşınma öncesi anlaştığınız fiyata KDV dahil olup olmadığını sormanız, taşınma bittikten sonra fatura talep etmeniz resmi haklarınızı korumak adına son derece elzemdir. Resmi bir faturanız olmadığında Tüketici Hakem Heyetlerine hasar veya dolandırıcılık başvurusu yapmanız yasal olarak reddedilecektir.
            </p>
          </div>

          {/* Internal Links Navigation Area */}
          <RelatedLinks currentSlug="eskisehir-nakliyat-firmalari" type="blog" title="Yararlı Bağlantılar ve Rehberler" />

          {/* FAQ Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6">
            <h2 className="font-display font-bold text-navy text-xl md:text-2xl flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-orange" />
              <span>Ev Taşıma Firmaları Hakkında Sıkça Sorulanlar</span>
            </h2>
            <div className="space-y-4 text-sm text-charcoal">
              {firmalarFaqs.map((item, idx) => (
                <div key={idx} className={idx > 0 ? "border-t border-gray-light/60 pt-4" : ""}>
                  <span className="font-bold text-navy block mb-1">{item.question}</span>
                  <p className="text-charcoal/95 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-navy rounded-xl p-8 text-center text-white space-y-6">
            <h3 className="font-display font-bold text-xl md:text-2xl">
              Yazılı Sözleşmeli Ev Taşıma Teklifi Alın
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/teklif-al" className="bg-orange hover:bg-white text-navy font-black px-6 py-3 rounded border border-navy transition-all duration-200 text-sm flex items-center gap-2 active:scale-95 cursor-pointer">
                <span>Fiyat Hesapla</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
