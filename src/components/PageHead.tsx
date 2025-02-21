import Head from 'next/head';

import { getPageMetadata } from '@/utils/metadata';
import { useRouter } from 'next/router';

interface PageHeadProps {
  title?: string;
  description?: string;
}

export default function PageHead({ title, description }: PageHeadProps) {
  const router = useRouter();
  const path = router.pathname === '/' ? 'home' : router.pathname.substring(1);
  const metadata = getPageMetadata(path as any);

  const pageMetadata = {
    title: title || metadata?.title || 'SEO Tools - Web Analysis & Optimization Tools',
    description: description || metadata?.description || 'A collection of powerful SEO tools for web analysis and optimization.',
    canonicalUrl: metadata?.canonicalUrl,
    keywords: [
      'SEO tools',
      'web analysis',
      'SEO optimization',
      'website analysis',
      'SEO checker',
      'entity analysis',
      'named entity recognition'
    ],
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1',
    charset: 'utf-8'
  };

  return (
    <Head>
      <title>{pageMetadata.title}</title>
      <meta name="description" content={pageMetadata.description} />
      <meta name="keywords" content={pageMetadata.keywords.join(', ')} />
      <meta name="robots" content={pageMetadata.robots} />
      <meta name="viewport" content={pageMetadata.viewport} />
      <meta charSet={pageMetadata.charset} />
      <meta name="google-site-verification" content="NGx9xLCGuT_79aJ944wJVzF45g78u6marGFNFxI9V9U" />
      <link rel="icon" href="/favicon.ico" />
      {pageMetadata.canonicalUrl && (
        <link rel="canonical" href={pageMetadata.canonicalUrl} />
      )}
    </Head>
  );
}
