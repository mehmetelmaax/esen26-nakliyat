declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: Record<string, unknown>) => void;
    clarity?: (command: string, ...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const eventMap: Record<string, string> = {
  'teklif_formu_basladi': 'quote_form_start',
  'teklif_formu_gonderildi': 'quote_form_submit',
  'teklif_formu_hata': 'quote_form_error',
  'telefon_tikla': 'phone_click',
  'whatsapp_tikla': 'whatsapp_click',
  'fiyat_hesaplandi': 'price_calculator_use',
};

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // 1. Determine standardized English name for GA4/GTM integration
  let normalizedName = eventMap[name] || name;

  if (name === 'scroll_depth' && params?.depth === 75) {
    normalizedName = 'scroll_75';
  }

  // 2. Fire original and normalized events via Google Analytics (gtag)
  if (window.gtag) {
    window.gtag('event', name, params);
    if (normalizedName !== name) {
      window.gtag('event', normalizedName, params);
    }
  }

  // 3. Push to Google Tag Manager (GTM) dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: normalizedName,
    originalEvent: name,
    ...params,
  });

  // 4. Track custom events in Microsoft Clarity
  if (window.clarity) {
    window.clarity('event', normalizedName);
  }
}
