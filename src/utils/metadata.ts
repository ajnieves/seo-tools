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

interface SiteMetadata {
  [key: string]: PageMetadata;
}

const BASE_URL = 'https://technicalseotools.io';

export const metadata: SiteMetadata = {
  home: {
    title: 'SEO Tools - Comprehensive SEO Toolkit',
    description: 'A suite of powerful SEO tools to help optimize your website, analyze content, and improve search engine visibility.',
    keywords: ['SEO tools', 'website optimization', 'SEO analysis', 'search engine optimization'],
    canonicalUrl: `${BASE_URL}`,
    robots: 'index, follow'
  },
  entityAnalyzer: {
    title: 'Entity Analyzer - Extract and Analyze Named Entities | SEO Tools',
    description: 'Extract named entities and analyze sentiment from any webpage using advanced natural language processing. Identify key people, organizations, and locations.',
    keywords: [
      'entity analysis',
      'named entity recognition',
      'sentiment analysis',
      'content analysis',
      'NLP',
      'SEO analysis',
      'text analysis',
      'content optimization',
      'entity extraction',
      'semantic analysis'
    ],
    canonicalUrl: `${BASE_URL}/entity-analyzer`,
    robots: 'index, follow',
    tool: {
      name: 'Entity Analyzer',
      heading: 'Entity Analyzer',
      subheading: 'Extract named entities and analyze sentiment from any webpage using advanced natural language processing.',
      features: [
        'Named Entity Recognition (NER)',
        'Sentiment Analysis',
        'Entity Type Classification',
        'Relevance Scoring',
        'Entity Relationship Analysis',
        'Content Sentiment Evaluation',
        'Entity Frequency Analysis',
        'CSV Export Capability'
      ],
      benefits: [
        'Understand key entities in your content',
        'Analyze content sentiment and tone',
        'Identify important people, organizations, and locations',
        'Measure entity relevance and importance',
        'Optimize content focus and targeting',
        'Improve content quality and relevance',
        'Better understand content relationships',
        'Export data for further analysis'
      ]
    }
  },
  sitemapGenerator: {
    title: 'XML Sitemap Generator - Create SEO-friendly Sitemaps',
    description: 'Generate XML sitemaps to help search engines better understand and index your website structure.',
    keywords: ['sitemap generator', 'XML sitemap', 'SEO sitemap', 'website indexing'],
    canonicalUrl: `${BASE_URL}/sitemap-generator`,
    robots: 'index, follow'
  },
  rssParser: {
    title: 'RSS Feed Parser - Validate and Analyze RSS Feeds',
    description: 'Parse and validate RSS feeds to ensure proper syndication and content distribution.',
    keywords: ['RSS parser', 'feed validator', 'RSS feed analysis', 'content syndication'],
    canonicalUrl: `${BASE_URL}/rss-parser`,
    robots: 'index, follow'
  },
  robotsTester: {
    title: 'Robots.txt Tester - Validate Crawler Access Rules',
    description: 'Test and validate your robots.txt file to ensure proper search engine crawler access control.',
    keywords: ['robots.txt', 'crawler access', 'SEO testing', 'search engine crawlers'],
    canonicalUrl: `${BASE_URL}/robots-tester`,
    robots: 'index, follow'
  },
  percentageCalculator: {
    title: 'Percentage Calculator - SEO Metrics Calculator',
    description: 'Calculate percentages for SEO metrics, conversion rates, and performance indicators.',
    keywords: ['percentage calculator', 'SEO metrics', 'conversion calculator', 'performance metrics'],
    canonicalUrl: `${BASE_URL}/percentage-calculator`,
    robots: 'index, follow'
  },
  articleEvaluator: {
    title: 'Article SEO Evaluator - Analyze and Optimize Content',
    description: 'Evaluate and improve your article\'s SEO by analyzing H1, meta title, and meta description with AI-powered recommendations.',
    keywords: ['article analysis', 'SEO evaluation', 'content optimization', 'meta tags', 'H1 optimization'],
    canonicalUrl: `${BASE_URL}/article-evaluator`,
    robots: 'index, follow'
  }
};

export function getPageMetadata(page: keyof typeof metadata): PageMetadata {
  return metadata[page];
}

export function getToolMetadata(page: keyof typeof metadata): PageMetadata['tool'] | undefined {
  return metadata[page]?.tool;
}
