import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

interface FeedData {
  title: string;
  description: string;
  link: string;
  items: FeedItem[];
}

function cleanText(text: string): string {
  return text
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
}

function parseRSSFeed(xml: string): FeedData {
  const $ = cheerio.load(xml, { xmlMode: true });
  const channel = $('channel');

  const feed: FeedData = {
    title: cleanText(channel.find('title').first().text()),
    description: cleanText(channel.find('description').first().text()),
    link: cleanText(channel.find('link').first().text()),
    items: []
  };

  channel.find('item').each((_, item) => {
    const $item = $(item);
    feed.items.push({
      title: cleanText($item.find('title').first().text()),
      link: cleanText($item.find('link').first().text()),
      description: cleanText($item.find('description').first().text()),
      pubDate: cleanText($item.find('pubDate').first().text())
    });
  });

  return feed;
}

function parseAtomFeed(xml: string): FeedData {
  const $ = cheerio.load(xml, { xmlMode: true });
  const feed = $('feed');

  const feedData: FeedData = {
    title: cleanText(feed.find('title').first().text()),
    description: cleanText(feed.find('subtitle').first().text()),
    link: feed.find('link[rel="alternate"]').attr('href') || 
          feed.find('link[type="text/html"]').attr('href') || 
          feed.find('link').attr('href') || '',
    items: []
  };

  feed.find('entry').each((_, entry) => {
    const $entry = $(entry);
    feedData.items.push({
      title: cleanText($entry.find('title').first().text()),
      link: $entry.find('link[rel="alternate"]').attr('href') || 
            $entry.find('link[type="text/html"]').attr('href') || 
            $entry.find('link').attr('href') || '',
      description: cleanText($entry.find('content').first().text() || 
                           $entry.find('summary').first().text()),
      pubDate: cleanText($entry.find('published').first().text() || 
                        $entry.find('updated').first().text())
    });
  });

  return feedData;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`[RSS Parser] Fetching feed from ${url}`);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOToolsRSSParser/1.0)'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    console.log(`[RSS Parser] Successfully fetched feed (${xml.length} bytes)`);

    let feedData: FeedData;
    if (xml.includes('<rss')) {
      console.log('[RSS Parser] Detected RSS feed format');
      feedData = parseRSSFeed(xml);
    } else if (xml.includes('<feed')) {
      console.log('[RSS Parser] Detected Atom feed format');
      feedData = parseAtomFeed(xml);
    } else {
      throw new Error('Unsupported feed format');
    }

    console.log(`[RSS Parser] Successfully parsed feed with ${feedData.items.length} items`);
    return res.status(200).json(feedData);
  } catch (error) {
    console.error('[RSS Parser] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to parse feed'
    });
  }
}
