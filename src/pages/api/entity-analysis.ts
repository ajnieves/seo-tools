import type { NextApiRequest, NextApiResponse } from 'next';
import { Entity, AnalysisResult, EntityMetadata, EntityType } from '@/types/analysis';

function extractEntities(text: string, htmlStructure: EntityMetadata['processedStructure']): Entity[] {
  // Split text into sentences and words
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const entities: Record<string, Entity> = {};

  // Common organization suffixes and prefixes
  const orgIndicators = ['Inc', 'Corp', 'LLC', 'Ltd', 'Company', 'Association', 'Institute', 'University', 'College'];
  const locationIndicators = ['in', 'at', 'from', 'to', 'near'];

  sentences.forEach((sentence, sentenceIndex) => {
    // Split sentence into words, keeping punctuation
    const words = sentence.trim().split(/\s+/);
    
    for (let i = 0; i < words.length; i++) {
      let word = words[i].trim();
      
      // Skip small words and numbers
      if (word.length < 2 || /^\d+$/.test(word)) continue;

      // Check for capitalized words (potential entities)
      if (/^[A-Z]/.test(word)) {
        let entityName = word;
        let entityType: EntityType = 'MISC';
        let j = i + 1;

        // Look ahead for multi-word entities
        while (j < words.length && /^[A-Z]/.test(words[j])) {
          entityName += ' ' + words[j];
          j++;
        }

        // Determine entity type and confidence
        let confidence = 0.7;
        let category: string | undefined;
        let context = sentence;

        // Check if entity appears in headings (higher importance)
        const inHeading = htmlStructure.headings.some(h => h.includes(entityName));
        if (inHeading) {
          confidence += 0.1;
        }

        // Check if entity appears in title (highest importance)
        const inTitle = htmlStructure.title.some(t => t.includes(entityName));
        if (inTitle) {
          confidence += 0.2;
        }

        // Determine type based on context
        if (orgIndicators.some(indicator => entityName.includes(indicator))) {
          entityType = 'ORGANIZATION';
          confidence += 0.1;
        } else if (locationIndicators.includes(words[i-1]?.toLowerCase())) {
          entityType = 'LOCATION';
          confidence += 0.1;
        } else if (j - i === 2 || j - i === 3) { // 2-3 word capitalized phrases likely names
          entityType = 'PERSON';
          confidence += 0.1;
        }

        // Calculate salience based on position and frequency
        const positionWeight = 1 - (sentenceIndex / sentences.length) * 0.5; // Earlier mentions weighted more
        const key = `${entityName}|${entityType}`;

        if (entities[key]) {
          entities[key].mentions++;
          entities[key].salience = Math.min(0.95, entities[key].salience + 0.1);
          entities[key].confidence = Math.min(0.95, entities[key].confidence + 0.05);
        } else {
          entities[key] = {
            name: entityName,
            type: entityType,
            mentions: 1,
            salience: Math.min(0.9, 0.3 + positionWeight),
            confidence: Math.min(0.95, confidence),
            category,
            context,
            htmlContext: inTitle ? 'title' : inHeading ? 'heading' : 'content'
          };
        }

        i = j - 1; // Skip processed words
      }
    }
  });

  // Convert to array and sort by salience
  return Object.values(entities)
    .sort((a, b) => b.salience - a.salience)
    .slice(0, 50); // Limit to top 50 entities
}

function analyzeSentiment(text: string): { type: string; confidence: number; explanation: string } {
  const words = text.toLowerCase().split(/\s+/);
  
  // Enhanced sentiment word lists
  const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'positive', 'success',
    'innovative', 'beneficial', 'effective', 'efficient', 'improved', 'leading',
    'best', 'outstanding', 'superior', 'exceptional', 'perfect', 'ideal'
  ];
  
  const negativeWords = [
    'bad', 'poor', 'terrible', 'awful', 'negative', 'failure', 'worst',
    'ineffective', 'inefficient', 'problematic', 'difficult', 'challenging',
    'disappointing', 'inferior', 'inadequate', 'flawed', 'defective'
  ];

  const intensifiers = ['very', 'highly', 'extremely', 'particularly', 'especially'];
  
  let positiveScore = 0;
  let negativeScore = 0;
  let sentimentWords: string[] = [];
  let contextPhrases: string[] = [];

  // Analyze sentiment with context
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let multiplier = 1;

    // Check for intensifiers
    if (i > 0 && intensifiers.includes(words[i-1])) {
      multiplier = 1.5;
    }

    if (positiveWords.includes(word)) {
      positiveScore += multiplier;
      sentimentWords.push(word);
      
      // Capture surrounding context
      const context = words.slice(Math.max(0, i-3), i+4).join(' ');
      contextPhrases.push(context);
    }
    if (negativeWords.includes(word)) {
      negativeScore += multiplier;
      sentimentWords.push(word);
      
      const context = words.slice(Math.max(0, i-3), i+4).join(' ');
      contextPhrases.push(context);
    }
  }

  const total = positiveScore + negativeScore;
  if (total === 0) {
    return {
      type: 'neutral',
      confidence: 0.7,
      explanation: `The content appears to be neutral in tone, focusing primarily on factual information without strong emotional language.`
    };
  }

  const positiveRatio = positiveScore / total;
  const confidence = Math.max(0.6, Math.min(0.95, total / 20));
  const uniqueContexts = [...new Set(contextPhrases)].slice(0, 2);

  if (positiveScore > negativeScore) {
    return {
      type: 'positive',
      confidence,
      explanation: `The content demonstrates a positive sentiment (${(positiveRatio * 100).toFixed(1)}% positive) through phrases like "${uniqueContexts.join('" and "')}", indicating an optimistic and favorable tone.`
    };
  } else if (negativeScore > positiveScore) {
    return {
      type: 'negative',
      confidence,
      explanation: `The content exhibits a negative sentiment (${((1 - positiveRatio) * 100).toFixed(1)}% negative) through phrases like "${uniqueContexts.join('" and "')}", suggesting a critical or unfavorable perspective.`
    };
  }

  return {
    type: 'neutral',
    confidence: 0.7,
    explanation: `The content shows a balanced sentiment with equal positive and negative expressions, including contexts like "${uniqueContexts.join('" and "')}".`
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Fetch the content from the URL
    const response = await fetch(url);
    const html = await response.text();

    // Extract text and structure from HTML
    const processedStructure: EntityMetadata['processedStructure'] = {
      title: [],
      headings: [],
      paragraphs: [],
      lists: []
    };

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

    // Clean the full text
    const text = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Extract entities
    const entities = extractEntities(text, processedStructure);

    // Calculate entity distribution
    const entityDistribution = {
      byType: entities.reduce((acc: Record<string, number>, entity) => {
        acc[entity.type] = (acc[entity.type] || 0) + 1;
        return acc;
      }, {}),
      byCategory: entities.reduce((acc: Record<string, number>, entity) => {
        if (entity.category) {
          acc[entity.category] = (acc[entity.category] || 0) + 1;
        }
        return acc;
      }, {})
    };

    // Analyze sentiment
    const sentimentResult = analyzeSentiment(text);

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

    return res.status(200).json(result);
  } catch (error) {
    console.error('[Entity Analysis] Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to analyze content'
    });
  }
}
