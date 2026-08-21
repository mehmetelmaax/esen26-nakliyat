import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site-config';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Esen 26 Nakliyat',
  description: `${SITE.legalName} gizlilik, çerez yönetimi ve kişisel verilerin güvenliği politikaları hakkında bilgilendirme sayfası.`,
  alternates: {
    canonical: '/yasal/gizlilik',
  },
  openGraph: {
    title: 'Gizlilik Politikası | Esen 26 Nakliyat',
    description: '${SITE.legalName} gizlilik, çerez yönetimi ve kişisel verilerin güvenliği politikaları hakkında bilgilendirme sayfası.',
    url: '/yasal/gizlilik',
    type: 'article',
    modifiedTime: '2026-08-16T08:00:00+03:00',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Gizlilik Politikası | Esen 26 Nakliyat' }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GizlilikPage() {
  return (
    <main className="min-h-screen bg-off-white text-charcoal py-24 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ name: 'Yasal', url: '/yasal/gizlilik' }, { name: 'Gizlilik Politikası', url: '/yasal/gizlilik' }]} className="pt-4 max-w-3xl mx-auto px-0 mb-4" emitSchema />
      <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-light rounded-xl shadow-sm space-y-6">
        <Link href="/" className="text-orange-text font-bold text-sm hover:underline block mb-4">
          &larr; Ana Sayfaya Dön
        </Link>
        
        <h1 className="font-display font-black text-navy text-2xl md:text-3xl border-b border-gray-light pb-4">
          Gizlilik ve Çerez Politikası
        </h1>

        <div className="space-y-6 text-sm text-charcoal leading-relaxed">
          <p>
            <strong>{SITE.legalName}</strong> (&ldquo;Esen 26 Nakliyat&rdquo;) olarak, web sitemizi ziyaret eden kullanıcılarımızın gizlilik haklarına saygı duyuyor ve kişisel verilerin korunmasına büyük önem veriyoruz. Bu politika, sitemizi ziyaret ettiğinizde toplanan çerezler, kişisel veriler ve bunların güvenliği ile ilgili süreçleri açıklamaktadır.
          </p>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">1. Çerezler (Cookies) Nedir ve Nasıl Kullanılır?</h2>
            <p className="mb-2">
              Çerezler, web sitemizi ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Sitemizde iki tür çerez kullanılmaktadır:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması, güvenlik önlemlerinin alınması ve kullanıcı tercihlerinin (örneğin çerez onay durumu) hatırlanması amacıyla kullanılır. Bu çerezler kapatılamaz.</li>
              <li><strong>Analitik Çerezler (İsteğe Bağlı):</strong> Kullanıcılarımızın web sitemizi nasıl kullandığını anlamak, sayfa görüntüleme istatistiklerini izlemek ve teknik hataları tespit etmek amacıyla <strong>Google Analytics</strong> ve <strong>Microsoft Clarity</strong> çerezleri kullanılır. Bu çerezler yalnızca sizin <strong>açık onayınız (Kabul Et)</strong> üzerine yüklenir.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">2. Çerez Tercihlerinin Yönetimi</h2>
            <p>
              Çerez kullanımını kabul etmek veya reddetmek tamamen sizin kontrolünüzdedir. Sitemizi ilk ziyaretinizde karşınıza çıkan çerez banner&rsquo;ı üzerinden &ldquo;Kabul Et&rdquo; veya &ldquo;Reddet&rdquo; butonlarını kullanarak tercihlerinizi belirleyebilirsiniz. Ayrıca, tarayıcı ayarlarınız üzerinden kayıtlı çerezleri istediğiniz zaman silebilir veya çerez alımını tamamen engelleyebilirsiniz.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">3. Veri Güvenliği ve Altyapı Sağlayıcıları</h2>
            <p className="mb-2">
              Formlar aracılığıyla bizimle paylaştığınız veriler (Ad, Telefon, Taşınma Detayları), endüstri standardı şifreleme protokolleri (SSL/TLS) ile korunarak sunucularımıza iletilmektedir. Olası e-posta gönderimleri ve hosting süreçlerinde güvenliği en üst seviyede tutmak için küresel altyapı sağlayıcıları (Vercel ve Resend) kullanılmaktadır. Şirketimiz, verilerinizin yetkisiz erişime maruz kalmaması için gerekli tüm idari ve teknik tedbirleri almaktadır.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">4. Üçüncü Taraf Web Sitelerine Bağlantılar</h2>
            <p>
              Sitemiz içerisinde sosyal medya hesaplarımıza (Facebook, Instagram) veya harici rehber kaynaklara bağlantılar (linkler) yer alabilir. Bu sitelerin kendilerine ait gizlilik politikaları bulunmakta olup, bu sitelerin gizlilik uygulamalarından veya içeriklerinden şirketimiz sorumlu değildir.
            </p>
          </div>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">5. Haklarınız ve İletişim</h2>
            <p>
              Gizlilik ve çerez politikalarımız ile ilgili her türlü soru, görüş ve veri silme talepleriniz için doğrudan veri sorumlusu e-posta adresimiz olan <a href={`mailto:${SITE.email}`} className="text-orange-text hover:underline">{SITE.email}</a> adresi üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
