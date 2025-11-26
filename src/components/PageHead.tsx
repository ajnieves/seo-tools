import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPageMetadata } from '@/utils/metadata';
import { getPageSchema, schema } from '@/utils/schema';

interface PageHeadProps {
  title?: string;
  description?: string;
  image?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://technicalseotools.io';

// Map route paths to schema keys
const routeToSchemaKey: Record<string, keyof typeof schema> = {
  '/': 'home',
  '/sitemap-generator': 'sitemapGenerator',
  '/rss-parser': 'rssParser',
  '/robots-tester': 'robotsTester',
  '/percentage-calculator': 'percentageCalculator',
  '/article-evaluator': 'articleEvaluator',
  '/entity-analyzer': 'entityAnalyzer',
};

// Map route paths to page names for breadcrumbs
const routeToPageName: Record<string, string> = {
  '/': 'Home',
  '/sitemap-generator': 'XML Sitemap Generator',
  '/rss-parser': 'RSS Feed Parser',
  '/robots-tester': 'Robots.txt Tester',
  '/percentage-calculator': 'Percentage Calculator',
  '/article-evaluator': 'Article Evaluator',
  '/entity-analyzer': 'Entity Analyzer',
};

export default function PageHead({ title, description, image }: PageHeadProps) {
  const router = useRouter();
  const path = router.pathname === '/' ? 'home' : router.pathname.substring(1);
  const metadata = getPageMetadata(path);

  const pageMetadata = {
    title: title || metadata?.title || 'SEO Tools - Web Analysis & Optimization Tools',
    description: description || metadata?.description || 'A collection of powerful SEO tools for web analysis and optimization.',
    canonicalUrl: metadata?.canonicalUrl || `${BASE_URL}${router.pathname}`,
    image: image || `${BASE_URL}/favicon.svg`,
    keywords: metadata?.keywords || [
      'SEO tools',
      'web analysis',
      'SEO optimization',
      'website analysis',
      'SEO checker'
    ],
  };

  // Get schema key for current page
  const schemaKey = routeToSchemaKey[router.pathname] || 'home';
  const pageName = routeToPageName[router.pathname] || 'SEO Tools';
  
  // Generate JSON-LD structured data
  const structuredData = getPageSchema(schemaKey, {
    pageName,
    path: router.pathname,
    origin: BASE_URL
  });

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageMetadata.title}</title>
      <meta name="title" content={pageMetadata.title} />
      <meta name="description" content={pageMetadata.description} />
      <meta name="keywords" content={pageMetadata.keywords.join(', ')} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Google Site Verification */}
      <meta name="google-site-verification" content="NGx9xLCGuT_79aJ944wJVzF45g78u6marGFNFxI9V9U" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageMetadata.canonicalUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageMetadata.canonicalUrl} />
      <meta property="og:title" content={pageMetadata.title} />
      <meta property="og:description" content={pageMetadata.description} />
      <meta property="og:image" content={pageMetadata.image} />
      <meta property="og:site_name" content="Technical SEO Tools" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageMetadata.canonicalUrl} />
      <meta name="twitter:title" content={pageMetadata.title} />
      <meta name="twitter:description" content={pageMetadata.description} />
      <meta name="twitter:image" content={pageMetadata.image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Technical SEO Tools" />
      <meta name="theme-color" content="#00E5B0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </Head>
  );
}
