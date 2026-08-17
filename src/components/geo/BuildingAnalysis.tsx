import React from 'react';

interface BuildingAnalysisProps {
  districtName: string;
}

interface DistrictBuildingData {
  buildingType: string;
  typicalFloors: string;
  elevatorRequirement: string;
  streetWidth: string;
  specialCondition: string;
}

const DISTRICT_BUILDING_MAP: Record<string, DistrictBuildingData> = {
  'Tepebaşı': {
    buildingType: 'Yeni Rezidanslar ve Modern Konut Siteleri',
    typicalFloors: '5 - 15 Kat',
    elevatorRequirement: 'Çok Yüksek (%85 dış cephe asansör kullanımı)',
    streetWidth: 'Geniş Bulvarlar ve Yoğun Sokaklar',
    specialCondition: 'Peyzaj ve site içi otopark durumlarına göre modüler asansör sevk edilmektedir.'
  },
  'Odunpazarı': {
    buildingType: 'Yüksek Katlı Siteler ve Rezidans Konutları',
    typicalFloors: '8 - 20 Kat',
    elevatorRequirement: 'Çok Yüksek (%90 dış cephe asansörü kurulumu)',
    streetWidth: 'Geniş Bulvarlar ve Orta Sokaklar',
    specialCondition: 'Yeni sitelerdeki asansör kullanım yasakları nedeniyle teleskopik dış cephe asansörü kurulur.'
  },
  'Sivrihisar': {
    buildingType: 'Yeni TOKİ Konutları ve Alçak Apartmanlar',
    typicalFloors: '4 - 10 Kat',
    elevatorRequirement: 'Yüksek (%75 dış cephe asansörü ihtiyacı)',
    streetWidth: 'Orta ve Geniş caddeler',
    specialCondition: 'Yeni sitelerde bina asansörü koruması için modüler asansör kurulumu zorunludur.'
  },
  'Çifteler': {
    buildingType: 'Eski Apartmanlar ve Müstakil Konutlar',
    typicalFloors: '2 - 6 Kat',
    elevatorRequirement: 'Orta (%45 dış cephe asansörü kurulumu)',
    streetWidth: 'Dar Sokaklar ve Bitişik Nizam Yapılar',
    specialCondition: 'Bina içi dar merdivenler nedeniyle eşya hasarını önleyici paketleme yapılır.'
  },
  'Alpu': {
    buildingType: 'Müstakil Konutlar ve Alçak Katlı Apartmanlar',
    typicalFloors: '2 - 4 Kat',
    elevatorRequirement: 'Düşük-Orta (%30 dış cephe asansör kurulumu)',
    streetWidth: 'Geniş Caddeler ve Köy Yolları',
    specialCondition: 'İlçe merkezine gidiş-dönüş yakıt ve yol planlaması operasyon öncesinde belirlenir.'
  },
  'Beylikova': {
    buildingType: 'Müstakil Tarım Evleri ve Kamu Binaları',
    typicalFloors: '1 - 3 Kat',
    elevatorRequirement: 'Düşük (%15 dış cephe asansörü)',
    streetWidth: 'Geniş ve Rahat Sokaklar',
    specialCondition: 'Müstakil evlerde genellikle zemin kat ve 1. kat yüklemeleri yatay taşıma yöntemiyle yapılır.'
  },
  'Günyüzü': {
    buildingType: 'Müstakil Köy Konutları ve Bahçeli Evler',
    typicalFloors: '1 - 2 Kat',
    elevatorRequirement: 'Çok Düşük (%5 asansör ihtiyacı)',
    streetWidth: 'Geniş ve Toprak Köy Yolları',
    specialCondition: 'Rampalı ve toprak yollar için kamyonlarımızın sürüş güvenliği önlemleri alınır.'
  },
  'Han': {
    buildingType: 'Ahşap Konutlar ve Müstakil Taş Evler',
    typicalFloors: '1 - 2 Kat',
    elevatorRequirement: 'Çok Düşük (%5 asansör ihtiyacı)',
    streetWidth: 'Dar ve Rampalı Tarihi Sokaklar',
    specialCondition: 'Dar tarihi sokaklara büyük tırlar yerine daha küçük nakliye kamyonları sevk edilir.'
  },
  'İnönü': {
    buildingType: 'Müstakil Evler ve İki Katlı Betonarme Yapılar',
    typicalFloors: '2 - 4 Kat',
    elevatorRequirement: 'Düşük-Orta (%25 mobil asansör ihtiyacı)',
    streetWidth: 'Orta Genişlikte Sokaklar ve Rampalar',
    specialCondition: 'İnönü Mağaraları yakınlarındaki dik yamaçlarda araç sabitleme ve fren takozları kullanılır.'
  },
  'Mahmudiye': {
    buildingType: 'Haralar, Müstakil Çiftlik Evleri ve Konutlar',
    typicalFloors: '1 - 3 Kat',
    elevatorRequirement: 'Düşük (%10 asansör ihtiyacı)',
    streetWidth: 'Geniş ve Düz Tarla/Çiftlik Yolları',
    specialCondition: 'Çiftlik yerleşimlerinde geniş yükleme alanlarında yatay taşıma planlanır.'
  },
  'Mihalgazi': {
    buildingType: 'Müstakil Evler, Seralar ve Bahçeli Konutlar',
    typicalFloors: '1 - 3 Kat',
    elevatorRequirement: 'Çok Düşük (%5 asansör ihtiyacı)',
    streetWidth: 'Dar Seracılık Yolları ve Rampalar',
    specialCondition: 'Sakarya Vadisi sıcak iklim koşullarında ambalaj kalitesi ve havalandırma dikkate alınır.'
  },
  'Mihalıççık': {
    buildingType: 'Betonarme Apartmanlar ve Müstakil Konutlar',
    typicalFloors: '2 - 5 Kat',
    elevatorRequirement: 'Orta (%35 asansör ihtiyacı)',
    streetWidth: 'Eğimli ve Dar İlçe Sokakları',
    specialCondition: 'Kış aylarında kar ve buzlanmaya karşı kar lastikleri ve zincirler hazır bulundurulur.'
  },
  'Sarıcakaya': {
    buildingType: 'Müstakil Konutlar ve Termal Tesis Yapıları',
    typicalFloors: '1 - 3 Kat',
    elevatorRequirement: 'Çok Düşük (%5 asansör ihtiyacı)',
    streetWidth: 'Dar Seracılık ve Vadi Yolları',
    specialCondition: 'Mikroklima iklim vadisindeki sıcaklıklara karşı neme duyarlı ambalaj malzemeleri seçilir.'
  },
  'Seyitgazi': {
    buildingType: 'Müstakil Konutlar ve Tarihi Apartman Yapıları',
    typicalFloors: '2 - 4 Kat',
    elevatorRequirement: 'Düşük-Orta (%20 asansör ihtiyacı)',
    streetWidth: 'Tarihi Dar Yokuşlar ve Yeni Sokaklar',
    specialCondition: 'Tarihsel dar yollarda kamyon yanaşma noktaları 1 gün önceden zabıta ile koordine edilir.'
  }
};

