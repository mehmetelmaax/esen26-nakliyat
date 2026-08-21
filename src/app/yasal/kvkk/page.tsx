import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site-config';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Esen 26 Nakliyat',
  description: `${SITE.legalName} Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca veri sorumlusu aydınlatma metnimiz ve yasal haklarınız.`,
  alternates: {
    canonical: '/yasal/kvkk',
  },
  openGraph: {
    title: 'KVKK Aydınlatma Metni | Esen 26 Nakliyat',
    description: '${SITE.legalName} Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca veri sorumlusu aydınlatma metnimiz ve yasal haklarınız.',
    url: '/yasal/kvkk',
    type: 'article',
    modifiedTime: '2026-08-16T08:00:00+03:00',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'KVKK Aydınlatma Metni | Esen 26 Nakliyat' }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KVKKPage() {
  return (
    <main className="min-h-screen bg-off-white text-charcoal py-24 px-4 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ name: 'Yasal', url: '/yasal/kvkk' }, { name: 'KVKK Aydınlatma Metni', url: '/yasal/kvkk' }]} className="pt-4 max-w-3xl mx-auto px-0 mb-4" emitSchema />
      <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-light rounded-xl shadow-sm space-y-6">
        <Link href="/" className="text-orange-text font-bold text-sm hover:underline block mb-4">
          &larr; Ana Sayfaya Dön
        </Link>
        
        <h1 className="font-display font-black text-navy text-2xl md:text-3xl border-b border-gray-light pb-4">
          Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni
        </h1>

        <div className="space-y-6 text-sm text-charcoal leading-relaxed">
          <p>
            <strong>{SITE.legalName}</strong> (Bundan sonra &ldquo;Şirket&rdquo; veya &ldquo;Esen 26 Nakliyat&rdquo; olarak anılacaktır) olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, veri sorumlusu sıfatıyla, kişisel verilerinizin güvenliğine ve gizliliğine büyük önem veriyoruz. Bu Aydınlatma Metni ile web sitemiz üzerinden toplanan kişisel verilerinizin işlenme amaçları, hukuki nedenleri, aktarıldığı taraflar ve KVKK kapsamında sahip olduğunuz haklar hakkında sizleri bilgilendirmek isteriz.
          </p>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">1. Veri Sorumlusu Bilgileri</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Ticari Ünvan:</strong> {SITE.legalName}</li>
              <li><strong>Adres:</strong> {SITE.address.street}, {SITE.address.locality} / {SITE.address.region}</li>
              <li><strong>İletişim E-Posta:</strong> <a href={`mailto:${SITE.email}`} className="text-orange-text hover:underline">{SITE.email}</a></li>
              <li><strong>Telefon:</strong> {SITE.phoneDisplay}</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">2. İşlenen Kişisel Verileriniz ve Toplama Yöntemleri</h2>
            <p className="mb-2">
              Web sitemizde yer alan fiyat teklif formu, iletişim kanalları veya doğrudan telefon aramaları aracılığıyla paylaştığınız aşağıdaki veriler işlenmektedir:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Kimlik ve İletişim Bilgileri:</strong> Adınız, soyadınız, telefon numaranız, e-posta adresiniz.</li>
              <li><strong>Lojistik ve Konum Bilgileri:</strong> Taşınacak eşyaların bulunduğu kaynak adres ve hedef adres (ilçe/şehir bilgileri), kat bilgisi, asansör gereksinimi, oda sayısı.</li>
              <li><strong>İşlem Güvenliği ve Rıza Bilgileri:</strong> IP adresiniz, KVKK onay durumu ve onay zaman damgası (timestamp).</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">3. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri</h2>
            <p className="mb-2">
              Kişisel verileriniz, KVKK m. 5/2 kapsamında aşağıdaki yasal nedenlerle işlenmektedir:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Sözleşmenin Kurulması ve İfası (m.5/2-c):</strong> Taşınma talebinize yönelik fiyat hesaplamalarının yapılması, nakliyat teklifinin sunulması, taşınma gününün koordine edilmesi ve nakliye sözleşmesinin imzalanması.</li>
              <li><strong>Veri Sorumlusunun Meşru Menfaatleri (m.5/2-f):</strong> Hizmet kalitemizin artırılması, operasyonel güvenliğin sağlanması ve suistimallerin (bot gönderimleri vb.) engellenmesi.</li>
              <li><strong>Açık Rıza (m.5/1):</strong> Rıza vermeniz halinde tarafınızla kampanya, bilgilendirme veya geri bildirim amaçlı iletişim kurulması.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">4. Veri Saklama Süreleri</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Teklif Formu Verileri:</strong> Sözleşmeye dönüşmeyen fiyat teklifi talepleri, olası hukuki ihtilaflarda zamanaşımı süreleri göz önünde bulundurularak <strong>3 (üç) yıl</strong> süreyle saklanır.</li>
              <li><strong>Hizmet/Sözleşme Verileri:</strong> Fiilen nakliye hizmeti alan müşterilerimizin fatura ve sözleşme kayıtları, Türk Ticaret Kanunu ve Vergi Usul Kanunu uyarınca <strong>10 (on) yıl</strong> süreyle saklanır.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">5. Veri İşleyenler ve Üçüncü Kişilere Aktarım</h2>
            <p className="mb-2">
              Kişisel verileriniz, faaliyetlerimizin kesintisiz sürdürülebilmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla, gerekli güvenlik önlemleri alınarak aşağıdaki üçüncü taraflara (Veri İşleyenler) aktarılmaktadır:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Resend Inc.:</strong> Teklif formundan gönderilen taleplerin şirket e-posta adresimize bildirim olarak iletilmesi (E-posta altyapısı sağlayıcısı).</li>
              <li><strong>Google LLC:</strong> Kullanıcı trafiğinin analizi ve arama performansı takibi (Google Analytics).</li>
              <li><strong>Microsoft Corp.:</strong> Web sitesi kullanıcı deneyimi analizleri ve teknik hata izleme (Microsoft Clarity).</li>
              <li><strong>Vercel Inc.:</strong> Web sitemizin barındırılması ve sunucu altyapısı hizmetleri (Hosting ve Bulut altyapısı).</li>
              <li><strong>Sigorta Şirketleri:</strong> Şehirlerarası veya şehir içi taşımalarda adınıza Emtia Nakliyat Sigortası poliçesi düzenlenebilmesi amacıyla ilgili sigorta acentesiyle paylaşım.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-bold text-navy text-base mb-2">6. KVKK Madde 11 Kapsamındaki Haklarınız</h2>
            <p className="mb-2">
              KVKK&rsquo;nın 11. maddesi uyarınca, şirketimize başvurarak kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
              <li>KVKK m. 7 çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,</li>
              <li>Düzeltme, silme veya yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
              <li>Münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
              <li>Kanuna aykırı işleme sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme.</li>
            </ul>
          </div>

          <div className="border-t border-gray-light pt-4 mt-6">
            <h2 className="font-display font-bold text-navy text-base mb-2">7. Başvuru ve İletişim</h2>
            <p>
              Yukarıda belirtilen haklarınızı kullanmak için, kimliğinizi teyit eden belgelerle birlikte başvurunuzu <a href={`mailto:${SITE.email}`} className="text-orange-text hover:underline">{SITE.email}</a> e-posta adresimize yazılı olarak iletebilirsiniz. Talebiniz en geç 30 (otuz) gün içerisinde ücretsiz olarak sonuçlandırılacaktır.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
