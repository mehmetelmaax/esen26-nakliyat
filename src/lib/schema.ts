import { SITE, SERVICES, DISTRICTS } from './site-config';
import { FACTS } from './facts';

export function organizationSchema() {
  const socialFiltered = (Object.values(SITE.social) as string[])
    .filter((value) => value && value.trim() !== '');

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    '@id': `${SITE.url}/#organization`,
    'name': SITE.name,
    'alternateName': SITE.shortName,
    'url': SITE.url,
    'logo': {
      '@type': 'ImageObject',
      'url': `${SITE.url}/img/esen-26-logo-v3.png`,
      'width': '200',
      'height': '60'
    },
    'image': `${SITE.url}/img/esen-slayt-1.jpg`,
    'telephone': SITE.phone,
    'email': SITE.email,
    'description': `${SITE.name}, Eskişehir genelinde K3 yetki belgesi ve mobil dış cephe asansörleri ile ${FACTS.foundedYear} yılından bu yana sabit fiyat garantili ve sigortalı evden eve taşımacılık hizmeti sunmaktadır.`,
    'slogan': 'Sabit fiyat garantisiyle sigortalı ve asansörlü evden eve nakliyat.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': SITE.address.street,
      'addressLocality': SITE.address.locality,
      'addressRegion': SITE.address.region,
      'postalCode': SITE.address.postalCode,
      'addressCountry': SITE.address.country,
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': SITE.geo.lat.toString(),
      'longitude': SITE.geo.lng.toString(),
    },
    'serviceArea': {
      '@type': 'GeoCircle',
      'geoMidpoint': {
        '@type': 'GeoCoordinates',
        'latitude': SITE.geo.lat,
        'longitude': SITE.geo.lng
      },
      'geoRadius': '150000'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': SITE.hours.opens,
      'closes': SITE.hours.closes,
    },
    'areaServed': DISTRICTS.map((district) => ({
      '@type': 'AdministrativeArea',
      'name': `${district.name}, Eskişehir`
    })),
    'foundingDate': `${FACTS.foundedYear}-03-15`,
    'priceRange': '$$',
    'currenciesAccepted': 'TRY',
    'paymentAccepted': 'Nakit, Kredi Kartı, Havale/EFT',
    'knowsAbout': [
      'evden eve nakliyat',
      'asansörlü nakliyat',
      'eşya paketleme',
      'ofis taşımacılığı',
      'şehirlerarası nakliyat',
      'parça eşya taşıma',
      'piyano ve kasa taşıma',
      'eşya depolama',
      'ücretsiz ekspertiz'
    ],
    'makesOffer': SERVICES.map((service) => ({
      '@type': 'Offer',
      'itemOffered': {
        '@type': 'Service',
        'name': service.name,
        'description': service.description,
        'url': `${SITE.url}/hizmetler/${service.slug}`
      }
    })),
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `${SITE.name} Hizmetleri`,
      'itemListElement': SERVICES.map((service) => ({
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': service.name,
          'description': service.description,
          'url': `${SITE.url}/hizmetler/${service.slug}`
        }
      }))
    },
    ...(socialFiltered.length > 0 || true ? { 'sameAs': [
      ...socialFiltered,
      'https://maps.app.goo.gl/oZBkztaiuicPXVQT8'
    ] } : {})
  };

  return organization;
}

export function videoSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': `${SITE.name} Operasyon Faaliyet Videosu`,
    'description': `${SITE.name} asansörlü taşıma kurulumu, ambalajlama ve taşımacılık süreçlerimizi gösteren operasyon videosu.`,
    'thumbnailUrl': `${SITE.url}/img/esen-slayt-1.jpg`,
    'uploadDate': '2026-08-09T18:00:00Z',
    'contentUrl': `${SITE.url}/img/esen-video.mp4`,
    'duration': 'PT1M30S' // TODO(owner): video süresini netleştirin
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    'url': SITE.url,
    'name': SITE.name,
    'publisher': {
      '@id': `${SITE.url}/#organization`
    },
    'inLanguage': 'tr-TR'
  };
}

export function serviceSchema({ name, description, slug, areaName }: { name: string; description: string; slug: string; areaName?: string }) {
  const cleanSlug = slug.startsWith('/') ? slug : `/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Moving Services',
    'name': name,
    'description': description,
    'provider': {
      '@id': `${SITE.url}/#organization`
    },
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': areaName ? `${areaName}, Eskişehir` : 'Eskişehir'
    },
    'url': `${SITE.url}${cleanSlug}`
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, idx) => {
      const cleanUrl = item.url.startsWith('http') 
        ? item.url 
        : `${SITE.url}${item.url.startsWith('/') ? item.url : `/${item.url}`}`;
      return {
        '@type': 'ListItem',
        'position': idx + 1,
        'name': item.name,
        'item': cleanUrl
      };
    })
  };
}

export function faqSchema(faqsList: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqsList.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'mainEntity': {
      '@id': `${SITE.url}/#organization`
    }
  };
}