export default function BuildingAnalysis({ districtName }: BuildingAnalysisProps) {
  const cleanName = districtName.trim();
  const info = DISTRICT_BUILDING_MAP[cleanName];

  if (!info) return null;

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 text-charcoal">
      <h3 className="font-display font-bold text-navy text-lg md:text-xl border-b border-gray-light pb-2">
        {cleanName} İlçesi Bina Yapısı ve Nakliye Analiz Tablosu
      </h3>
      <p className="text-xs md:text-sm leading-relaxed text-charcoal/90">
        Esen 26 Nakliyat tarafından {cleanName} ilçesinde gerçekleştirilen ev taşıma süreçlerinde, ilçenin yerleşim mimarisi ve bina yapı durumlarına göre belirlenen lojistik analiz tablosu şu şekildedir:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <caption>{cleanName} Bölgesi Konut Mimarisi ve Asansör İhtiyaç Analizi</caption>
          <thead>
            <tr className="bg-navy text-white">
              <th scope="col" className="p-3 rounded-tl-lg">Kriter</th>
              <th scope="col" className="p-3 rounded-tr-lg">Analiz ve Tespit Sonucu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-light">
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Mecra / Yapı Tipi</th>
              <td className="p-3">{info.buildingType}</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Ortalama Kat Seviyeleri</th>
              <td className="p-3">{info.typicalFloors}</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Dış Cephe Asansör İhtiyacı</th>
              <td className="p-3 text-green-600 font-bold">{info.elevatorRequirement}</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Sokak ve Ulaşım Durumu</th>
              <td className="p-3">{info.streetWidth}</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">Özel Lojistik Tedbirleri</th>
              <td className="p-3 font-medium text-orange-text">{info.specialCondition}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}