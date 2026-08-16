import { FACTS } from './facts';
import { DISTRICTS } from './site-config';

export interface PriceInput {
  rooms: '1+1' | '2+1' | '3+1' | '4+1+' | 'ofis';
  fromFloor: number;
  toFloor: number;
  fromElevator: boolean;
  toElevator: boolean;
  distanceType: 'sehirici' | 'ilceler' | 'sehirlerarasi';
  packing: boolean;
  carpentry: boolean;
  storage: boolean;
  distanceKm?: number;
}

export interface PriceEstimate {
  min: number;
  max: number;
  breakdown: {
    base: number;
    floorSurcharge: number;
    elevatorFee: number;
    packingFee: number;
    distanceFee: number;
    storageFee: number;
  };
  disclaimer: string;
}

/**
 * Esen 26 Nakliyat Fiyat Hesaplama Motoru.
 * Bu fonksiyon, daire oda sayısı, kat bilgileri, asansör durumları ve ek lojistik gereksinimleri
 * baz alarak tamamen yan etkisiz (pure) ve tutarlı bir fiyat aralığı hesaplar.
 */
export function estimatePrice(input: PriceInput): PriceEstimate {
  // Baz fiyat aralıkları (şehir içi):
  // 1+1: 12000 - 18000
  // 2+1: 18000 - 23000
  // 3+1: 23000 - 32000
  // 4+1+: 32000 - 42000
  // ofis: 12000 - 16000
  let baseMin = 12000;
  let baseMax = 18000;

  if (input.rooms === '2+1') {
    baseMin = 18000;
    baseMax = 23000;
  } else if (input.rooms === '3+1') {
    baseMin = 23000;
    baseMax = 32000;
  } else if (input.rooms === '4+1+') {
    baseMin = 32000;
    baseMax = 42000;
  } else if (input.rooms === 'ofis') {
    baseMin = 12000;
    baseMax = 16000;
  }

  // Kat artış yevmiyesi: Her kat yükseldiğinde personelin iş gücü katlandığı için kat başına 150 TL ek maliyet eklenir.
  const floorSurcharge = (input.fromFloor + input.toFloor) * 150;

  // Dış cephe asansör kurulum ücreti: Asansör kurulumu başına 2.500 TL yansıtılır.
  let elevatorFee = 0;
  if (input.fromElevator) elevatorFee += 2500;
  if (input.toElevator) elevatorFee += 2500;

  // Profesyonel paketleme ve patpat naylon sarım bedeli
  let packingFee = 0;
  if (input.packing) {
    if (input.rooms === '1+1') packingFee = 1500;
    else if (input.rooms === '2+1') packingFee = 2500;
    else if (input.rooms === '3+1') packingFee = 3500;
    else packingFee = 4500;
  }

  // Yol mesafesi katsayıları
  let distanceFee = 0;
  if (input.distanceType === 'ilceler') {
    distanceFee = 4000; // Eskişehir dış ilçeler gidiş-dönüş yakıt farkı
  } else if (input.distanceType === 'sehirlerarasi') {
    // 1 Km için 30 TL
    const km = input.distanceKm || 100;
    distanceFee = km * 30;
  }

  // Aylık kiralık eşya depolama opsiyonu
  let storageFee = 0;
  if (input.storage) {
    if (input.rooms === '1+1') storageFee = 3000;
    else if (input.rooms === '2+1') storageFee = 4500;
    else storageFee = 6000;
  }

  const min = baseMin + floorSurcharge + elevatorFee + packingFee + distanceFee + storageFee;
  const max = baseMax + floorSurcharge + elevatorFee + packingFee + distanceFee + storageFee;

  const disclaimer = 'Bu tahmini bir hesaplamadır, kesin fiyat ücretsiz ekspertiz sonrası verilir.';

  return {
    min,
    max,
    breakdown: {
      base: baseMin,
      floorSurcharge,
      elevatorFee,
      packingFee,
      distanceFee,
      storageFee
    },
    disclaimer
  };
}

export function calculateEstimateFromForm(rooms: string, elevator: string, fromDistrict: string, toDistrict: string) {
  const isIntercity = 
    fromDistrict.includes('İl Dışı') || 
    toDistrict.includes('İl Dışı') || 
    fromDistrict.includes('Şehirlerarası') || 
    toDistrict.includes('Şehirlerarası');

  let distanceType: 'sehirici' | 'ilceler' | 'sehirlerarasi' = 'sehirici';
  if (isIntercity) {
    distanceType = 'sehirlerarasi';
  } else {
    // Check if either is an outer district (requires checking DISTRICTS)
    const fromConfig = DISTRICTS.find((d: any) => fromDistrict.includes(d.name));
    const toConfig = DISTRICTS.find((d: any) => toDistrict.includes(d.name));
    if ((fromConfig && fromConfig.tier === 'ilce') || (toConfig && toConfig.tier === 'ilce')) {
      distanceType = 'ilceler';
    }
  }

  const priceInput: PriceInput = {
    rooms: (rooms === 'ofis' || rooms === '1+1' || rooms === '2+1' || rooms === '3+1' || rooms === '4+1+') ? rooms as any : '2+1',
    fromFloor: 3, // average floor surcharge estimation
    toFloor: 3,
    fromElevator: elevator === 'evet',
    toElevator: elevator === 'evet',
    distanceType,
    packing: true,
    carpentry: true,
    storage: false,
    distanceKm: distanceType === 'sehirlerarasi' ? 300 : undefined
  };

  const estimate = estimatePrice(priceInput);
  return { min: estimate.min, max: estimate.max };
}

