type SchemaFunction = () => object;

export const schema = {
  home: (): object => ({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SEO Tools",
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
    "description": "Provider of free SEO and web analysis tools",
    "sameAs": [
      "https://github.com/your-github",
      "https://twitter.com/your-twitter"
    ]
  })
} as const;

export function getBreadcrumbSchema(origin: string, pageName: string, path: string): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageName,
        "item": `${origin}${path}`
      }
    ]
  };
}

export function getPageSchema(page: keyof typeof schema, options?: { pageName?: string; path?: string; origin?: string }): string {
  const schemas = [];
  const currentSchema = schema[page]();

  // Add URL to schema if origin is provided
  if (options?.origin) {
    const schemaWithUrl = {
      ...currentSchema,
      url: options.origin + (page === 'home' ? '' : options.path)
    };
    schemas.push(schemaWithUrl);
  } else {
    schemas.push(currentSchema);
  }

  // Add organization schema with URL if origin is provided
  const orgSchema = schema.organization();
  if (options?.origin) {
    const orgSchemaWithUrl = {
      ...orgSchema,
      url: options.origin,
      logo: `${options.origin}/favicon.svg`
    };
    schemas.push(orgSchemaWithUrl);
  } else {
    schemas.push(orgSchema);
  }

  // Add breadcrumb schema to all pages except home
  if (page !== 'home' && options?.pageName && options?.path && options?.origin) {
    schemas.push(getBreadcrumbSchema(options.origin, options.pageName, options.path));
  }

  return JSON.stringify(schemas);
}
