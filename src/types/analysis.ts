export type EntityType = 'PERSON' | 'ORGANIZATION' | 'LOCATION' | 'EVENT' | 'TRANSPORT' | 'TECHNOLOGY' | 'MISC';

export interface EntityRelationship {
  entity: string;
  type: 'executive' | 'founder' | 'employee' | 'partnership' | 'collaboration' | 'subsidiary' | 'incident' | 'movement' | 'temporal';
  strength: number;
  context?: string;
  timestamp?: string;
}

export interface Entity {
  name: string;
  type: EntityType;
  mentions: number;
  confidence: number;
  salience: number;
  category?: string;
  context?: string;
  htmlContext?: 'title' | 'heading' | 'content';
  relationships: EntityRelationship[];
  temporalContext?: {
    timestamp?: string;
    timeframe?: string;
    sequence?: number;
  };
  coReferences?: string[];
  groupId?: string;
}

export interface EntityGroup {
  id: string;
  name: string;
  type: EntityType;
  entities: Entity[];
  relationships: EntityRelationship[];
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
    byCategory: Record<string, number>;
  };
  extractionMethod?: string;
  timeline?: {
    events: Array<{
      timestamp: string;
      entities: string[];
      description: string;
    }>;
  };
}

export interface AnalysisResult {
  entities: Entity[];
  entityGroups?: EntityGroup[];
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentConfidence: number;
  sentimentExplanation: string;
  metadata: EntityMetadata;
}
