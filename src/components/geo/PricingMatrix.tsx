import React from 'react';
import { estimatePrice } from '@/lib/pricing';

export default function PricingMatrix() {
  const types: Array<{ name: string; key: '1+1' | '2+1' | '3+1' | '4+1+' }> = [
    { name: '1+1 Daire', key: '1+1' },
    { name: '2+1 Daire', key: '2+1' },
    { name: '3+1 Daire', key: '3+1' },
    { name: '4+1 Daire', key: '4+1+' },
  ];

  const getCellEstimate = (rooms: '1+1' | '2+1' | '3+1' | '4+1+', distanceType: 'sehirici' | 'ilceler' | 'sehirlerarasi', distanceKm?: number) => {
    const est = estimatePrice({
      rooms,
      fromFloor: 1,
      toFloor: 1,
      fromElevator: false,
      toElevator: false,
      distanceType,
      packing: false,
      carpentry: false,
      storage: false,
      distanceKm
    });
    return `₺${est.min.toLocaleString('tr-TR')} - ₺${est.max.toLocaleString('tr-TR')}`;
  };

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-light shadow-sm space-y-6 overflow-hidden text-charcoal">
      <h2 className="font-display font-bold text-navy text-xl md:text-2xl border-b border-gray-light pb-3">
        Eskişehir Ev Taşıma Oda, Mesafe ve Kat Fiyat Matrisi
      </h2>
      <p className="text-xs md:text-sm text-charcoal leading-relaxed">
        Eskişehir genelindeki evden eve nakliyat operasyonlarında tahmini maliyet aralıkları daire büyüklüğüne (oda sayısına), gidilecek yol mesafesine ve kat yüksekliklerine göre belirlenmektedir. Aşağıda, Esen 26 Nakliyat tarafından sunulan 2026 yılı güncel lojistik fiyat aralıkları listelenmiştir:
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs md:text-sm">
          <caption>Eskişehir Ev Taşıma Fiyat Tarifeleri Matrisi (2026)</caption>
          <thead>
            <tr className="bg-navy text-white">
              <th scope="col" className="p-3 font-display rounded-tl-lg">Daire Tipi</th>
              <th scope="col" className="p-3 font-display">Şehiriçi (Tepebaşı/Odunpazarı)</th>
              <th scope="col" className="p-3 font-display">İlçeler Arası (Sivrihisar/Çifteler vb.)</th>
              <th scope="col" className="p-3 font-display rounded-tr-lg">Şehirlerarası (300 Km)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-light">
            {types.map((type, idx) => (
              <tr key={idx} className="hover:bg-off-white/50">
                <th scope="row" className="p-3 font-bold text-navy">{type.name}</th>
                <td className="p-3">{getCellEstimate(type.key, 'sehirici')}</td>
                <td className="p-3">{getCellEstimate(type.key, 'ilceler')}</td>
                <td className="p-3 font-semibold text-orange-text">{getCellEstimate(type.key, 'sehirlerarasi', 300)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="text-[10px] text-charcoal/70 italic border-l-2 border-orange pl-3">
        * Tablodaki fiyatlar normal eşya yoğunluğuna sahip binalardaki asansör kurulumlarını kapsamaktadır. Giriş kat veya 1. kat taşımalarında asansör kurulmadığı için fiyatlar daha düşük seviyede uygulanır.
      </p>
    </div>
  );
}
