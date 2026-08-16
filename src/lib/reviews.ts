export interface Review {
  name: string;
  location: string;
  comment: string;
  rating: number;
  date: string;
}

// Google Structured Data Guidelines Compliance:
// To avoid penalties for unverified aggregate ratings or rich snippet spam,
// these reviews are displayed on the frontend but excluded from the JSON-LD schema
// until live Google Business Profile API sync is established.
export const reviewsDatabase: Review[] = [
  {
    name: 'Ahmet Y.',
    location: 'Tepebaşı / Eskişehir',
    comment: 'Esen 26 ekibi son derece profesyoneldi. Eşyaları paketleme kaliteleri ve asansörlü taşıma sistemleri mükemmel. Hiçbir sorun yaşamadık.',
    rating: 5,
    date: '2026-07-15'
  },
  {
    name: 'Sibel K.',
    location: 'Odunpazarı / Eskişehir',
    comment: 'Yeni taşındığımız eve asansör kurulumu yaptılar. Pratik, hızlı ve son derece güler yüzlü bir hizmet aldık. Kesinlikle tavsiye ederim.',
    rating: 5,
    date: '2026-07-22'
  },
  {
    name: 'Murat A.',
    location: 'Eskişehir Merkez',
    comment: 'Şehirlerarası taşımada bize çok yardımcı oldular. Fiyatta baştan ne anlaştıysak o oldu, sürpriz maliyet çıkmadı.',
    rating: 5,
    date: '2026-08-01'
  },
];
