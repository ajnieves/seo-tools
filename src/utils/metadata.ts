export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
}

interface SiteMetadata {
  [key: string]: PageMetadata;
}

export const metadata: SiteMetadata = {
  home: {
    title: 'SEO Tools - Comprehensive SEO Toolkit',
    description: 'A suite of powerful SEO tools to help optimize your website, analyze content, and improve search engine visibility.',
    keywords: ['SEO tools', 'website optimization', 'SEO analysis', 'search engine optimization'],
  },
  entityAnalyzer: {
    title: 'Entity Analyzer - Extract and Analyze Named Entities',
    description: 'Analyze web content to identify and extract named entities, understand key subjects, organizations, and locations.',
    keywords: ['entity analysis', 'named entity recognition', 'content analysis', 'SEO analysis'],
  },
  sitemapGenerator: {
    title: 'XML Sitemap Generator - Create SEO-friendly Sitemaps',
    description: 'Generate XML sitemaps to help search engines better understand and index your website structure.',
    keywords: ['sitemap generator', 'XML sitemap', 'SEO sitemap', 'website indexing'],
  },
  rssParser: {
    title: 'RSS Feed Parser - Validate and Analyze RSS Feeds',
    description: 'Parse and validate RSS feeds to ensure proper syndication and content distribution.',
    keywords: ['RSS parser', 'feed validator', 'RSS feed analysis', 'content syndication'],
  },
  robotsTester: {
    title: 'Robots.txt Tester - Validate Crawler Access Rules',
    description: 'Test and validate your robots.txt file to ensure proper search engine crawler access control.',
    keywords: ['robots.txt', 'crawler access', 'SEO testing', 'search engine crawlers'],
  },
  percentageCalculator: {
    title: 'Percentage Calculator - SEO Metrics Calculator',
    description: 'Calculate percentages for SEO metrics, conversion rates, and performance indicators.',
    keywords: ['percentage calculator', 'SEO metrics', 'conversion calculator', 'performance metrics'],
  },
};

export function getPageMetadata(page: keyof typeof metadata): PageMetadata {
  return metadata[page];
}
