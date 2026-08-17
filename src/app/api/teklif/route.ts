import { NextRequest, NextResponse } from 'next/server';
import { QuoteFormSchema } from '@/lib/validation';
import { calculateEstimateFromForm } from '@/lib/pricing';

// Simple in-memory cache for IP rate limiting
const ipCache = new Map<string, { count: number; expiresAt: number }>();

function cleanOldCache() {
  const now = Date.now();
  for (const [ip, data] of ipCache.entries()) {
    if (now > data.expiresAt) {
      ipCache.delete(ip);
    }
  }
}

// calculateServerEstimate removed in favor of calculateEstimateFromForm

function sanitizeHtml(str: string): string {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '').trim();
}

export async function POST(req: NextRequest) {
  try {
    // 1. Parse request body and sanitize strings
    const rawBody = await req.json().catch(() => ({}));
    const sanitizedBody = {
      ...rawBody,
      name: rawBody.name ? sanitizeHtml(rawBody.name) : rawBody.name,
      fromDistrict: rawBody.fromDistrict ? sanitizeHtml(rawBody.fromDistrict) : rawBody.fromDistrict,
      toDistrict: rawBody.toDistrict ? sanitizeHtml(rawBody.toDistrict) : rawBody.toDistrict,
    };

    // 2. Honeypot check (website must be empty)
    if (sanitizedBody.website && sanitizedBody.website.trim().length > 0) {
      console.warn('BOT_DETECTION: Honeypot filled by bot:', sanitizedBody.website);
      // Return 200 silently to deceive the bot
      return NextResponse.json({ ok: true });
    }

    // 3. Server-side validation using Zod
    const validationResult = QuoteFormSchema.safeParse(sanitizedBody);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      // Get the first error message to display
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const errorMessage = (fieldErrors as any)[firstErrorKey]?.[0] || 'Lütfen bilgilerinizi kontrol edin.';
      
      return NextResponse.json(
        { ok: false, message: errorMessage, errors: fieldErrors },
        { status: 400 }
      );
    }

    // 4. Rate Limiting Check (Only increments for valid requests)
    // NOTE: This in-memory Map rate limiter reset/lives within each serverless lambda instance.
    // For a production-ready shared cluster deployment, use a centralized store like Upstash Redis or Vercel KV.
    cleanOldCache();
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (req.headers.get('x-real-ip') || '127.0.0.1');
    
    const now = Date.now();
    const ipData = ipCache.get(ip);
    
    if (!ipData || now > ipData.expiresAt) {
      ipCache.set(ip, { count: 1, expiresAt: now + 60000 }); // 60s window
    } else {
      if (ipData.count >= 3) {
        return NextResponse.json(
          { ok: false, message: 'Çok fazla istek gönderdiniz. Lütfen bir dakika sonra tekrar deneyin.' },
          { status: 429 }
        );
      }
      ipData.count++;
    }

    const leadData = validationResult.data;
    const referrer = req.headers.get('referer') || '/teklif-al';
    const timestamp = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
    const est = calculateEstimateFromForm(leadData.rooms, leadData.elevator, leadData.fromDistrict, leadData.toDistrict);

    // 5. Log lead as JSON (Vercel backup)
    console.log('LEAD_CAPTURE:', JSON.stringify({
      ...leadData,
      referrer,
      timestamp,
      estimate: est,
      kvkkConsentTimestamp: timestamp
    }));

    // 6. Send email notification via Resend
    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Esen 26 Nakliyat <onboarding@resend.dev>';

    if (!apiKey || !notifyEmail) {
      if (process.env.NODE_ENV === 'production') {
        console.error('RESEND_CRITICAL_ERROR: RESEND_API_KEY or NOTIFY_EMAIL is not configured in production environment!');
        throw new Error('Mailing system configuration is missing.');
      } else {
        console.error('RESEND_WARNING: RESEND_API_KEY or NOTIFY_EMAIL is not set in env. Skipping email notification.');
      }
    } else {
      const emailContent = {
        from: fromEmail,
        to: notifyEmail,
        subject: `Yeni Teklif Talebi - ${leadData.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9eef2; rounded: 10px;">
            <h2 style="color: #102a43; border-bottom: 2px solid #f7931e; padding-bottom: 10px;">Yeni Teklif Talebi Alındı</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2; width: 180px;">Ad Soyad:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Telefon:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;"><a href="tel:${leadData.phone}">${leadData.phone}</a></td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Nereden:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.fromDistrict}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Nereye:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.toDistrict}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Oda Sayısı:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.rooms} Daire</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Asansör Kurulumu:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.elevator === 'evet' ? 'Asansör Kurulsun' : 'Asansör İstenmiyor'}</td>
              </tr>
              <tr style="background: #fff8e7;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2; color: #a85b00;">Tahmini Fiyat:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2; font-weight: bold; color: #a85b00;">
                  ${est.min.toLocaleString('tr-TR')} TL - ${est.max.toLocaleString('tr-TR')} TL
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Zaman Damgası:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${timestamp}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Referans Sayfa:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2; font-size: 11px;">${referrer}</td>
              </tr>
            </table>
            <div style="margin-top: 25px; font-size: 11px; color: #7b8a97; text-align: center;">
              Bu e-posta Esen 26 Nakliyat web sitesi teklif hesaplayıcısı üzerinden otomatik olarak gönderilmiştir.
            </div>
          </div>
        `
      };

      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailContent)
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error('RESEND_ERROR: Email notification delivery failed:', errText);
          console.error('LEAD_CAPTURE_BACKUP_TRIGGERED:', JSON.stringify({
            status: 'FAILED_SENDING_EMAIL',
            error: errText,
            timestamp,
            lead: leadData
          }));
        } else {
          console.log('RESEND_SUCCESS: Email notification sent successfully to:', notifyEmail);
        }
      } catch (err: any) {
        console.error('RESEND_FATAL_ERROR: Unexpected error sending email notification:', err);
        console.error('LEAD_CAPTURE_BACKUP_TRIGGERED:', JSON.stringify({
          status: 'FATAL_EMAIL_ERROR',
          error: err.message || err,
          timestamp,
          lead: leadData
        }));
      }
    }

    // Return success to the user even if email delivery fails (the log backup is safe)
    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('API_TEKLIF_ERROR:', error);
    return NextResponse.json(
      { ok: false, message: 'İstek işlenirken sunucuda bir hata oluştu.' },
      { status: 500 }
    );
  }
}
