import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log(`[Entity Analysis] Fetching URL: ${url}`);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    console.log(`[Entity Analysis] Successfully fetched HTML content (${html.length} bytes)`);
    
    const $ = cheerio.load(html);

    // Remove script and style elements
    $('script').remove();
    $('style').remove();
    $('nav').remove();
    $('header').remove();
    $('footer').remove();

    // Get text content from main content areas
    const mainContent = $('main, article, .content, #content, .main').text() || $('body').text();
    const cleanContent = mainContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();

    console.log(`[Entity Analysis] Extracted clean content (${cleanContent.length} bytes)`);

    // Extract entities
    console.log('[Entity Analysis] Starting entity extraction');
    const sentences = cleanContent.match(/[^.!?]+[.!?]+/g) || [];
    const words = cleanContent.split(/\s+/);
    const entities = new Map();

    sentences.forEach(sentence => {
      const potentialEntities = sentence.match(/[A-Z][a-zA-Z]+/g) || [];
      potentialEntities.forEach(entity => {
        if (entity.length > 1) {
          const count = entities.get(entity) || 0;
          entities.set(entity, count + 1);
        }
      });
    });

    const totalMentions = Array.from(entities.values()).reduce((a, b) => a + b, 0);
    console.log(`[Entity Analysis] Found ${entities.size} unique entities with ${totalMentions} total mentions`);

    const entityArray = Array.from(entities.entries())
      .map(([name, count]) => {
        let type = 'UNKNOWN';
        if (name.match(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)/) || words.includes(`${name}'s`)) {
          type = 'PERSON';
        } else if (name.match(/(Inc\.|Corp\.|Ltd\.|LLC|Company|Technologies)$/)) {
          type = 'ORGANIZATION';
        } else if (name.match(/(land|city|mountain|river|ocean|sea|continent)$/i)) {
          type = 'LOCATION';
        }

        return {
          name,
          type,
          salience: (count as number) / totalMentions
        };
      })
      .sort((a, b) => b.salience - a.salience)
      .slice(0, 10);

    console.log('[Entity Analysis] Entity extraction complete');

    // Analyze sentiment
    console.log('[Entity Analysis] Starting sentiment analysis');
    const positiveWords = new Set([
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
      'happy', 'positive', 'success', 'successful', 'best', 'innovative',
      'improve', 'improved', 'beneficial', 'benefit', 'advantage', 'efficient'
    ]);

    const negativeWords = new Set([
      'bad', 'poor', 'terrible', 'awful', 'horrible', 'negative',
      'fail', 'failure', 'problem', 'difficult', 'worst', 'wrong',
      'damage', 'damaged', 'harmful', 'harm', 'disadvantage', 'inefficient'
    ]);

    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach(word => {
      if (positiveWords.has(word.toLowerCase())) positiveCount++;
      if (negativeWords.has(word.toLowerCase())) negativeCount++;
    });

    const total = positiveCount + negativeCount;
    let sentiment = 'Neutral';

    if (total > 0) {
      const ratio = (positiveCount - negativeCount) / total;
      if (ratio > 0.25) sentiment = 'Positive';
      else if (ratio < -0.25) sentiment = 'Negative';
      else if (ratio >= 0.1) sentiment = 'Optimistic';
      else if (ratio <= -0.1) sentiment = 'Critical';
    }

    console.log(`[Entity Analysis] Sentiment analysis complete - Positive: ${positiveCount}, Negative: ${negativeCount}`);
    console.log('[Entity Analysis] Analysis complete:', { entityCount: entityArray.length, sentiment });

    return res.status(200).json({
      entities: entityArray,
      sentiment,
      metadata: {
        url,
        entityCount: entityArray.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('[Entity Analysis] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to analyze URL'
    });
  }
}
