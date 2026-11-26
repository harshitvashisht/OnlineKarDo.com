import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  twitterCard?: 'summary' | 'summary_large_image'
  structuredData?: Record<string, unknown>
}

export function SEO({
  title,
  description,
  canonical,
  ogImage = '/assets/onlinekardo-logo.jpeg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
}: SEOProps) {
  const siteName = 'OnlineKarDo'
  const fullTitle = `${title} | ${siteName}`
  const baseUrl = 'https://onlinekardo.com'
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  const jsonLd = structuredData ? {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    image: imageUrl,
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/onlinekardo-logo.jpeg`,
      },
    },
    ...structuredData,
  } : null

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#c2410c" />
      <link rel="canonical" href={url} />
      
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      <meta name="robots" content="index, follow" />
      <link rel="sitemap" href={`${baseUrl}/sitemap.xml`} />
      
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

export function OrganizationSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'OnlineKarDo',
          url: 'https://onlinekardo.com',
          logo: 'https://onlinekardo.com/assets/onlinekardo-logo.jpeg',
          sameAs: [
            'https://wa.me/91XXXXXXXXXX',
            'https://instagram.com/onlinekardo',
            'https://facebook.com/onlinekardo',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-XXXXXXXXXX',
            contactType: 'customer service',
            availableLanguage: ['English', 'Hindi'],
          },
        })}
      </script>
    </Helmet>
  )
}

export function ServiceSchema(service: {
  name: string
  description: string
  price: number
  category: string
  url: string
  image?: string
}) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: {
            '@type': 'Organization',
            name: 'OnlineKarDo',
            url: 'https://onlinekardo.com',
          },
          offers: {
            '@type': 'Offer',
            name: service.name,
            description: service.description,
            price: service.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: service.url,
          },
          category: service.category,
          image: service.image,
          url: service.url,
        })}
      </script>
    </Helmet>
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        })}
      </script>
    </Helmet>
  )
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        })}
      </script>
    </Helmet>
  )
}