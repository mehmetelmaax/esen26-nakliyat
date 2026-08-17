'use client';

import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { SITE } from '@/lib/site-config';

export default function MapEmbed() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check if cookie consent is already stored in localStorage
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'accepted') {
      setTimeout(() => {
        setHasConsent(true);
      }, 0);
    }
  }, []);

  const handleConsent = () => {
    setHasConsent(true);
    // Also trigger global cookie consent acceptance if needed
    localStorage.setItem('cookie-consent', 'accepted');
    window.dispatchEvent(new Event('cookie-consent-change'));
  };

  if (!hasConsent) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-navy/10 text-center space-y-4">
        <MapPin className="w-8 h-8 text-orange" />
        <div className="text-sm font-semibold text-navy max-w-sm">
          Google Harita konumunu görüntülemek için çerez izni vermeniz gerekmektedir.
        </div>
        <p className="text-xs text-charcoal max-w-xs">
          Haritayı yüklediğinizde Google Haritalar üçüncü taraf çerezleri tarayıcınıza yerleştirebilir.
        </p>
        <button
          onClick={handleConsent}
          className="bg-navy hover:bg-navy-light text-white font-sans font-bold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer pointer-events-auto"
        >
          Haritayı Yükle ve Kabul Et
        </button>
      </div>
    );
  }

  return (
    <iframe
      title="Esen 26 Nakliyat Google Harita Konumu"
      src={`https://maps.google.com/maps?q=${SITE.geo.lat},${SITE.geo.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
      className="absolute inset-0 w-full h-full border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
