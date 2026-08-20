import { MetadataRoute } from 'next';
import { SITE, SERVICES, DISTRICTS, ROUTES, NEIGHBORHOODS } from '@/lib/site-config';
import { blogDatabase } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const staticDate = new Date('2026-08-16');

  // 1. Ana Sayfa (1.0, weekly)
  const mainPage = {
    url: `${baseUrl}`,
    lastModified: staticDate,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
    images: [`${baseUrl}/img/esen-slayt-1.jpg`],
  };

  // 2. Fiyat Teklifi Al (0.9, monthly)
  const teklifPage = {
    url: `${baseUrl}/teklif-al`,
    lastModified: staticDate,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  };

  // 3. Hizmetler (0.9, monthly)
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/hizmetler/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    images: [`${baseUrl}/img/esen-slayt-1.jpg`],
  }));

  // 4. Bölgeler - Merkez (0.9, monthly)
  const merkezRegionPages = DISTRICTS.filter(d => d.tier === 'merkez' && d.indexable).map((district) => ({
    url: `${baseUrl}/bolgeler/${district.slug}`,
    lastModified: new Date(district.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    images: [`${baseUrl}/img/banner-bg.jpg`],
  }));

  // 5. İletişim (0.8, monthly)
  const iletisimPage = {
    url: `${baseUrl}/iletisim`,
    lastModified: staticDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  };

  // 6. Bölgeler - İlçe (0.7, monthly)
  const ilceRegionPages = DISTRICTS.filter(d => d.tier === 'ilce' && d.indexable).map((district) => ({
    url: `${baseUrl}/bolgeler/${district.slug}`,
    lastModified: new Date(district.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: [`${baseUrl}/img/banner-bg.jpg`],
  }));

  // 7. Blog List (0.7, weekly)
  const blogPage = {
    url: `${baseUrl}/blog`,
    lastModified: staticDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  };

  // 8. Blog Yazıları (0.6, monthly, lastModified from post date)
  const blogPostPages = Object.values(blogDatabase).map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 9. Hakkımızda (0.6, yearly)
  const hakkimizdaPage = {
    url: `${baseUrl}/hakkimizda`,
    lastModified: staticDate,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
    images: [`${baseUrl}/img/arac-filosu-v3.jpg`],
  };

  // 10. Galeri (0.5, monthly)
  const galeriPage = {
    url: `${baseUrl}/galeri`,
    lastModified: staticDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
    images: [
      `${baseUrl}/img/esen-slayt-1.jpg`,
      `${baseUrl}/img/esen-slayt-2.jpg`,
      `${baseUrl}/img/esen-slayt-3.jpg`
    ],
  };

  // 11. Yasal Sayfalar (2 adet, 0.3, yearly)
  const yasalPages = ['gizlilik', 'kvkk'].map((slug) => ({
    url: `${baseUrl}/yasal/${slug}`,
    lastModified: staticDate,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  // 12. Rehber ve Yardımcı Sayfalar (3 adet, 0.8, monthly)
  const additionalPages = [
    {
      url: `${baseUrl}/eskisehir-nakliyat-fiyatlari`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/eskisehir-nakliyat-firmalari`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tasinma-kontrol-listesi`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  // 13. Şehirlerarası Rotalar (8 adet, 0.8, monthly)
  const routePages = ROUTES.map((route) => ({
    url: `${baseUrl}/rotalar/${route.slug}`,
    lastModified: new Date(route.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    images: [`${baseUrl}/img/banner-bg.jpg`],
  }));

  // 14. Hub Sayfaları (3 adet, 0.8, monthly)
  const hubPages = [
    {
      url: `${baseUrl}/bolgeler`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rotalar`,
      lastModified: staticDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  // 15. Bölgeler - Mahalle (16 adet, 0.7, monthly)
  const mahallePages = NEIGHBORHOODS.filter(n => n.indexable).map((n) => ({
    url: `${baseUrl}/bolgeler/${n.district}/${n.slug}`,
    lastModified: new Date(n.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: [`${baseUrl}/img/banner-bg.jpg`],
  }));

  return [
    mainPage,
    teklifPage,
    ...servicePages,
    ...merkezRegionPages,
    iletisimPage,
    ...ilceRegionPages,
    blogPage,
    ...blogPostPages,
    hakkimizdaPage,
    galeriPage,
    ...yasalPages,
    ...additionalPages,
    ...routePages,
    ...hubPages,
    ...mahallePages,
  ];
}
