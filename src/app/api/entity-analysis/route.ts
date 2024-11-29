import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const headers = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store'
};

async function fetchAndExtractContent(url: string): Promise<string> {
  console.log(`[Entity Analysis] Fetching URL: ${url}`);
  try {
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
    return cleanContent;
  } catch (error) {
    console.error('[Entity Analysis] Error fetching URL:', error);
    throw error;
  }
}

function analyzeSentiment(text: string): string {
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

  const words = text.toLowerCase().split(/\W+/);
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (positiveWords.has(word)) positiveCount++;
    if (negativeWords.has(word)) negativeCount++;
  });

  const total = positiveCount + negativeCount;
  if (total === 0) return 'Neutral';

  const ratio = (positiveCount - negativeCount) / total;
  console.log(`[Entity Analysis] Sentiment analysis complete - Positive: ${positiveCount}, Negative: ${negativeCount}, Ratio: ${ratio}`);

  if (ratio > 0.25) return 'Positive';
  if (ratio < -0.25) return 'Negative';
  if (ratio >= 0.1) return 'Optimistic';
  if (ratio <= -0.1) return 'Critical';
  return 'Balanced';
}

function extractEntities(text: string) {
  console.log('[Entity Analysis] Starting entity extraction');
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const words = text.split(/\s+/);
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
  return entityArray;
}

export async function POST(request: Request) {
  console.log('[Entity Analysis] Received POST request');
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400, headers }
      );
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400, headers }
      );
    }

    const content = await fetchAndExtractContent(url);
    const entities = extractEntities(content);
    const sentiment = analyzeSentiment(content);

    console.log('[Entity Analysis] Analysis complete:', { entityCount: entities.length, sentiment });

    return NextResponse.json(
      { 
        success: true,
        entities,
        sentiment,
        metadata: {
          url,
          entityCount: entities.length,
          timestamp: new Date().toISOString()
        }
      },
      { headers }
    );
  } catch (error) {
    console.error('[Entity Analysis] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to analyze URL'
      },
      { status: 500, headers }
    );
  }
}
