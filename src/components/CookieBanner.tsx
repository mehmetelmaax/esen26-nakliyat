'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been chosen
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    window.dispatchEvent(new Event('cookie-consent-change'));
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    window.dispatchEvent(new Event('cookie-consent-change'));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-white border border-gray-light text-charcoal rounded-2xl p-5 shadow-2xl z-[9999] animate-slide-up flex flex-col gap-4 font-sans border-l-4 border-l-orange">
      <div className="space-y-1.5">
        <h4 className="font-display font-black text-navy text-sm">Çerez ve Gizlilik Tercihiniz</h4>
        <p className="text-[10px] md:text-xs text-charcoal/80 leading-relaxed">
          Sitemizdeki kullanıcı deneyimini iyileştirmek, trafik analizi yapmak ve site performansını ölçmek amacıyla Google Analytics ve Microsoft Clarity çerezleri kullanmaktayız. Detaylı bilgi için <Link href="/yasal/gizlilik" className="text-orange underline font-semibold">Gizlilik Politikamızı</Link> inceleyebilirsiniz.
        </p>
      </div>
      <div className="flex gap-2 justify-end w-full">
        <button
          onClick={handleDecline}
          className="bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer"
        >
          Reddet
        </button>
        <button
          onClick={handleAccept}
          className="bg-navy hover:bg-navy-light text-white text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer"
        >
          Kabul Et
        </button>
      </div>
    </div>
  );
}
