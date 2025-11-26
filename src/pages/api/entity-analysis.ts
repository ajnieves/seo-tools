import type { NextApiRequest, NextApiResponse } from 'next';
import { AnalysisResult, EntityMetadata, Entity } from '@/types/analysis';
import { extractEntities } from '@/services/entityExtraction';
import { extractEntitiesWithTransformers, getModelStatus } from '@/services/transformersEntityExtraction';
import { setCorsHeaders } from '@/utils/cors';
import { validateUrlOrThrow } from '@/utils/urlValidation';
import { safeFetch, DEFAULT_TIMEOUT } from '@/utils/fetchWithTimeout';
import { 
  stripHtmlTags, 
  extractArticleContent,
  extractTitle, 
  extractHeadings, 
  extractParagraphs, 
  extractListItems 
} from '@/utils/htmlUtils';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

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

  try {
    const { url } = req.body;

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

    // Fetch the URL content with timeout
    let text: string;
    let html: string;
    
    try {
      const response = await safeFetch(sanitizedUrl, {
        timeout: DEFAULT_TIMEOUT,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
      }

      html = await response.text();
      
      // Extract main article content (removes nav, footer, etc.)
      text = extractArticleContent(html);
    } catch (error) {
      console.error('[Entity Analysis] Error fetching URL:', error);
      return res.status(400).json({ 
        error: error instanceof Error ? error.message : 'Failed to fetch URL'
      });
    }

    // Extract document structure using utilities
    const processedStructure: EntityMetadata['processedStructure'] = {
      title: [],
      headings: [],
      paragraphs: [],
      lists: []
    };

    try {
      // Extract title
      const title = extractTitle(html);
      if (title) {
        processedStructure.title.push(title);
      }

      // Extract headings
      processedStructure.headings = extractHeadings(html);

      // Extract paragraphs
      processedStructure.paragraphs = extractParagraphs(html);

      // Extract lists
      processedStructure.lists = extractListItems(html);
    } catch (error) {
      console.error('[Entity Analysis] Error processing document structure:', error);
    }

    // Extract entities using Transformers (with fallback to regex)
    let entities: Entity[] = [];
    let extractionMethod = 'transformers';
    
    try {
      // Check if we should use transformers (default: yes)
      const useTransformers = req.body.useTransformers !== false;
      
      if (useTransformers) {
        const modelStatus = getModelStatus();
        if (modelStatus.initializing) {
          console.log('[Entity Analysis] Model is initializing, this may take a moment...');
        }
        
        try {
          entities = await extractEntitiesWithTransformers(text);
          console.log(`[Entity Analysis] Extracted ${entities.length} entities using Transformers`);
        } catch (transformerError) {
          console.warn('[Entity Analysis] Transformers extraction failed, falling back to regex:', transformerError);
          entities = extractEntities(text, processedStructure);
          extractionMethod = 'regex-fallback';
        }
      } else {
        entities = extractEntities(text, processedStructure);
        extractionMethod = 'regex';
      }
    } catch (error) {
      console.error('[Entity Analysis] Error extracting entities:', error);
      return res.status(500).json({ 
        error: 'Failed to extract entities from content'
      });
    }

    // Calculate entity distribution
    const entityDistribution = {
      byType: entities.reduce((acc: Record<string, number>, entity: Entity) => {
        acc[entity.type] = (acc[entity.type] || 0) + 1;
        return acc;
      }, {}),
      byCategory: entities.reduce((acc: Record<string, number>, entity: Entity) => {
        if (entity.category) {
          acc[entity.category] = (acc[entity.category] || 0) + 1;
        }
        return acc;
      }, {})
    };

    // Analyze sentiment
    const words = text.toLowerCase().split(/\s+/);
    
    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'positive', 'success',
      'innovative', 'beneficial', 'effective', 'efficient', 'improved', 'leading',
      'best', 'outstanding', 'superior', 'exceptional', 'perfect', 'ideal',
      'partnership', 'collaboration', 'revolutionize', 'advance', 'enhance'
    ];
    
    const negativeWords = [
      'bad', 'poor', 'terrible', 'awful', 'negative', 'failure', 'worst',
      'ineffective', 'inefficient', 'problematic', 'difficult', 'challenging',
      'disappointing', 'inferior', 'inadequate', 'flawed', 'defective',
      'concern', 'risk', 'threat', 'problem', 'issue', 'decline',
      'shot', 'injured', 'wounded', 'killed', 'attacked', 'fled', 'escaped'
    ];

    const intensifiers = ['very', 'highly', 'extremely', 'particularly', 'especially'];
    
    let positiveScore = 0;
    let negativeScore = 0;
    const sentimentPhrases: string[] = [];

    // Analyze sentiment with context
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      let multiplier = 1;

      if (i > 0 && intensifiers.includes(words[i-1])) {
        multiplier = 1.5;
      }

      if (positiveWords.includes(word)) {
        positiveScore += multiplier;
        const context = words.slice(Math.max(0, i-3), Math.min(words.length, i+4)).join(' ');
        sentimentPhrases.push(context);
      }
      if (negativeWords.includes(word)) {
        negativeScore += multiplier;
        const context = words.slice(Math.max(0, i-3), Math.min(words.length, i+4)).join(' ');
        sentimentPhrases.push(context);
      }
    }

    const total = positiveScore + negativeScore;
    let sentimentResult: {
      type: 'positive' | 'negative' | 'neutral';
      confidence: number;
      explanation: string;
    };
    
    if (total === 0) {
      sentimentResult = {
        type: 'neutral',
        confidence: 0.7,
        explanation: `The content appears to be neutral in tone, focusing primarily on factual information and announcements without strong emotional language.`
      };
    } else {
      const positiveRatio = positiveScore / total;
      const confidence = Math.max(0.6, Math.min(0.95, total / 20));
      const uniquePhrases = [...new Set(sentimentPhrases)].slice(0, 2);

      if (positiveScore > negativeScore) {
        sentimentResult = {
          type: 'positive',
          confidence,
          explanation: `The content demonstrates a positive sentiment (${(positiveRatio * 100).toFixed(1)}% positive) through phrases like "${uniquePhrases.join('" and "')}", indicating an optimistic and forward-looking perspective.`
        };
      } else if (negativeScore > positiveScore) {
        sentimentResult = {
          type: 'negative',
          confidence,
          explanation: `The content exhibits a negative sentiment (${((1 - positiveRatio) * 100).toFixed(1)}% negative) through phrases like "${uniquePhrases.join('" and "')}", suggesting concerns or challenges.`
        };
      } else {
        sentimentResult = {
          type: 'neutral',
          confidence: 0.7,
          explanation: `The content shows a balanced sentiment with equal positive and negative expressions, including contexts like "${uniquePhrases.join('" and "')}".`
        };
      }
    }

    const result: AnalysisResult = {
      entities,
      sentiment: sentimentResult.type,
      sentimentConfidence: sentimentResult.confidence,
      sentimentExplanation: sentimentResult.explanation,
      metadata: {
        url: sanitizedUrl,
        entityCount: entities.length,
        contentLength: text.length,
        timestamp: new Date().toISOString(),
        processedStructure,
        entityDistribution,
        extractionMethod
      }
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error('[Entity Analysis] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to analyze content'
    });
  }
}
