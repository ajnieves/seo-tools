import { Entity, EntityType, EntityMetadata } from '@/types/analysis';
import {
  cleanEntityName,
  detectRelationships,
  isNavigationContent,
  KNOWN_LOCATIONS,
  KNOWN_POLITICIANS,
  KNOWN_ORGANIZATIONS,
  TECH_COMPANIES,
  EVENT_TYPES,
  TRANSPORT_TYPES,
  COMPANY_INDICATORS,
  LOCATION_PREPOSITIONS,
  MOVEMENT_VERBS
} from '@/utils/entityPatterns';

/**
 * Document structure interface for type safety
 */
type DocumentStructure = EntityMetadata['processedStructure'];

export function extractEntities(text: string, structure: DocumentStructure): Entity[] {
  const entities: Map<string, Entity> = new Map();

  // First pass: Extract and type all entities
  // Process title first for higher relevance
  structure.title.forEach((title: string) => {
    processText(title, 'title', entities, 1.2);
  });

  // Process headings next
  structure.headings.forEach((heading: string) => {
    processText(heading, 'heading', entities, 1.1);
  });

  // Process main content
  processText(text, 'content', entities, 1.0);

  // Calculate salience scores
  const totalMentions = Array.from(entities.values()).reduce((sum, entity) => sum + entity.mentions, 0);
  
  // Convert entities map to array and sort by salience
  const entityArray = Array.from(entities.values()).map(entity => ({
    ...entity,
    salience: totalMentions > 0 ? entity.mentions / totalMentions : 0
  }));

  // Second pass: Add relationships between top entities only (for performance)
  // Limit to top 20 most salient entities for relationship detection
  const topEntities = entityArray.slice(0, Math.min(20, entityArray.length));
  
  topEntities.forEach(entity1 => {
    topEntities.forEach(entity2 => {
      if (entity1.name !== entity2.name) {
        const relationship = detectRelationships(
          { name: entity1.name, type: entity1.type },
          { name: entity2.name, type: entity2.type },
          text
        );
        if (relationship) {
          entity1.relationships.push({
            entity: entity2.name,
            ...relationship
          });
        }
      }
    });
  });

  // Return top entities only (limit to 30 for better UX)
  return entityArray
    .sort((a, b) => b.salience - a.salience)
    .slice(0, 30);
}

function processText(
  text: string, 
  context: 'title' | 'heading' | 'content', 
  entities: Map<string, Entity>, 
  relevanceMultiplier: number
): void {
  const words = text.split(/\s+/);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word || word.length < 2) continue;

    // Look for potential entity names (capitalized words)
    if (/^[A-Z]/.test(word)) {
      let entityName = word;
      let nextIndex = i + 1;

      // Look ahead for multi-word entities (but limit to prevent over-capture)
      let wordCount = 1;
      const MAX_ENTITY_WORDS = 4;
      
      while (
        nextIndex < words.length &&
        wordCount < MAX_ENTITY_WORDS &&
        /^[A-Z]/.test(words[nextIndex])
      ) {
        entityName += ' ' + words[nextIndex];
        nextIndex++;
        wordCount++;
      }

      if (entityName !== word) {
        i = nextIndex - 1;
      }

      // Clean and normalize entity name
      entityName = cleanEntityName(entityName);
      if (!entityName) continue; // Skip if entity was filtered out
      
      // Filter out navigation/menu content
      if (isNavigationContent(entityName)) continue;

      // Get surrounding context
      const prevWords = words.slice(Math.max(0, i - 3), i);
      const nextWords = words.slice(i + 1, Math.min(words.length, i + 4));
      const contextWindow = [...prevWords, entityName, ...nextWords].join(' ');

      // Determine entity type with priority order
      let type: EntityType = 'MISC';
      let confidence = 0;
      let category: string | undefined = undefined;

      // 1. Check known politicians first (highest priority for political content)
      if (KNOWN_POLITICIANS.has(entityName)) {
        type = 'PERSON';
        confidence = 0.98;
        category = KNOWN_POLITICIANS.get(entityName);
      }
      // 2. Check known locations (second priority)
      else if (KNOWN_LOCATIONS.has(entityName)) {
        type = 'LOCATION';
        confidence = 0.95;
      }
      // 3. Check known organizations (third priority)
      else if (KNOWN_ORGANIZATIONS.has(entityName)) {
        type = 'ORGANIZATION';
        confidence = 0.95;
      }
      // 4. Check known companies and their aliases (fourth priority)
      else if (TECH_COMPANIES.has(entityName) || Array.from(TECH_COMPANIES.values()).some(info => info.aliases?.includes(entityName))) {
        type = 'ORGANIZATION';
        confidence = 0.95;
        const company = Array.from(TECH_COMPANIES.entries()).find(([name, info]) => 
          name === entityName || info.aliases?.includes(entityName)
        );
        if (company) {
          category = company[1].industry;
        }
      }
      // 5. Check for person names with titles (fifth priority)
      else if (/^[A-Z][a-z]+\s+[A-Z][a-z]+$/.test(entityName) || 
               prevWords.some(w => /^(Mr|Mrs|Ms|Dr|CEO|President|Director)\.?$/i.test(w))) {
        type = 'PERSON';
        confidence = 0.9;
        const titleWord = prevWords.find(w => /^(Mr|Mrs|Ms|Dr|CEO|President|Director)\.?$/i.test(w));
        if (titleWord) {
          category = titleWord.replace(/\.$/, '');
          confidence = 0.95;
        }
      }
      // 6. Check for organization indicators (sixth priority)
      else if (COMPANY_INDICATORS.some(indicator => entityName.includes(indicator))) {
        type = 'ORGANIZATION';
        confidence = 0.85;
      }
      // 7. Check for location patterns (seventh priority)
      else if (LOCATION_PREPOSITIONS.has(prevWords[0]?.toLowerCase()) ||
               /^[A-Z][a-z]+ (City|County|State|Province|District|Region)$/.test(entityName) ||
               MOVEMENT_VERBS.has(context.toLowerCase().split(' ')[0]) ||
               context.toLowerCase().includes('located in')) {
        type = 'LOCATION';
        confidence = 0.8;
      }
      // 8. Check for event types (eighth priority)
      else if (EVENT_TYPES.has(entityName.toLowerCase()) || 
               context.toLowerCase().includes('incident') ||
               context.toLowerCase().includes('investigation')) {
        type = 'EVENT';
        confidence = 0.9;
        category = context.toLowerCase().includes('shooting') ? 'Crime' : undefined;
      }
      // 9. Check for transport types (ninth priority)
      else if (TRANSPORT_TYPES.has(entityName.toLowerCase())) {
        type = 'TRANSPORT';
        confidence = 0.85;
      }

      // Skip low confidence entities
      if (confidence < 0.5) continue;

      // Update or create entity
      const existingEntity = entities.get(entityName);
      if (existingEntity) {
        existingEntity.mentions++;
        existingEntity.confidence = Math.max(existingEntity.confidence, confidence * relevanceMultiplier);
        if (context === 'title' || context === 'heading') {
          existingEntity.htmlContext = context;
        }
      } else {
        entities.set(entityName, {
          name: entityName,
          type,
          mentions: 1,
          confidence: confidence * relevanceMultiplier,
          salience: 0, // Will be calculated later
          category,
          context: contextWindow,
          htmlContext: context,
          relationships: []
        });
      }
    }
  }
}
