// Standalone pricing calculation test runner

// Node.js doesn't natively support ES imports without file extensions or package type module.
// Since we have "type": "module" or similar, let's run this script using Node.js.
// Wait, the file is under src/lib/pricing.ts, which is TypeScript.
// We can write a Javascript test runner file in scratch directory that mirrors or imports the functions.
// But to run it simply, let's write a pure JS version of calculatePrice or run it through ts-node or next, or write a simple script that has calculatePrice defined in it to run.
// Let's look at calculatePrice code we wrote in src/lib/pricing.ts and duplicate it inside the test script so we can execute it standalone in pure JS without compilation errors!

function calculatePriceLocal(inputs) {
  const breakdown = [];
  let basePrice = 0;

  switch (inputs.roomCount) {
    case '1+1': basePrice = 7000; break;
    case '2+1': basePrice = 9500; break;
    case '3+1': basePrice = 13000; break;
    case '4+1': basePrice = 16500; break;
    case '5+1': basePrice = 20000; break;
    default: basePrice = 9500;
  }
  breakdown.push({ label: `Temel Taşıma Ücreti (${inputs.roomCount} daire hacmi)`, cost: basePrice });

  let elevatorCost = 0;
  if (inputs.originElevator) {
    const originCost = inputs.originFloor > 10 ? 2500 : 2000;
    elevatorCost += originCost;
    breakdown.push({ label: `Yükleme Noktası Dış Cephe Asansör Kurulumu (${inputs.originFloor}. Kat)`, cost: originCost });
  } else if (inputs.originFloor > 1) {
    const stairCost = (inputs.originFloor - 1) * 400;
    elevatorCost += stairCost;
    breakdown.push({ label: `Yükleme Noktası Merdiven Taşıma Farkı (${inputs.originFloor - 1} kat)`, cost: stairCost });
  }

  if (inputs.destElevator) {
    const destCost = inputs.destFloor > 10 ? 2500 : 2000;
    elevatorCost += destCost;
    breakdown.push({ label: `Teslim Noktası Dış Cephe Asansör Kurulumu (${inputs.destFloor}. Kat)`, cost: destCost });
  } else if (inputs.destFloor > 1) {
    const stairCost = (inputs.destFloor - 1) * 400;
    elevatorCost += stairCost;
    breakdown.push({ label: `Teslim Noktası Merdiven Taşıma Farkı (${inputs.destFloor - 1} kat)`, cost: stairCost });
  }

  let distanceCost = 0;
  switch (inputs.distanceType) {
    case 'sehirici': distanceCost = 1000; break;
    case 'ilce': distanceCost = 3000; break;
    case 'sehirlerarasi': distanceCost = 12000; break;
  }
  breakdown.push({ label: `Mesafe ve Yol Maliyetleri (${inputs.distanceType})`, cost: distanceCost });

  if (inputs.packingIncluded) {
    let packingCost = 0;
    switch (inputs.roomCount) {
      case '1+1': packingCost = 1500; break;
      case '2+1': packingCost = 2000; break;
      case '3+1': packingCost = 2800; break;
      case '4+1': packingCost = 3500; break;
      case '5+1': packingCost = 4200; break;
    }
    breakdown.push({ label: 'Profesyonel Ambalajlama ve Paketleme Malzemesi', cost: packingCost });
  }

  if (inputs.carpenterIncluded) {
    let carpenterCost = 0;
    switch (inputs.roomCount) {
      case '1+1': carpenterCost = 800; break;
      case '2+1': carpenterCost = 1200; break;
      case '3+1': carpenterCost = 1600; break;
      case '4+1': carpenterCost = 2000; break;
      case '5+1': carpenterCost = 2400; break;
    }
    breakdown.push({ label: 'Mobilya ve Beyaz Eşya De-montaj/Montaj İşçiliği', cost: carpenterCost });
  }

  const total = breakdown.reduce((sum, item) => sum + item.cost, 0);
  const minPrice = Math.round(total);
  const maxPrice = Math.round(total * 1.15);

  return { minPrice, maxPrice, breakdown };
}

const scenarios = [
  {
    name: 'Senaryo 1: Minimal Taşıma (1+1 Daire, Giriş Katlar, Adana Şehiriçi, Ek Hizmet Yok)',
    inputs: {
      roomCount: '1+1',
      originFloor: 1,
      destFloor: 1,
      originElevator: false,
      destElevator: false,
      distanceType: 'sehirici',
      packingIncluded: false,
      carpenterIncluded: false
    }
  },
  {
    name: 'Senaryo 2: Standart Rezidans Taşıma (3+1 Daire, 8. Kattan 12. Kata, Asansörlü, Paketleme & Marangoz Dahil)',
    inputs: {
      roomCount: '3+1',
      originFloor: 8,
      destFloor: 12,
      originElevator: true,
      destElevator: true,
      distanceType: 'sehirici',
      packingIncluded: true,
      carpenterIncluded: true
    }
  },
  {
    name: 'Senaryo 3: İlçeler Arası Taşıma (2+1 Daire, 2. Kattan Giriş Kata, Merdivenli, Paketleme Dahil)',
    inputs: {
      roomCount: '2+1',
      originFloor: 2,
      destFloor: 1,
      originElevator: false,
      destElevator: false,
      distanceType: 'ilce',
      packingIncluded: true,
      carpenterIncluded: false
    }
  },
  {
    name: 'Senaryo 4: Ultra Lüks Şehirlerarası Taşıma (5+1 Villa, 4. Kattan 15. Kata, Asansörlü, Paketleme & Marangoz Dahil)',
    inputs: {
      roomCount: '5+1',
      originFloor: 4,
      destFloor: 15,
      originElevator: true,
      destElevator: true,
      distanceType: 'sehirlerarasi',
      packingIncluded: true,
      carpenterIncluded: true
    }
  },
  {
    name: 'Senaryo 5: Zorlu Asansörsüz Yüksek Kat Taşıma (3+1 Daire, 5. Kattan 4. Kata, Merdivenle Taşıma, Ek Hizmet Yok)',
    inputs: {
      roomCount: '3+1',
      originFloor: 5,
      destFloor: 4,
      originElevator: false,
      destElevator: false,
      distanceType: 'sehirici',
      packingIncluded: false,
      carpenterIncluded: false
    }
  }
];

console.log('--- PRICE CALCULATOR SCENARIO TESTING ---');
for (const s of scenarios) {
  console.log(`\n=========================================`);
  console.log(s.name);
  console.log(`=========================================`);
  const res = calculatePriceLocal(s.inputs);
  console.log(`Tahmini Fiyat Aralığı: ${res.minPrice.toLocaleString('tr-TR')} TL - ${res.maxPrice.toLocaleString('tr-TR')} TL`);
  console.log(`Fiyat Kalemleri Dökümü:`);
  res.breakdown.forEach(item => {
    console.log(`  - ${item.label}: +${item.cost.toLocaleString('tr-TR')} TL`);
  });
}
