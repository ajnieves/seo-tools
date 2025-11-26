import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
import { setCorsHeaders } from '@/utils/cors';
import { validateUrl, validateUrlOrThrow } from '@/utils/urlValidation';
import { safeFetch } from '@/utils/fetchWithTimeout';

// Configuration constants
const CRAWL_CONFIG = {
  MAX_PAGES: 50,
  TIMEOUT: 15000, // 15 seconds per page
  CONCURRENT_REQUESTS: 3,
} as const;

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  priority?: number;
}

async function crawlPage(
  url: string, 
  baseUrl: string, 
  visited = new Set<string>()
): Promise<SitemapUrl[]> {
  if (visited.has(url)) {
    return [];
  }

  visited.add(url);
  const urls: SitemapUrl[] = [{
    loc: url,
    lastmod: new Date().toISOString(),
    priority: 0.8
  }];

  try {
    const response = await safeFetch(url, {
      timeout: CRAWL_CONFIG.TIMEOUT,
    });

    if (!response.ok) {
      console.warn(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return urls;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const links = $('a[href]')
      .map((_, el) => $(el).attr('href'))
      .get()
      .filter(href => href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
      .map(href => {
        try {
          return new URL(href, baseUrl).href;
        } catch {
          return null;
        }
      })
      .filter((href): href is string => {
        if (href === null) return false;
        if (!href.startsWith(baseUrl)) return false;
        if (href.includes('#')) return false;
        if (visited.has(href)) return false;
        
        // Validate the URL to prevent following dangerous links
        const validation = validateUrl(href);
        return validation.isValid;
      });

    // Limit crawling to prevent timeout
    const uniqueLinks = [...new Set(links)].slice(0, CRAWL_CONFIG.MAX_PAGES);

    for (const link of uniqueLinks) {
      if (visited.size >= CRAWL_CONFIG.MAX_PAGES) break;
      const pageUrls = await crawlPage(link, baseUrl, visited);
      urls.push(...pageUrls);
    }
  } catch (error) {
    console.error(`Error crawling ${url}:`, error);
  }

  return urls;
}

function generateXmlSitemap(urls: SitemapUrl[]): string {
  const urlElements = urls
    .map(url => `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`;
}

/**
 * Escape special XML characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS
  const isPreflightHandled = setCorsHeaders(req, res);
  if (isPreflightHandled) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL
    let sanitizedUrl: string;
    try {
      sanitizedUrl = validateUrlOrThrow(url);
    } catch (error) {
      return res.status(400).json({ 
        error: error instanceof Error ? error.message : 'Invalid URL' 
      });
    }

    const baseUrl = new URL(sanitizedUrl).origin;
    console.log(`[Sitemap Generator] Starting crawl of ${baseUrl}`);

    const urls = await crawlPage(baseUrl, baseUrl);
    console.log(`[Sitemap Generator] Found ${urls.length} URLs`);

    const sitemap = generateXmlSitemap(urls);
    console.log(`[Sitemap Generator] Generated sitemap (${sitemap.length} bytes)`);

    return res.status(200).json({ sitemap });
  } catch (error) {
    console.error('[Sitemap Generator] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate sitemap'
    });
  }
}
