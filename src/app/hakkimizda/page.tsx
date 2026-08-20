import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Shield, Users, Award, Calendar, CheckCircle } from 'lucide-react';
import { SITE } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';
import K3InfoBlock from '@/components/geo/K3InfoBlock';

export const metadata: Metadata = {
  title: 'Hakkımızda - Kurumsal | Esen 26 Nakliyat',
  description: `${FACTS.foundedYear} yılından beri Eskişehir Tepebaşı merkezli olarak K3 yetki belgesi ve özmal asansör filomuzla profesyonel evden eve nakliye hizmetleri sunuyoruz.`,
  alternates: {
    canonical: '/hakkimizda',
  },
};

export default function HakkimizdaPage() {
  const experienceYears = new Date().getFullYear() - FACTS.foundedYear;
  const schema = breadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Hakkımızda', url: '/hakkimizda' }
  ]);

  return (
    <>
      <JsonLd data={schema} />
      
      <main className="pt-24 bg-off-white">
        <Breadcrumb items={[{ name: 'Hakkımızda', url: '/hakkimizda' }]} className="pt-4" />
        
        {/* Hero Section */}
        <section className="py-24 bg-navy text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
            <span className="text-orange font-bold text-xs tracking-widest uppercase">
              KURUMSAL PROFİLİMİZ
            </span>
            <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight leading-tight">
              Esen 26 Nakliyat
            </h1>
            <p className="text-gray-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              {FACTS.foundedYear} yılından bu yana Eskişehir genelinde K3 belgemiz, teleskopik mobil asansörlerimiz ve kendi kadrolu ekiplerimizle güven taşıyoruz.
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="py-10 bg-white border-b border-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <span className="font-display font-black text-3xl md:text-4xl text-orange block">{experienceYears}+ Yıl</span>
                <span className="text-xs md:text-sm font-bold text-navy uppercase block">Sektör Tecrübesi</span>
              </div>
              <div className="space-y-1">
                <span className="font-display font-black text-3xl md:text-4xl text-orange block">15+ Araç</span>
                <span className="text-xs md:text-sm font-bold text-navy uppercase block">Modern Filo</span>
              </div>
              <div className="space-y-1">
                <span className="font-display font-black text-3xl md:text-4xl text-orange block">{FACTS.maxFloor}. Kat</span>
                <span className="text-xs md:text-sm font-bold text-navy uppercase block">Maksimum Erişim</span>
              </div>
              <div className="space-y-1">
                <span className="font-display font-black text-3xl md:text-4xl text-orange block">10.000+</span>
                <span className="text-xs md:text-sm font-bold text-navy uppercase block">Taşınan Ev</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Content Grid (Visual focus layout) */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
            
            {/* Block 1: History (Text Left, Image Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange/10 rounded-xl text-orange">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h2 className="font-display font-bold text-navy text-2xl md:text-3xl leading-tight">
                    Firmamızın Kuruluş Tarihi ve Tarihçesi
                  </h2>
                </div>
                <p className="text-charcoal text-sm md:text-base leading-relaxed">
                  Esen 26 Nakliyat, {FACTS.foundedYear} yılında Tanzer Pınar tarafından Eskişehir Tepebaşı merkezli olarak kurulmuş yasal bir ev taşıma şirketidir. Geçen {experienceYears} yıllık süre zarfında, Eskişehir şehir içi ve şehirlerarası güzergahlarda binlerce ailenin ev ve ofis taşıma lojistiğini başarıyla yönettik.
                </p>
                <p className="text-charcoal text-sm md:text-base leading-relaxed">
                  İlkelerimizden ödün vermeden, tamamen şeffaf ve müşteri memnuniyeti odaklı çalışma prensiplerimiz sayesinde bugün Eskişehir'in en çok tavsiye edilen nakliyat markalarından biri olmanın gururunu yaşıyoruz.
                </p>
              </div>
              <div className="lg:col-span-5 relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-gray-light shadow-premium">
                <Image
                  src="/img/arac-filosu-v3.jpg"
                  alt="Esen 26 Nakliyat modern çelik kapalı kasa nakliye kamyonu ve araç filosu"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* K3 Authorization block */}
            <div className="max-w-3xl mx-auto">
              <K3InfoBlock />
            </div>

            {/* Block 2: Personnel Structure (Image Left, Text Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-gray-light shadow-premium">
                <Image
                  src="/img/ekip-v3.jpg"
                  alt="Esen 26 Nakliyat profesyonel ve güler yüzlü kadrolu taşıma ekibi"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange/10 rounded-xl text-orange">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="font-display font-bold text-navy text-2xl md:text-3xl leading-tight">
                    Personel Yapımız ve Kadro Düzeni
                  </h2>
                </div>
                <p className="text-charcoal text-sm md:text-base leading-relaxed">
                  Esen 26 Nakliyat bünyesinde çalışan tüm personelimiz, marangozluk, tesisatçılık ve paketleme alanlarında eğitimli kadrolu çalışanlardan oluşmaktadır. Taşınma günlerinde dışarıdan günlük yevmiyeli veya güvencesiz işçi çalıştırmıyor, ekiplerimizde en az bir sertifikalı marangoz bulunduruyoruz.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs md:text-sm font-semibold">
                  <div className="flex items-center gap-2 text-charcoal">
                    <CheckCircle className="w-4 h-4 text-orange" />
                    <span>Kadrolu Mobilya Ustaları</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal">
                    <CheckCircle className="w-4 h-4 text-orange" />
                    <span>Sertifikalı Tesisat Elemanları</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal">
                    <CheckCircle className="w-4 h-4 text-orange" />
                    <span>Profesyonel Paketleme Kadrosu</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal">
                    <CheckCircle className="w-4 h-4 text-orange" />
                    <span>SRC Belgeli Profesyonel Sürücüler</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Block 3: Fleet & Elevators (Text Left, Image Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange/10 rounded-xl text-orange">
                    <Award className="w-6 h-6" />
                  </div>
                  <h2 className="font-display font-bold text-navy text-2xl md:text-3xl leading-tight">
                    Araç ve Asansör Filomuz
                  </h2>
                </div>
                <p className="text-charcoal text-sm md:text-base leading-relaxed">
                  Esen 26 Nakliyat araç filosu, çelik kapalı kasa ev eşyası nakliye kamyonları ve 25. kata kadar ulaşabilen mobil dış cephe eşya asansörlerinden oluşmaktadır. Araçlarımızın tamamı logolu olup, periyodik temizlik ve bakımları düzenli olarak yapılmaktadır.
                </p>
                <p className="text-charcoal text-sm md:text-base leading-relaxed">
                  Balkonunuza veya pencerenize kurulan modüler teleskopik asansörlerimiz sayesinde dar apartman merdivenlerindeki eşya hasar riskini sıfıra indiriyoruz.
                </p>
              </div>
              <div className="lg:col-span-5 relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-gray-light shadow-premium">
                <Image
                  src="/img/paketleme-detay-v3.jpg"
                  alt="Esen 26 Nakliyat patpat balonlu ambalaj malzemeleri ile paketlenmiş ev mobilyaları"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Faaliyet Videosu Section */}
            <div className="bg-white p-8 rounded-2xl border border-gray-light shadow-premium space-y-6 text-center">
              <h2 className="font-display font-bold text-navy text-2xl md:text-3xl leading-tight">
                Faaliyet ve Hizmet Süreçlerimiz
              </h2>
              <p className="text-charcoal text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Esen 26 Nakliyat ekiplerinin eşyalarınızı nasıl paketlediğini, araçlarımıza nasıl yüklediğini ve asansör sistemlerimizin çalışma mekanizmasını izleyin.
              </p>
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-light aspect-video max-w-3xl mx-auto bg-navy/5">
                <video
                  src="/img/esen-video.mp4"
                  controls
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                  poster="/img/esen-slayt-1.jpg"
                />
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
