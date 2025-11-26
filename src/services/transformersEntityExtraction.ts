/**
 * Entity Extraction using HuggingFace Transformers
 * Provides professional-grade Named Entity Recognition (NER) with zero API costs
 */

import { pipeline, TokenClassificationPipeline } from '@huggingface/transformers';
import { Entity, EntityType } from '@/types/analysis';

// Singleton pattern for model caching
let nerPipeline: TokenClassificationPipeline | null = null;
let isInitializing = false;
let initPromise: Promise<TokenClassificationPipeline> | null = null;

/**
 * Initialize the NER pipeline (loads model on first call, caches afterward)
 * @returns Promise<TokenClassificationPipeline>
 */
async function initializeNER(): Promise<TokenClassificationPipeline> {
  // Return cached pipeline if available
  if (nerPipeline) {
    return nerPipeline;
  }

  // If already initializing, wait for that promise
  if (isInitializing && initPromise) {
    return initPromise;
  }

  // Start initialization
  isInitializing = true;
  initPromise = (async () => {
    console.log('[Transformers NER] Initializing model...');
    
    // Use bert-base-NER model (good balance of speed and accuracy)
    // Alternative: 'Xenova/roberta-large-ner-english' for higher accuracy
    nerPipeline = await pipeline(
      'token-classification',
      'Xenova/bert-base-NER',
      { revision: 'default' }
    ) as TokenClassificationPipeline;
    
    console.log('[Transformers NER] Model initialized successfully');
    isInitializing = false;
    return nerPipeline;
  })();

  return initPromise;
}

/**
 * Raw token result from HuggingFace pipeline
 */
interface RawToken {
  entity: string;      // B-PER, I-PER, B-ORG, I-ORG, B-LOC, I-LOC, B-MISC, I-MISC
  word: string;        // The actual token/word
  score: number;       // Confidence score (0-1)
  index: number;       // Token index
  start: number;       // Character start position
  end: number;         // Character end position
}

/**
 * Map HuggingFace entity labels to our EntityType
 */
function mapHuggingFaceType(label: string): EntityType {
  switch (label) {
    case 'PER':
      return 'PERSON';
    case 'ORG':
      return 'ORGANIZATION';
    case 'LOC':
      return 'LOCATION';
    case 'MISC':
      return 'MISC';
    default:
      return 'MISC';
  }
}

/**
 * Normalize entity names for deduplication
 */
function normalizeEntityName(name: string): string {
  // Clean up the name
  name = name.trim();
  
  // Remove common prefixes from politician names
  name = name.replace(/^(President|Senator|Representative|Governor|Dr\.?|Mr\.?|Mrs\.?|Ms\.?)\s+/i, '');
  
  // Remove trailing punctuation
  name = name.replace(/[,;:.!?]+$/g, '');
  
  // Normalize whitespace
  name = name.replace(/\s+/g, ' ');
  
  return name;
}

/**
 * Check if entity name should be filtered out
 */
function shouldFilterEntity(name: string): boolean {
  // Filter very short entities
  if (name.length < 3) return true;
  
  // Filter common stop words
  const stopWords = new Set(['But', 'And', 'The', 'This', 'That', 'When', 'Where', 'What', 'Who', 'How', 'Why']);
  if (stopWords.has(name)) return true;
  
  // Filter navigation-like content
  if (/^(See|View|Click|Read|Load|Show|Download|Subscribe|Sign|Login)/i.test(name)) return true;
  
  // Filter if it's all uppercase (likely an abbreviation we missed)
  if (name.length < 8 && name === name.toUpperCase()) return true;
  
  return false;
}

/**
 * Extract entities from text using HuggingFace Transformers NER
 * @param text - Plain text to analyze
 * @returns Promise<Entity[]> - Array of extracted entities
 */
export async function extractEntitiesWithTransformers(text: string): Promise<Entity[]> {
  try {
    const ner = await initializeNER();
    
    // Limit text length to prevent memory issues and improve performance
    // Most NER models have a max token limit of ~512 tokens
    const MAX_CHARS = 5000;
    const truncatedText = text.substring(0, MAX_CHARS);
    
    console.log(`[Transformers NER] Processing ${truncatedText.length} characters...`);
    
    // Run NER pipeline
    const rawResults = await ner(truncatedText, {
      aggregation_strategy: 'simple', // Automatically groups subwords
    }) as RawToken[];
    
    console.log(`[Transformers NER] Found ${rawResults.length} raw tokens`);
    
    // Group and deduplicate entities
    const entityMap = new Map<string, {
      type: EntityType;
      mentions: number;
      scores: number[];
      positions: number[];
    }>();
    
    rawResults.forEach((token) => {
      // Extract entity label (PER, ORG, LOC, MISC)
      const label = token.entity.includes('-') 
        ? token.entity.split('-')[1] 
        : token.entity;
      
      const entityType = mapHuggingFaceType(label);
      
      // Clean the entity name
      let entityName = token.word
        .replace(/^##/g, '')  // Remove BERT subword markers
        .replace(/^Ġ/g, '')   // Remove GPT subword markers
        .trim();
      
      // Normalize the name
      entityName = normalizeEntityName(entityName);
      
      // Filter out unwanted entities
      if (shouldFilterEntity(entityName)) {
        return;
      }
      
      // Add or update entity in map
      if (entityMap.has(entityName)) {
        const existing = entityMap.get(entityName)!;
        existing.mentions++;
        existing.scores.push(token.score);
        existing.positions.push(token.start);
      } else {
        entityMap.set(entityName, {
          type: entityType,
          mentions: 1,
          scores: [token.score],
          positions: [token.start]
        });
      }
    });
    
    // Convert to Entity array
    const entities: Entity[] = Array.from(entityMap.entries()).map(([name, data]) => {
      const avgConfidence = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
      
      return {
        name,
        type: data.type,
        mentions: data.mentions,
        confidence: avgConfidence,
        salience: 0, // Will be calculated below
        relationships: []
      };
    });
    
    // Calculate salience scores
    const totalMentions = entities.reduce((sum, e) => sum + e.mentions, 0);
    entities.forEach(entity => {
      entity.salience = totalMentions > 0 ? entity.mentions / totalMentions : 0;
    });
    
    // Sort by salience and limit results
    const sortedEntities = entities
      .sort((a, b) => {
        // Primary sort: salience
        if (b.salience !== a.salience) {
          return b.salience - a.salience;
        }
        // Secondary sort: confidence
        return b.confidence - a.confidence;
      })
      .slice(0, 30);
    
    console.log(`[Transformers NER] Extracted ${sortedEntities.length} unique entities`);
    
    return sortedEntities;
    
  } catch (error) {
    console.error('[Transformers NER] Error:', error);
    throw new Error('Failed to extract entities using transformers model');
  }
}

/**
 * Check if the transformers model is initialized
 * @returns boolean
 */
export function isModelInitialized(): boolean {
  return nerPipeline !== null;
}

/**
 * Get model initialization status
 * @returns Object with status information
 */
export function getModelStatus(): { initialized: boolean; initializing: boolean } {
  return {
    initialized: nerPipeline !== null,
    initializing: isInitializing
  };
}

