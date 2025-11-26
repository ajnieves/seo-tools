export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  robots: string;
  tool?: {
    name: string;
    heading: string;
    subheading: string;
    features: string[];
    benefits: string[];
  };
}

// Use environment variable for flexibility across environments
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://technicalseotools.io';

const metadataMap: Record<string, PageMetadata> = {
  home: {
    title: 'SEO Tools - Comprehensive SEO Toolkit',
    description: 'A suite of powerful SEO tools to help optimize your website, analyze content, and improve search engine visibility.',
    keywords: ['SEO tools', 'website optimization', 'SEO analysis', 'search engine optimization'],
    canonicalUrl: `${BASE_URL}`,
    robots: 'index, follow'
  },
  'sitemap-generator': {
    title: 'XML Sitemap Generator - Create SEO-friendly Sitemaps',
    description: 'Generate XML sitemaps to help search engines better understand and index your website structure.',
    keywords: ['sitemap generator', 'XML sitemap', 'SEO sitemap', 'website indexing'],
    canonicalUrl: `${BASE_URL}/sitemap-generator`,
    robots: 'index, follow'
  },
  'rss-parser': {
    title: 'RSS Feed Parser - Validate and Analyze RSS Feeds',
    description: 'Parse and validate RSS feeds to ensure proper syndication and content distribution.',
    keywords: ['RSS parser', 'feed validator', 'RSS feed analysis', 'content syndication'],
    canonicalUrl: `${BASE_URL}/rss-parser`,
    robots: 'index, follow'
  },
  'robots-tester': {
    title: 'Robots.txt Tester - Validate Crawler Access Rules',
    description: 'Test and validate your robots.txt file to ensure proper search engine crawler access control.',
    keywords: ['robots.txt', 'crawler access', 'SEO testing', 'search engine crawlers'],
    canonicalUrl: `${BASE_URL}/robots-tester`,
    robots: 'index, follow'
  },
  'percentage-calculator': {
    title: 'Percentage Calculator - SEO Metrics Calculator',
    description: 'Calculate percentages for SEO metrics, conversion rates, and performance indicators.',
    keywords: ['percentage calculator', 'SEO metrics', 'conversion calculator', 'performance metrics'],
    canonicalUrl: `${BASE_URL}/percentage-calculator`,
    robots: 'index, follow'
  },
  'article-evaluator': {
    title: 'Article Evaluator - SEO Content Analysis',
    description: 'Analyze your articles for SEO optimization with AI-powered recommendations.',
    keywords: ['article evaluator', 'content analysis', 'SEO content', 'article optimization'],
    canonicalUrl: `${BASE_URL}/article-evaluator`,
    robots: 'index, follow'
  },
  'entity-analyzer': {
    title: 'Entity Analyzer - Named Entity Recognition',
    description: 'Extract and analyze named entities from web content for better SEO understanding.',
    keywords: ['entity analyzer', 'NER', 'named entity recognition', 'content entities'],
    canonicalUrl: `${BASE_URL}/entity-analyzer`,
    robots: 'index, follow'
  }
};

// Export for backwards compatibility
export const metadata = metadataMap;

// Export the type for page keys
export type PageKey = keyof typeof metadataMap;

export function getPageMetadata(page: string): PageMetadata | undefined {
  return metadataMap[page];
}

export function getToolMetadata(page: string): PageMetadata['tool'] | undefined {
  return metadataMap[page]?.tool;
}
