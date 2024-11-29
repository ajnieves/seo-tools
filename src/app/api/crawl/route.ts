import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOToolsCrawler/1.0)',
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function crawlPage(url: string, baseUrl: string, visited = new Set<string>(), maxUrls = 100): Promise<string[]> {
  if (visited.has(url) || visited.size >= maxUrls) return [];
  visited.add(url);

  try {
    const response = await fetchWithTimeout(url);
    if (!response.ok) return [];
    
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return [];

    const html = await response.text();
    const $ = cheerio.load(html);
    const links = new Set<string>();

    // Find all links
    $('a').each((_, element) => {
      const href = $(element).attr('href');
      if (!href) return;

      try {
        let absoluteUrl = href;
        if (href.startsWith('/')) {
          absoluteUrl = new URL(href, baseUrl).toString();
        } else if (!href.startsWith('http')) {
          absoluteUrl = new URL(href, url).toString();
        }

        // Validate URL and check if it belongs to the same domain
        const urlObj = new URL(absoluteUrl);
        const baseUrlObj = new URL(baseUrl);
        
        if (urlObj.hostname === baseUrlObj.hostname && 
            !urlObj.pathname.match(/\.(jpg|jpeg|png|gif|css|js|ico|pdf|doc|docx|zip|rar)$/i) &&
            !urlObj.pathname.includes('?') &&
            !urlObj.pathname.includes('#') &&
            !visited.has(absoluteUrl)) {
          links.add(absoluteUrl);
        }
      } catch (e) {
        // Invalid URL, skip
      }
    });

    const foundUrls = Array.from(links);
    const crawlPromises = foundUrls.map(link => 
      crawlPage(link, baseUrl, visited, maxUrls)
    );

    const nestedUrls = await Promise.all(crawlPromises);
    return [...foundUrls, ...nestedUrls.flat()];
  } catch (error) {
    console.error(`Error crawling ${url}:`, error);
    return [];
  }
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function generateSitemapXml(urls: string[]): string {
  const today = formatDate(new Date());
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.split('/').length <= 4 ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    const baseUrl = new URL(url).origin;
    const urls = await crawlPage(baseUrl, baseUrl);
    const uniqueUrls = Array.from(new Set([baseUrl, ...urls]));
    const sitemap = generateSitemapXml(uniqueUrls);

    return NextResponse.json({ 
      sitemap, 
      urls: uniqueUrls,
      count: uniqueUrls.length 
    });
  } catch (error) {
    console.error('Crawling error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to crawl website' },
      { status: 500 }
    );
  }
}
