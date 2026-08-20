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

function checkInMemoryRateLimit(ip: string): boolean {
  cleanOldCache();
  const now = Date.now();
  const ipData = ipCache.get(ip);
  if (!ipData || now > ipData.expiresAt) {
    ipCache.set(ip, { count: 1, expiresAt: now + 60000 }); // 60s window
    return false;
  } else {
    if (ipData.count >= 3) {
      return true;
    }
    ipData.count++;
    return false;
  }
}

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
      utm_source: rawBody.utm_source ? sanitizeHtml(rawBody.utm_source) : rawBody.utm_source,
      utm_medium: rawBody.utm_medium ? sanitizeHtml(rawBody.utm_medium) : rawBody.utm_medium,
      utm_campaign: rawBody.utm_campaign ? sanitizeHtml(rawBody.utm_campaign) : rawBody.utm_campaign,
      utm_term: rawBody.utm_term ? sanitizeHtml(rawBody.utm_term) : rawBody.utm_term,
      utm_content: rawBody.utm_content ? sanitizeHtml(rawBody.utm_content) : rawBody.utm_content,
      referrer: rawBody.referrer ? sanitizeHtml(rawBody.referrer) : rawBody.referrer,
    };

    // 2. Honeypot check (website must be empty)
    if (sanitizedBody.website && sanitizedBody.website.trim().length > 0) {
      console.warn('BOT_DETECTION: Honeypot filled by bot:', sanitizedBody.website);
      return NextResponse.json({ ok: true });
    }

    // 3. Server-side validation using Zod
    const validationResult = QuoteFormSchema.safeParse(sanitizedBody);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const errorMessage = (fieldErrors as any)[firstErrorKey]?.[0] || 'Lütfen bilgilerinizi kontrol edin.';
      
      return NextResponse.json(
        { ok: false, message: errorMessage, errors: fieldErrors },
        { status: 400 }
      );
    }

    // 4. Rate Limiting Check (Atomically using Vercel KV REST if available, otherwise fallback)
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (req.headers.get('x-real-ip') || '127.0.0.1');
    
    let isRateLimited = false;
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    if (kvUrl && kvToken) {
      try {
        const rateLimitKey = `rate_limit:${ip}`;
        const limit = 3;
        const windowSeconds = 60;
        const luaScript = `
          local key = KEYS[1]
          local limit = tonumber(ARGV[1])
          local window = tonumber(ARGV[2])
          local current = redis.call('get', key)
          if current and tonumber(current) >= limit then
              return tonumber(current)
          end
          current = redis.call('incr', key)
          if tonumber(current) == 1 then
              redis.call('expire', key, window)
          end
          return tonumber(current)
        `;

        const kvRes = await fetch(kvUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${kvToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(['EVAL', luaScript, '1', rateLimitKey, limit.toString(), windowSeconds.toString()])
        });

        if (kvRes.ok) {
          const data = await kvRes.json();
          const count = data.result;
          if (typeof count === 'number' && count > limit) {
            isRateLimited = true;
          }
        } else {
          console.error('KV_RATELIMIT_ERROR: Vercel KV REST returned non-OK status. Falling back to local limiter.');
          isRateLimited = checkInMemoryRateLimit(ip);
        }
      } catch (err: any) {
        console.error('KV_RATELIMIT_ERROR: Vercel KV fetch failed. Falling back to local limiter:', err.message || err);
        isRateLimited = checkInMemoryRateLimit(ip);
      }
    } else {
      isRateLimited = checkInMemoryRateLimit(ip);
    }

    if (isRateLimited) {
      return NextResponse.json(
        { ok: false, message: 'Çok fazla istek gönderdiniz. Lütfen bir dakika sonra tekrar deneyin.' },
        { status: 429 }
      );
    }

    const leadData = validationResult.data;
    const referrer = leadData.referrer || req.headers.get('referer') || '/teklif-al';
    const timestamp = new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });
    const est = calculateEstimateFromForm(leadData.rooms, leadData.elevator, leadData.fromDistrict, leadData.toDistrict);
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    const fullLead = {
      id: leadId,
      ...leadData,
      referrer,
      timestamp,
      estimate: est,
      kvkkConsentTimestamp: timestamp
    };

    // 5. Log lead as JSON (Vercel Backup)
    console.log('LEAD_CAPTURE:', JSON.stringify(fullLead));

    // 6. Multi-Channel Persistence (KV and/or Google Sheets Webhook)
    if (kvUrl && kvToken) {
      try {
        const kvRes = await fetch(kvUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${kvToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(['LPUSH', 'leads', JSON.stringify(fullLead)])
        });
        if (!kvRes.ok) {
          const errText = await kvRes.text();
          console.error('LEAD_PERSIST_FAILED: Vercel KV REST API returned non-OK:', errText);
        }
      } catch (err: any) {
        console.error('LEAD_PERSIST_FAILED: Vercel KV write failed:', err.message || err);
      }
    }

    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (sheetsUrl) {
      try {
        const sheetsRes = await fetch(sheetsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fullLead)
        });
        if (!sheetsRes.ok) {
          const errText = await sheetsRes.text();
          console.error('LEAD_PERSIST_FAILED: Google Sheets Webhook returned non-OK:', errText);
        }
      } catch (err: any) {
        console.error('LEAD_PERSIST_FAILED: Google Sheets Webhook write failed:', err.message || err);
      }
    }

    // 7. Send email notification via Resend
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
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e9eef2; border-radius: 10px;">
            <h2 style="color: #102a43; border-bottom: 2px solid #f7931e; padding-bottom: 10px;">Yeni Teklif Talebi Alındı</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2; width: 180px;">Talep ID:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadId}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Ad Soyad:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.name}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Telefon:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;"><a href="tel:${leadData.phone}">${leadData.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Nereden:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.fromDistrict}</td>
              </tr>
              <tr style="background: #f9fafb;">
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Nereye:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.toDistrict}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Oda Sayısı:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2;">${leadData.rooms} Daire</td>
              </tr>
              <tr style="background: #f9fafb;">
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
              <tr>
                <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e9eef2;">Kampanya Parametreleri:</td>
                <td style="padding: 10px; border-bottom: 1px solid #e9eef2; font-size: 11px; color: #486581; line-height: 1.4;">
                  <strong>Source:</strong> ${leadData.utm_source || '-'}<br/>
                  <strong>Medium:</strong> ${leadData.utm_medium || '-'}<br/>
                  <strong>Campaign:</strong> ${leadData.utm_campaign || '-'}<br/>
                  <strong>Term:</strong> ${leadData.utm_term || '-'}<br/>
                  <strong>Content:</strong> ${leadData.utm_content || '-'}
                </td>
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
            lead: fullLead
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
          lead: fullLead
        }));
      }
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    console.error('API_TEKLIF_ERROR:', error);
    return NextResponse.json(
      { ok: false, message: 'İstek işlenirken sunucuda bir hata oluştu.' },
      { status: 500 }
    );
  }
}
