'use client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPageMetadata, metadata } from '@/utils/metadata';

export interface PageHeadProps {
  page: keyof typeof metadata;
}

export default function PageHead({ page }: PageHeadProps) {
  const router = useRouter();
  const pageMetadata = getPageMetadata(page);
  
  // Get the current absolute URL
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = `${origin}${router.asPath}`;

  return (
    <Head>
      <title>{pageMetadata.title}</title>
      <meta name="description" content={pageMetadata.description} />
      <meta name="keywords" content={pageMetadata.keywords.join(', ')} />
      <meta name="robots" content={pageMetadata.robots} />
      
      {/* Self-referencing Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" />
      <meta name="google-site-verification" content="[your-verification-code]" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageMetadata.title} />
      <meta property="og:description" content={pageMetadata.description} />
      <meta property="og:image" content={`${origin}/favicon.svg`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={pageMetadata.title} />
      <meta name="twitter:description" content={pageMetadata.description} />
      <meta name="twitter:image" content={`${origin}/favicon.svg`} />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
