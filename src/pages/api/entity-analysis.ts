import type { NextApiRequest, NextApiResponse } from 'next';
import { AnalysisResult, EntityMetadata, Entity } from '@/types/analysis';
import { extractEntities } from '@/services/entityExtraction';

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
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
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

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    console.log('Analyzing URL:', url);

    // Handle data URLs for testing
    let text: string;
    let html: string;
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
      }

      html = await response.text();
      console.log('Fetched HTML length:', html.length);
      
      // Clean HTML to extract text
      text = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      console.log('Cleaned text length:', text.length);
      console.log('Sample text:', text.substring(0, 200) + '...');
    } catch (error) {
      console.error('Error fetching URL:', error);
      return res.status(400).json({ 
        error: error instanceof Error ? error.message : 'Failed to fetch URL'
      });
    }

    // Extract document structure
    const processedStructure: EntityMetadata['processedStructure'] = {
      title: [],
      headings: [],
      paragraphs: [],
      lists: []
    };

    try {
      // Extract title
      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
      if (titleMatch) {
        processedStructure.title.push(titleMatch[1].trim());
      }

      // Extract headings
      const headings = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi);
      if (headings) {
        processedStructure.headings = headings.map(h => 
          h.replace(/<[^>]+>/g, '').trim()
        );
      }

      // Extract paragraphs
      const paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/gi);
      if (paragraphs) {
        processedStructure.paragraphs = paragraphs.map(p => 
          p.replace(/<[^>]+>/g, '').trim()
        );
      }

      // Extract lists
      const lists = html.match(/<li[^>]*>(.*?)<\/li>/gi);
      if (lists) {
        processedStructure.lists = lists.map(li => 
          li.replace(/<[^>]+>/g, '').trim()
        );
      }

      console.log('Document structure:', {
        titleCount: processedStructure.title.length,
        headingsCount: processedStructure.headings.length,
        paragraphsCount: processedStructure.paragraphs.length,
        listsCount: processedStructure.lists.length
      });
    } catch (error) {
      console.error('Error processing document structure:', error);
    }

    // Extract entities
    let entities: Entity[] = [];
    try {
      entities = extractEntities(text, processedStructure);
      console.log('Extracted entities count:', entities.length);
    } catch (error) {
      console.error('Error extracting entities:', error);
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
    let sentimentPhrases: string[] = [];

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
        url,
        entityCount: entities.length,
        contentLength: text.length,
        timestamp: new Date().toISOString(),
        processedStructure,
        entityDistribution
      }
    };

    console.log('Analysis complete');
    return res.status(200).json(result);
  } catch (error) {
    console.error('[Entity Analysis] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to analyze content'
    });
  }
}
