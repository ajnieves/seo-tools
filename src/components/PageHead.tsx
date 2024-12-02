import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPageMetadata } from '@/utils/metadata';
import { getPageSchema } from '@/utils/schema';

interface PageHeadProps {
  page: string;
}

export default function PageHead({ page }: PageHeadProps) {
  const router = useRouter();
  const metadata = getPageMetadata(page as any);
  
  // Get the current absolute URL
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = `${origin}${router.asPath}`;

  const schema = getPageSchema(page as any, {
    pageName: metadata.title,
    path: router.asPath,
    origin
  });

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords.join(', ')} />
      <meta name="robots" content={metadata.robots} />
      
      {/* Self-referencing Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" />
      <meta name="google-site-verification" content="[your-verification-code]" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={`${origin}/favicon.svg`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={`${origin}/favicon.svg`} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
        key="schema-data"
      />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
  );
}
