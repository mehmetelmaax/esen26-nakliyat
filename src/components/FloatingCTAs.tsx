'use client';
import { SITE } from '@/lib/site-config';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

// Keep closed state in a module-level variable to persist across page navigations in the SPA session
let sessionClosed = false;

export default function FloatingCTAs() {
  const [showWhatsappPopup, setShowWhatsappPopup] = useState(false);

  useEffect(() => {
    if (sessionClosed) return;
    
    const timer = setTimeout(() => {
      setShowWhatsappPopup(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowWhatsappPopup(false);
    sessionClosed = true;
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-4 items-end pointer-events-none md:flex">
      {showWhatsappPopup && (
        <div className="bg-white border border-gray-light text-charcoal rounded-2xl p-4 shadow-2xl max-w-[260px] relative animate-fade-in pointer-events-auto">
          <button 
            onClick={handleClose}
            className="absolute top-2 right-2 text-charcoal/40 hover:text-charcoal cursor-pointer"
            aria-label="Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex gap-3 items-start pr-2">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg flex-shrink-0 mt-0.5 animate-pulse">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-600 tracking-wider block">7/24 AKTİF HAT</span>
              <h4 className="font-display font-bold text-navy text-xs leading-snug">WhatsApp Destek</h4>
              <p className="text-[10px] text-charcoal leading-relaxed">Eşya fotoğraflarınızı atıp anında hızlı fiyat teklifi alabilirsiniz.</p>
              <a 
                href={SITE.whatsappDefaultHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('whatsapp_tikla', { konum: 'floating', sayfa: window.location.pathname });
                  handleClose();
                }}
                className="text-emerald-600 hover:underline text-[10px] font-bold block pt-1.5"
              >
                Şimdi Yaz &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
