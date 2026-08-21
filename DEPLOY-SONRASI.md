# Canlı Öncesi ve Sonrası İşlemleri Kılavuzu (DEPLOY-SONRASI.md)

## 0. Canlıya Geçiş (Production Deploy) Öncesi Kontrol Listesi

Siteyi Vercel Production ortamında yayına almadan önce aşağıdaki yapılandırmaların eksiksiz girildiğinden emin olun:

### Zorunlu Ortam Değişkenleri (Environment Variables):
- `NEXT_PUBLIC_SITE_URL=https://www.esen26nakliyat.com` (Preview/Canonical URL çelişkilerini önlemek için)
- `NEXT_PUBLIC_GA_ID` (Google Analytics 4 Ölçüm Kimliği)
- `NEXT_PUBLIC_GSC_VERIFICATION` (Google Search Console Meta Doğrulama Kodu)
- `RESEND_API_KEY` (Teklif formunun e-posta gönderebilmesi için zorunlu Resend API anahtarı)
- `NOTIFY_EMAIL` (Tekliflerin iletileceği kurumsal alıcı e-posta adresi)
- `RESEND_FROM_EMAIL` (Doğrulanmış alan adınızdan gönderilen gönderici adresi, örn. `teklif@esen26nakliyat.com`)

### Önemli ve Opsiyonel Ortam Değişkenleri:
- `NEXT_PUBLIC_K3_BELGE_NO` (T.C. Ulaştırma Bakanlığı K3 Yetki Belgesi numarası - E-E-A-T için çok kritiktir)
- `KV_REST_API_URL` ve `KV_REST_API_TOKEN` (Form spam koruması rate-limit ve lead kalıcılığı için Vercel KV REST tanımları. Serverless mimaride in-memory limit koruma sağlamaz; Vercel KV mutlaka kurulmalıdır)

### Alan Adı (Domain) ve Yönlendirmeler:
- Vercel panelinde hem `esen26nakliyat.com` (apex) hem de `www.esen26nakliyat.com` alan adları eklenmeli ve apex domain otomatik olarak **www** mülküne (301 yönlendirmesiyle) bağlanmalıdır. Tüm canonical etiketleri `www` varyasyonuna işaret etmektedir.
- SSL/HTTPS zorunludur. `next.config.ts` üzerinde HSTS preload ayarı aktiftir.

---

## 1. Google Search Console Kurulumu ve Sitemap Gönderimi

Canlıya alım bittikten sonra sitenin Google botları tarafından hızlıca keşfedilmesi için şu adımları uygulayın:

