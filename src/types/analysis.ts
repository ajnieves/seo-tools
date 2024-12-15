export interface Entity {
  name: string;
  type: string;
  salience: number;
  mentions: number;
  confidence: number;
  category?: string;
  context?: string;
  htmlContext?: string;
  relationships?: Array<{
    entity: string;
    type: string;
    strength: number;
  }>;
}

export interface EntityMetadata {
  url: string;
  entityCount: number;
  contentLength: number;
  timestamp: string;
  processedStructure: {
    title: string[];
    headings: string[];
    paragraphs: string[];
    lists: string[];
  };
  entityDistribution: {
    byType: Record<string, number>;
    byCategory?: Record<string, number>;
  };
}

export interface AnalysisResult {
  entities: Entity[];
  sentiment: string;
  sentimentConfidence: number;
  sentimentExplanation: string;
  metadata: EntityMetadata;
}

export interface EntityContext {
  prevWords: string[];
  nextWords: string[];
  sentence: string;
  paragraph: string;
  htmlTag?: string;
}

export type EntityType = 
  | 'PERSON'
  | 'ORGANIZATION'
  | 'LOCATION'
  | 'PRODUCT'
  | 'BRAND'
  | 'TECHNOLOGY'
  | 'EVENT'
  | 'DATE'
  | 'MISC';

export interface EntityRelationship {
  sourceEntity: string;
  targetEntity: string;
  relationType: string;
  confidence: number;
  context: string;
}
