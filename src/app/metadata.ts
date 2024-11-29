import { Metadata } from 'next';
import { metadata as metadataConfig, MetadataKey } from './metadata.config';

export function generateMetadata(key: MetadataKey): Metadata {
  const config = metadataConfig[key];
  
  return {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      siteName: 'SEO Tools',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
