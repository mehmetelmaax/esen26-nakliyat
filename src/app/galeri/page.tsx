import React from 'react';
import type { Metadata } from 'next';
import GalleryGrid from '@/components/GalleryGrid';
import { Camera } from 'lucide-react';
import { SITE } from '@/lib/site-config';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Hizmet Faaliyet Galerimiz | Esen 26 Nakliyat',
  description: "Esen 26 Nakliyat asansörlü taşıma araçları, paketleme işlemleri ve ekip çalışmalarına ait gerçek operasyon fotoğrafları galerisi.",
  alternates: {
    canonical: '/galeri',
  },
};

interface GalleryItem {
  src: string;
  title: string;
  desc: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  {
    src: '/img/esen-slayt-1.jpg',
    title: 'Şehirlerarası Nakliyat Tırımız',
    desc: 'Büyük boy çelik kasa ev eşyası taşıma kamyonumuz yükleme esnasında.',
    alt: "Eskişehir'den Türkiye geneline K3 belgeli araçlarla şehirlerarası evden eve nakliyat taşıması yapan büyük nakliye tırı",
  },
  {
    src: '/img/esen-slayt-2.jpg',
    title: 'Dış Cephe Asansör Kurulumu',
    desc: 'Rezidans tipi binalarda balkondan eşya transferi yapan teleskopik asansörümüz.',
    alt: "Eskişehir Tepebaşı'da yüksek katlı bir rezidansın dış cephesine kurulmuş teleskopik yük ve eşya taşıma asansörü",
  },
  {
    src: '/img/esen-slayt-3.jpg',
    title: 'Asansörlü Nakliye Aracımız',
    desc: 'Mobil asansör kasalı taşıma kamyonetimiz dar sokakta operasyonda.',
    alt: "Asansörlü nakliyat taşıma hizmeti veren teleskopik asansör sistemli Esen 26 Nakliyat taşıma aracı",
  },
  {
    src: '/img/esen-galeri-1.jpg',
    title: 'Gerçek Ev Taşıma Faaliyetimiz',
    desc: 'Balkondan asansörlü taşıma sistemimizin daireye kurulmuş hali.',
    alt: "Esen 26 Nakliyat asansör sistemiyle Eskişehir'de yüksek katlı binada daireye eşya taşıma operasyonu",
  },
  {
    src: '/img/esen-galeri-2.jpg',
    title: 'Eşya Paketleme ve Hazırlık',
    desc: 'Koruyucu havalı naylonlarla sarılarak kamyona yüklenen mobilyalarımız.',
    alt: "Esen 26 Nakliyat ekiplerinin ev taşıma öncesi kalın pıtpıt ambalaj malzemesiyle paketlediği eşyalar",
  },
  {
    src: '/img/paketleme-detay-v3.jpg',
    title: 'Özenli Eşya Ambalajlama',
    desc: 'Kraft kağıt ve patpat naylonlarla korumaya alınmış mobilyalar.',
    alt: "Esen 26 Nakliyat marangozlarınca balonlu patpat ambalaj malzemeleri ile paketlenerek korumaya alınmış gardırop ve mobilyalar",
  },
  {
    src: '/img/eskisehir-nakliyat-faaliyet-1.jpg',
    title: 'Eşya Yükleme ve İstifleme',
    desc: 'Kapalı kasa nakliyat tırımıza eşyaların hasar görmeyecek şekilde düzenli istiflenmesi.',
    alt: "Esen Nakliyat & Temizlik & Kolileme firmasına ait eşya yükleme ve i̇stifleme gerçek faaliyet fotoğrafı",
  },
  {
    src: '/img/eskisehir-nakliyat-faaliyet-2.jpg',
    title: 'Profesyonel Ambalajlama İşlemi',
    desc: 'Eşyaların taşınma esnasında çizilmesini önleyen kalın balonlu patpat naylon sarımı.',
    alt: "Esen Nakliyat & Temizlik & Kolileme firmasına ait profesyonel ambalajlama i̇şlemi gerçek faaliyet fotoğrafı",
  },
  {
    src: '/img/eskisehir-nakliyat-faaliyet-3.jpg',
    title: 'Asansörlü Nakliye Kurulumu',
    desc: 'Yüksek katlı binalarda güvenli taşıma sağlayan mobil asansör sistemimiz.',
    alt: "Esen Nakliyat & Temizlik & Kolileme firmasına ait asansörlü nakliye kurulumu gerçek faaliyet fotoğrafı",
  },
  {
    src: '/img/eskisehir-nakliyat-faaliyet-4.jpg',
    title: 'Marangozlu De-montaj Hizmeti',
    desc: 'Mobilyalarınızın taşınma öncesinde uzman marangozumuzca sökülmesi ve numaralandırılması.',
    alt: "Esen Nakliyat & Temizlik & Kolileme firmasına ait marangozlu de-montaj hizmeti gerçek faaliyet fotoğrafı",
  },
  {
    src: '/img/eskisehir-nakliyat-faaliyet-5.jpg',
    title: 'Hassas Eşya Paketleme',
    desc: 'Kırılacak cam ve mutfak eşyalarının Kraft kağıtlarla sarılıp kolilere yerleştirilmesi.',
    alt: "Esen Nakliyat & Temizlik & Kolileme firmasına ait hassas eşya paketleme gerçek faaliyet fotoğrafı",
  },
  {
    src: '/img/eskisehir-nakliyat-faaliyet-6.jpg',
    title: 'Şehirlerarası Nakliye Sevk',
    desc: 'Eskişehir Tepebaşı merkezimizden diğer illere yola çıkmaya hazır kapalı kasa taşıma aracımız.',
    alt: "Esen Nakliyat & Temizlik & Kolileme firmasına ait şehirlerarası nakliye sevk gerçek faaliyet fotoğrafı",
  },
  {
    src: '/img/eskisehir-nakliyat-faaliyet-7.jpg',
    title: 'Güvenli Taşımacılık Ekibi',
    desc: 'Esen 26 Nakliyat güvencesiyle uzman kadromuz iş başında.',
    alt: "Esen Nakliyat & Temizlik & Kolileme firmasına ait güvenli taşımacılık ekibi gerçek faaliyet fotoğrafı",
  }
];

export default function GalleryPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema([
        { name: 'Ana Sayfa', url: '/' },
        { name: 'Galeri', url: '/galeri' }
      ]),
      ...galleryItems.map((item) => ({
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        'contentUrl': `${SITE.url}${item.src}`,
        'caption': item.alt,
        'name': item.title,
        'description': item.desc,
        'contentLocation': {
          '@type': 'Place',
          'name': 'Eskişehir, Türkiye'
        }
      }))
    ]
  };

  return (
    <>
      <JsonLd data={schema} />
      
      <main className="pt-24 bg-off-white min-h-screen">
        <Breadcrumb items={[{ name: 'Galeri', url: '/galeri' }]} className="pt-4" />
        {/* Intro */}
        <section className="py-16 bg-navy text-white text-center space-y-4">
          <span className="text-orange font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-1">
            <Camera className="w-4 h-4 text-orange" />
            <span>Faaliyetlerimiz</span>
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
            Hizmet Galerisi
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Eşya paketleme, asansör kurulumu ve taşıma anlarına ait gerçek operasyon fotoğraflarımız.
          </p>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryGrid items={galleryItems} />
        </section>
      </main>
    </>
  );
}
