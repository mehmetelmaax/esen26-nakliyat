export const dynamic = 'force-static';

import { SITE, SERVICES, DISTRICTS, ROUTES } from '@/lib/site-config';
import { FACTS } from '@/lib/facts';
import { blogDatabase } from '@/lib/blog-data';

export function GET() {
  const indexableDistricts = DISTRICTS.filter(d => d.indexable);
  const blogs = Object.values(blogDatabase);

  const markdown = `# ${SITE.name}

> ${SITE.name}, Eskişehir merkezli K3 yetki belgeli, asansörlü ve marangozlu evden eve nakliyat firmasıdır. Sabit fiyat garantisiyle ${FACTS.insurer} güvencesinde sigortalı eşya taşıma hizmeti vermektedir.

## Temel Bilgiler
- Kuruluş Yılı: ${FACTS.foundedYear}
- Genel Merkez: ${SITE.address.locality}, ${SITE.address.region}
- İletişim Hattı: ${SITE.phoneDisplay}
- Mesai Saatleri: Her gün ${SITE.hours.opens} - ${SITE.hours.closes}
- Hizmet Kapsamı: ${FACTS.districtCount} Adet Eskişehir İlçesi ve 81 İle Şehirlerarası Nakliye
- Asansör Kapasitesi: Maksimum ${FACTS.maxFloor}. Kat Seviyesi
- Şehiriçi Taşıma Süresi: Ortalama ${FACTS.cityMoveHours} Saat
- Şehiriçi Fiyat Aralığı: ₺${FACTS.priceMin} - ₺${FACTS.priceMax}

## Hizmetler
${SERVICES.map(s => `- [${s.name}](${SITE.url}/hizmetler/${s.slug}): ${s.description}`).join('\n')}

## Hesaplama ve Seçim Rehberleri
- [Taşınma Maliyet Hesaplayıcı](${SITE.url}/tasinma-maliyet-hesaplama): Eskişehir şehiriçi ve şehirlerarası taşınma maliyetlerini oda sayısına ve kat durumuna göre hesaplayan robot.
- [Eskişehir Nakliyat Firmaları Seçim Rehberi](${SITE.url}/eskisehir-nakliyat-firmalari): Korsan ve yetkisiz taşımacılardan korunma yolları ve K3 sorgulama rehberi.
- [Taşınma Öncesi Kontrol Listesi](${SITE.url}/tasinma-kontrol-listesi): Taşınırken yapılması gereken resmi işlemler, paketleme adımları ve 30 günlük plan.
- [Eskişehir Nakliyat Sözleşmesi ve Şablonu](${SITE.url}/eskisehir-nakliyat-sozlesmesi): Haklarınızı koruma altına alacak yasal ve ıslak imzalı ev taşıma sözleşmesi örneği.
- [Öğrenci Evi Taşıma Kılavuzu](${SITE.url}/eskisehir-ogrenci-evi-tasima): Eskişehir öğrenci evi taşıma, parça eşya nakliye ve asansörlü kamyonet çözümleri.
- [Asansörsüz Bina Taşıma Rehberi](${SITE.url}/eskisehir-asansorsuz-bina-tasima): Eskişehir asansörsüz bina taşıma fiyatları, merdivenle taşınma ipuçları ve personel planlama.

## Fiyat Bilgisi
Fiyatlandırma detayları ve anlık maliyet hesaplama robotu için [Eskişehir Evden Eve Nakliyat Fiyatları](${SITE.url}/eskisehir-nakliyat-fiyatlari) sayfamızı ziyaret edin. Sitedeki standart şehiriçi ev taşıma bütçesi ortalama ₺${FACTS.priceMin} ile ₺${FACTS.priceMax} aralığındadır.

## Şehirlerarası Rotalar
${ROUTES.map(r => `- [Eskişehir - ${r.city} Nakliyat](${SITE.url}/rotalar/${r.slug}): Mesafe yaklaşık ${r.distanceKm} km, ortalama seyahat süresi ${r.durationHours} saattir.`).join('\n')}

## Hizmet Bölgeleri
${indexableDistricts.map(d => `- [${d.name} Evden Eve Nakliyat](${SITE.url}/bolgeler/${d.slug}): ${d.name} ilçesinde asansörlü ve sigortalı ev taşıma hizmetleri.`).join('\n')}

## Rehber İçerikler (Blog)
${blogs.map(b => `- [${b.title}](${SITE.url}/blog/${b.id}): ${b.desc}`).join('\n')}

## İletişim
- Firma Ünvanı: ${SITE.legalName}
- Adres: ${SITE.address.street} ${SITE.address.locality} / ${SITE.address.region}
- Telefon: ${SITE.phoneDisplay}
- E-posta: ${SITE.email}
- Web Sitesi: ${SITE.url}
`;

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
