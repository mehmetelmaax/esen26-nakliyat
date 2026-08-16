export interface Review {
  name: string;
  location: string;
  comment: string;
  rating: number;
  date: string;
}

// TODO(owner): Google Business Profile (GBP) API entegrasyonu yapıldıktan sonra
// bu yorumlar dinamik olarak oradan beslenecektir.
// Google Yapılandırılmış Veri yönergelerine tam uyum sağlamak (sahte yorum cezası almamak)
// amacıyla doğrulanmamış bu veriler şu an JSON-LD şemasına eklenmemiştir.
export const reviewsDatabase: Review[] = [
  {
    name: 'Metin T.',
    location: 'Odunpazarı / Eskişehir',
    comment: 'Gerçekten söz verdikleri saatte geldiler, hiçbir eşyaya zarar gelmedi. Fiyatta ne anlaştıysak o oldu, teşekkürler.',
    rating: 5,
    date: '2026-07-15'
  },
  {
    name: 'Semih B.',
    location: 'Tepebaşı / Eskişehir',
    comment: 'Mobilyaların sökümünü ve montajını çok hızlı yaptılar. Asansörlü taşıma sistemi gerçekten çok pratik.',
    rating: 5,
    date: '2026-07-22'
  },
  {
    name: 'Elif K.',
    location: 'Sivrihisar / Eskişehir',
    comment: 'Paketleme kalitesi çok başarılıydı. Kırılacak eşyaların hepsini özenle sardılar. Güvenle tercih edebilirsiniz.',
    rating: 5,
    date: '2026-08-01'
  },
];
