type SchemaFunction = () => object;

const BASE_URL = 'https://seo-tools.vercel.app';

export const schema = {
  home: (): object => ({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SEO Tools",
    "url": BASE_URL,
    "applicationCategory": "SEO Software",
    "description": "A suite of powerful SEO tools to help optimize your website, analyze content, and improve search engine visibility.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }),

  entityAnalyzer: (): object => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Entity Analyzer",
    "applicationCategory": "Text Analysis Tool",
    "url": `${BASE_URL}/entity-analyzer`,
    "description": "Analyze web content to identify and extract named entities, understand key subjects, organizations, and locations.",
    "featureList": [
      "Named Entity Recognition",
      "Content Analysis",
      "Entity Extraction",
      "Semantic Analysis"
    ]
  }),

  sitemapGenerator: (): object => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "XML Sitemap Generator",
    "applicationCategory": "SEO Tool",
    "url": `${BASE_URL}/sitemap-generator`,
    "description": "Generate XML sitemaps to help search engines better understand and index your website structure.",
    "featureList": [
      "XML Sitemap Generation",
      "URL Discovery",
      "Search Engine Optimization",
      "Website Indexing"
    ]
  }),

  rssParser: (): object => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RSS Feed Parser",
    "applicationCategory": "Feed Analysis Tool",
    "url": `${BASE_URL}/rss-parser`,
    "description": "Parse and validate RSS feeds to ensure proper syndication and content distribution.",
    "featureList": [
      "RSS Feed Validation",
      "Feed Analysis",
      "Content Syndication",
      "Feed Structure Verification"
    ]
  }),

  robotsTester: (): object => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Robots.txt Tester",
    "applicationCategory": "SEO Tool",
    "url": `${BASE_URL}/robots-tester`,
    "description": "Test and validate your robots.txt file to ensure proper search engine crawler access control.",
    "featureList": [
      "Robots.txt Validation",
      "Crawler Access Testing",
      "SEO Compliance Check",
      "Search Engine Directives"
    ]
  }),

  percentageCalculator: (): object => ({
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "Calculator"],
    "name": "Percentage Calculator",
    "applicationCategory": "Calculator",
    "url": `${BASE_URL}/percentage-calculator`,
    "description": "Calculate percentages for SEO metrics, conversion rates, and performance indicators.",
    "featureList": [
      "Percentage Calculations",
      "SEO Metrics",
      "Conversion Rate Analysis",
      "Performance Indicators"
    ]
  }),

  organization: (): object => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SEO Tools",
    "url": BASE_URL,
    "logo": `${BASE_URL}/favicon.svg`,
    "description": "Provider of free SEO and web analysis tools",
    "sameAs": [
      "https://github.com/your-github",
      "https://twitter.com/your-twitter"
    ]
  })
} as const;

export function getBreadcrumbSchema(pageName: string, path: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": `${BASE_URL}${path}`
      }
    ]
  };
}

export function getPageSchema(page: keyof typeof schema, options?: { pageName?: string; path?: string }): string {
  const schemas = [];

  // Add the page-specific schema
  schemas.push(schema[page]());

  // Add organization schema to all pages
  schemas.push(schema.organization());

  // Add breadcrumb schema to all pages except home
  if (page !== 'home' && options?.pageName && options?.path) {
    schemas.push(getBreadcrumbSchema(options.pageName, options.path));
  }

  return JSON.stringify(schemas);
}
