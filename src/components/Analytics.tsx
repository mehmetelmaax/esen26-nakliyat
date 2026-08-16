'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookie-consent');
    if (storedConsent === 'accepted') {
      setConsent('accepted');
    } else if (storedConsent === 'declined') {
      setConsent('declined');
    }

    const handleConsentChange = () => {
      const updated = localStorage.getItem('cookie-consent');
      if (updated === 'accepted') {
        setConsent('accepted');
      } else if (updated === 'declined') {
        setConsent('declined');
      }
    };

    window.addEventListener('cookie-consent-change', handleConsentChange);
    return () => window.removeEventListener('cookie-consent-change', handleConsentChange);
  }, []);

  if (!gaId && !clarityId) return null;

  return (
    <>
      {/* Google Consent Mode v2 Defaults */}
      <Script id="google-consent-mode" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            'personalization_storage': 'denied',
            'functionality_storage': 'denied',
            'security_storage': 'granted'
          });
        `}
      </Script>

      {/* Dynamic update to consent mode when accepted */}
      {consent === 'accepted' && (
        <Script id="google-consent-update" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'update', {
              'ad_storage': 'granted',
              'ad_user_data': 'granted',
              'ad_personalization': 'granted',
              'analytics_storage': 'granted',
              'personalization_storage': 'granted',
              'functionality_storage': 'granted'
            });
          `}
        </Script>
      )}

      {/* 1. Google Analytics 4 */}
      {gaId && consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* 2. Microsoft Clarity */}
      {clarityId && consent === 'accepted' && (
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