1. **Google Search Console (GSC)** paneline giriş yapın ([search.google.com](https://search.google.com)).
2. Yeni bir mülk ekleyin ve yöntem olarak **"Alan Adı" (Domain)** doğrulamayı seçin.
3. DNS sağlayıcınıza (örn. Cloudflare, GoDaddy) GSC panelinin verdiği TXT kaydını ekleyerek mülkü doğrulayın. (Alternatif olarak **"URL Öneki"** seçeneğiyle `.env.local` dosyasına eklediğiniz `NEXT_PUBLIC_GSC_VERIFICATION` meta tag doğrulamasını da kullanabilirsiniz).
4. Sol menüden **"Site Haritaları" (Sitemaps)** sayfasına gidin.
5. **"Yeni bir site haritası ekleyin"** kısmına `sitemap.xml` yazın ve **"Gönder"** butonuna basın.
6. Gönderim sonrası durumun **"Başarılı"** olduğunu teyit edin. Haritada sitemap.ts içindeki indexlenebilir rotalara göre (canlıya çıkış tarihi itibarıyla **72 adet URL**) listelenmelidir. Bu sayı sitede yeni içerik (blog, rota, mahalle vb.) yayınlandıkça dinamik olarak artacaktır.

---

## 2. Yandex Webmaster ve Bing Webmaster Tools Kurulumu

Eskişehir yerel nakliyat aramalarında Yandex ve Bing kullanıcılarını çekebilmek için:

1. **Yandex Webmaster** paneline girin ([webmaster.yandex.com](https://webmaster.yandex.com)).
2. Site adresini ekleyin ve doğrulamayı `.env.local` içindeki `NEXT_PUBLIC_YANDEX_VERIFICATION` anahtarıyla meta etiket üzerinden tamamlayın.
3. Yandex sitemap alanına `https://www.esen26nakliyat.com/sitemap.xml` adresini gönderin.
4. **Bing Webmaster Tools** paneline girin ([bing.com/webmasters](https://www.bing.com/webmasters)).
5. Google Search Console verilerinizi tek tıkla Bing paneline aktararak mülk doğrulamasını ve sitemap kayıtlarını otomatik senkronize edin.

---

## 3. İlk İndeks Talepleri (URL Denetimi)

Yeni açılan 12 adet yüksek arama hacimli blog sayfası ve fiyat hesaplama sayfasının Google'da hızlı indeks alabilmesi için Search Console üzerinden manuel istek gönderin:

1. GSC üst arama kutusuna (URL Denetimi) sırayla şu sayfaları girin:
   - `https://www.esen26nakliyat.com/`
   - `https://www.esen26nakliyat.com/eskisehir-nakliyat-fiyatlari`
   - `https://www.esen26nakliyat.com/blog/eskisehir-tasinma-maliyeti-2026`
   - `https://www.esen26nakliyat.com/blog/nakliyat-sigortasi-nedir`
2. **"Dizin Oluşturulmasını Talep Et"** butonuna basarak botların sayfaları acilen taramasını sağlayın.

---

## 4. Yapısal Veri (Schema.org) Doğrulaması

Sitedeki JSON-LD şemalarının Google arama sonuçlarında yıldızlı veya zengin sonuç (Rich Results) üretebilmesi için canlı URL'leri doğrulayın:

1. **Google Rich Results Test** aracını açın ([search.google.com/test/rich-results](https://search.google.com/test/rich-results)).
2. Aşağıdaki URL'leri test edin ve şemaların geçerliliğini onaylayın:
   - Ana sayfa için: **MovingCompany**, **WebSite**, **FAQPage**
   - Fiyat sayfası için: **Service**, **FAQPage**, **BreadcrumbList**
   - Blog detay sayfaları için: **BlogPosting**, **FAQPage**, **BreadcrumbList**

---

## 5. 4 Haftalık Periyodik SEO Kontrol Takvimi

Yayım sonrasında sıralamaları ve site sağlığını korumak adına haftalık kontroller planlayın:

### 1. Hafta Kontrolleri (İndeks Sağlığı)
- GSC panelinde "Sayfa Sayısı / Dizin Oluşturma" raporunu inceleyin. Sayfaların kaç tanesinin indekse girdiğini görün.
- `site:www.esen26nakliyat.com` araması yaparak Google indeks listesini manuel analiz edin.

### 2. Hafta Kontrolleri (Performans & CWV)
- Search Console **"Önemli Web Verileri" (Core Web Vitals)** raporunu kontrol edin. Mobil ve masaüstü CLS/LCP/INP değerlerinde "Kırmızı" (Zayıf) uyarı var mı bakın.
- Mobil Chrome kullanıcılarından toplanan gerçek alan verilerini CrUX üzerinden inceleyin.

### 3. Hafta Kontrolleri (Hatalar & Drift İzleme)
- `npm run audit` komutunu localde tekrar çalıştırarak canlıya giden yeni güncellemelerin link bütünlüğünü veya SEO şemalarını bozup bozmadığını teyit edin.
- GSC **"Tarama Hataları"** sayfasında 404 veren eski `.htm` veya `/251/` gibi yönlendirdiğimiz rotaların 301 yönlendirmelerinin çalıştığını canlı sunucu loglarından (Vercel Analytics) doğrulayın.

### 4. Hafta Kontrolleri (Topical Authority ve Sıralama Analizi)
- "Eskişehir nakliyat fiyatları", "tasıma sigortası nedir" gibi yüksek dönüşümlü kelimelerdeki Google sıra pozisyonlarınızı takip aracınızla kontrol edin.
- Yeni eklediğimiz 12 blog yazısının organik impressions (gösterim) and click (tıklama) almaya başladığını GSC "Performans" raporundan teyit edin.
- Analytics panelinde hedeflenen telefon ve WhatsApp tıklama dönüşüm oranlarını analiz ederek A/B testleri kurgulayın.
