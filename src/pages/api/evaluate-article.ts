import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { setCorsHeaders } from '@/utils/cors';
import { validateUrlOrThrow } from '@/utils/urlValidation';
import { safeFetch, DEFAULT_TIMEOUT } from '@/utils/fetchWithTimeout';
import { stripHtmlTags, extractH1, extractTitle, extractMetaDescription } from '@/utils/htmlUtils';

// Lazy initialization of OpenAI client to prevent module-level errors
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

// Constants
const MAX_CONTENT_LENGTH = 1500;

async function fetchArticleContent(url: string): Promise<string> {
  const response = await safeFetch(url, {
    timeout: DEFAULT_TIMEOUT,
  });
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error(
        `Access denied (${response.status}). This website blocks automated access. ` +
        `Our tool honestly identifies as a bot and respects site policies.`
      );
    }
    throw new Error(`Failed to fetch article: ${response.status} ${response.statusText}`);
  }
  
  return response.text();
}

/**
 * Safely parse JSON with error handling
 */
function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return fallback;
  }
}

interface SeoRecommendations {
  recommendedH1?: string;
  recommendedMetaTitle?: string;
  recommendedMetaDescription?: string;
}

interface SentimentAnalysis {
  type?: 'positive' | 'neutral' | 'negative';
  explanation?: string;
}

interface ArticleResult {
  currentH1: string;
  currentMetaTitle: string;
  currentMetaDescription: string;
  recommendedH1?: string;
  recommendedMetaTitle?: string;
  recommendedMetaDescription?: string;
  sentiment?: SentimentAnalysis;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS
  const isPreflightHandled = setCorsHeaders(req, res);
  if (isPreflightHandled) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, includeSentiment } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Validate URL to prevent SSRF attacks
  let sanitizedUrl: string;
  try {
    sanitizedUrl = validateUrlOrThrow(url);
  } catch (error) {
    return res.status(400).json({ 
      error: error instanceof Error ? error.message : 'Invalid URL' 
    });
  }

  try {
    // Fetch article content
    const html = await fetchArticleContent(sanitizedUrl);

    // Extract metadata using utilities
    const currentH1 = extractH1(html);
    const currentMetaTitle = extractTitle(html);
    const currentMetaDescription = extractMetaDescription(html);

    // Build the base result with current metadata
    const result: ArticleResult = {
      currentH1,
      currentMetaTitle,
      currentMetaDescription,
    };

    // Get OpenAI client (may be null if no API key)
    const client = getOpenAIClient();

    if (client) {
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

      const seoCompletion = await client.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: seoPrompt }],
        temperature: 0.7,
      });

      const seoContent = seoCompletion.choices[0].message?.content || '{}';
      const seoRecommendations = safeJsonParse<SeoRecommendations>(seoContent, {});
      
      result.recommendedH1 = seoRecommendations.recommendedH1;
      result.recommendedMetaTitle = seoRecommendations.recommendedMetaTitle;
      result.recommendedMetaDescription = seoRecommendations.recommendedMetaDescription;

      // Add sentiment analysis if requested
      if (includeSentiment) {
        // Extract main content using utility
        const bodyContent = stripHtmlTags(html).slice(0, MAX_CONTENT_LENGTH);

        const sentimentPrompt = `Analyze the sentiment of this article excerpt and explain why. Return in JSON format with 'type' (positive/neutral/negative) and 'explanation':

${bodyContent}

Example response:
{
  "type": "positive",
  "explanation": "The article maintains an optimistic tone, emphasizing benefits and opportunities..."
}`;

        const sentimentCompletion = await client.chat.completions.create({
          model: "gpt-4",
          messages: [{ role: "user", content: sentimentPrompt }],
          temperature: 0.7,
        });

        const sentimentContent = sentimentCompletion.choices[0].message?.content || '{}';
        const sentimentAnalysis = safeJsonParse<SentimentAnalysis>(sentimentContent, {});
        result.sentiment = sentimentAnalysis;
      }
    } else {
      // No OpenAI API key - provide basic analysis only
      result.recommendedH1 = 'AI recommendations require OPENAI_API_KEY';
      result.recommendedMetaTitle = 'Configure OPENAI_API_KEY for AI suggestions';
      result.recommendedMetaDescription = 'To get AI-powered SEO recommendations, please configure the OPENAI_API_KEY environment variable.';
      
      if (includeSentiment) {
        result.sentiment = {
          type: 'neutral',
          explanation: 'Sentiment analysis requires OPENAI_API_KEY to be configured.',
        };
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error processing request:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return res.status(500).json({
      error: 'Failed to analyze article',
      details: errorMessage,
      ...(process.env.NODE_ENV === 'development' && error instanceof Error && { stack: error.stack })
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
