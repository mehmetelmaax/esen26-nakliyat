import React from 'react';
import { FACTS } from '@/lib/facts';

export default function PricingMatrix() {
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
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">1+1 Daire</th>
              <td className="p-3">₺{FACTS.priceMin.toLocaleString('tr-TR')} - ₺10.000</td>
              <td className="p-3">₺10.000 - ₺12.000</td>
              <td className="p-3 font-semibold text-orange-text">₺20.000 - ₺24.000</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">2+1 Daire</th>
              <td className="p-3">₺11.000 - ₺13.500</td>
              <td className="p-3">₺13.000 - ₺15.500</td>
              <td className="p-3 font-semibold text-orange-text">₺25.000 - ₺30.000</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">3+1 Daire</th>
              <td className="p-3">₺15.000 - ₺17.500</td>
              <td className="p-3">₺17.000 - ₺19.500</td>
              <td className="p-3 font-semibold text-orange-text">₺32.000 - ₺38.000</td>
            </tr>
            <tr className="hover:bg-off-white/50">
              <th scope="row" className="p-3 font-bold text-navy">4+1 Daire</th>
              <td className="p-3">₺19.000 - ₺{FACTS.priceMax.toLocaleString('tr-TR')}</td>
              <td className="p-3">₺21.000 - ₺24.000</td>
              <td className="p-3 font-semibold text-orange-text">₺40.000 - ₺46.000</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p className="text-[10px] text-charcoal/70 italic border-l-2 border-orange pl-3">
        * Tablodaki fiyatlar normal eşya yoğunluğuna sahip binalardaki asansör kurulumlarını kapsamaktadır. Giriş kat veya 1. kat taşımalarında asansör kurulmadığı için fiyatlar daha düşük seviyede uygulanır.
      </p>
    </div>
  );
}
