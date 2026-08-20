import { z } from 'zod';

export const QuoteFormSchema = z.object({
  name: z.string({ error: 'Lütfen ad soyad girin.' })
    .min(2, { message: 'Ad soyad en az 2 karakter olmalıdır.' })
    .max(60, { message: 'Ad soyad en fazla 60 karakter olmalıdır.' })
    .regex(/^[a-zA-ZÇŞĞÜÖİçşğüöı\s\-\.\']+$/, { message: 'Ad soyad yalnızca harf, boşluk, nokta ve tire içerebilir.' }),
    
  phone: z.string({ error: 'Lütfen telefon numaranızı girin.' })
    .refine(val => {
      const clean = val.replace(/\D/g, '');
      return (clean.length === 10 && clean.startsWith('5')) || (clean.length === 11 && clean.startsWith('05'));
    }, { message: 'Lütfen geçerli bir cep telefonu girin (Örn: 532 123 45 67)' }),
    
  fromDistrict: z.string({ error: 'Lütfen çıkış noktasını seçin.' }).min(1, { message: 'Lütfen çıkış noktasını seçin.' }),
  
  toDistrict: z.string({ error: 'Lütfen varış noktasını seçin.' }).min(1, { message: 'Lütfen varış noktasını seçin.' }),
  
  rooms: z.enum(['1+1', '2+1', '3+1', '4+1+', 'ofis'], {
    message: 'Lütfen ev boyutu seçin.'
  }),
  
  elevator: z.enum(['evet', 'hayir'], {
    message: 'Lütfen asansör seçeneği seçin.'
  }),
  
  website: z.string().max(0, { message: 'Bot protection triggered.' }).optional().default(''), // honeypot
  kvkkOnay: z.literal(true, {
    message: 'Lütfen KVKK Aydınlatma Metnini onaylayın.'
  }),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
  referrer: z.string().optional()
});

export type QuoteFormData = z.infer<typeof QuoteFormSchema>;
