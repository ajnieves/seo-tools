import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function fetchArticleContent(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }
    const html = await response.text();
    return html;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw new Error('Failed to fetch article content');
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, includeSentiment } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Fetch article content
    const html = await fetchArticleContent(url);

    // Extract metadata using regex
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i);

    const currentH1 = h1Match ? h1Match[1].trim() : '';
    const currentMetaTitle = titleMatch ? titleMatch[1].trim() : '';
    const currentMetaDescription = metaDescMatch ? metaDescMatch[1].trim() : '';

    // Get SEO recommendations from OpenAI
    const seoPrompt = `Analyze and improve the following SEO elements for better search engine visibility:

H1: "${currentH1}"
Meta Title: "${currentMetaTitle}"
Meta Description: "${currentMetaDescription}"

Provide improved versions that:
1. For H1: Maintain topic relevance while being clear and engaging
2. For Meta Title: Stay under 60 characters and include key topic
3. For Meta Description: Stay under 160 characters and be compelling

Return in JSON format:
{
  "recommendedH1": "improved h1",
  "recommendedMetaTitle": "improved title",
  "recommendedMetaDescription": "improved description"
}`;

    const seoCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: seoPrompt }],
      temperature: 0.7,
    });

    const seoRecommendations = JSON.parse(seoCompletion.choices[0].message?.content || '{}');

    let result = {
      currentH1,
      currentMetaTitle,
      currentMetaDescription,
      ...seoRecommendations,
    };

    // Add sentiment analysis if requested
    if (includeSentiment) {
      // Extract main content
      const bodyContent = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 1500);

      const sentimentPrompt = `Analyze the sentiment of this article excerpt and explain why. Return in JSON format with 'type' (positive/neutral/negative) and 'explanation':

${bodyContent}

Example response:
{
  "type": "positive",
  "explanation": "The article maintains an optimistic tone, emphasizing benefits and opportunities..."
}`;

      const sentimentCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: sentimentPrompt }],
        temperature: 0.7,
      });

      const sentimentAnalysis = JSON.parse(sentimentCompletion.choices[0].message?.content || '{}');
      result.sentiment = sentimentAnalysis;
    }

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Error processing request:', error);
    
    // Return detailed error for debugging
    return res.status(500).json({
      error: 'Failed to analyze article',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
