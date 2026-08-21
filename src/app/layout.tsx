import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SITE } from '@/lib/site-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTAs from '@/components/FloatingCTAs';
import Analytics from '@/components/Analytics';
import CookieBanner from '@/components/CookieBanner';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import JsonLd from '@/components/JsonLd';
import { websiteSchema } from '@/lib/schema';

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-SemiBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

const outfit = localFont({
  src: [
    {
      path: '../../public/fonts/Outfit-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Outfit-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Outfit-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Esen 26 Nakliyat | Eskişehir Evden Eve Nakliyat & Asansörlü Taşımacılık',
    template: '%s',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: 'Nakliyat ve Lojistik',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Esen 26 Nakliyat | Eskişehir Evden Eve Nakliyat & Asansörlü Taşımacılık',
    description: SITE.description,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Esen 26 Nakliyat' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esen 26 Nakliyat | Eskişehir Evden Eve Nakliyat & Asansörlü Taşımacılık',
    description: SITE.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? '',
    other: { 'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? '' },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: '#102A43',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      websiteSchema(),
    ]
  };

  return (
    <html
      lang="tr"
      className={`${inter.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-full flex flex-col bg-off-white text-charcoal">
        <JsonLd data={globalSchema} />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-orange focus:text-navy focus:px-4 focus:py-2 focus:rounded focus:font-bold focus:text-sm">Ana içeriğe atla</a>
        <Header />
        {children}
        <Footer />
        <FloatingCTAs />
        <Analytics />
        <CookieBanner />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
