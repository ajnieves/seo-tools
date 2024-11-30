import Head from 'next/head';
import { getPageMetadata } from '@/utils/metadata';
import { getPageSchema } from '@/utils/schema';

interface PageHeadProps {
  page: string;
}

export default function PageHead({ page }: PageHeadProps) {
  const metadata = getPageMetadata(page as any);
  const schema = getPageSchema(page as any, {
    pageName: metadata.title,
    path: metadata.canonicalUrl.replace('https://seo-tools.vercel.app', '')
  });

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metadata.canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.canonicalUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metadata.canonicalUrl} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
        key="schema-data"
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
