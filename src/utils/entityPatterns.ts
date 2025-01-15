import { EntityType, EntityRelationship } from '@/types/analysis';

interface CompanyInfo {
  industry: string;
  type: string;
  aliases?: string[];
}

export const PERSON_TITLES = new Set([
  'CEO', 'CTO', 'CFO', 'COO', 'President', 'Dr', 'Doctor', 'Professor', 'Prof', 
  'Mr', 'Mrs', 'Ms', 'Director', 'Manager', 'Head', 'Chief', 'VP', 'Executive',
  'Chairman', 'Chairwoman', 'Founder', 'Co-founder', 'Senior', 'Junior', 'Principal',
  'Executive Director', 'Managing Director', 'General Manager', 'SVP', 'EVP',
  'Suspect', 'Victim', 'Officer', 'Detective', 'Agent', 'Inspector', 'Commissioner'
]);

export const COMPANY_INDICATORS = [
  'Inc', 'Corp', 'Corporation', 'LLC', 'Ltd', 'Limited', 'Company', 'Technologies',
  'Solutions', 'Systems', 'Group', 'Holdings', 'Industries', 'International',
  'Healthcare', 'Health', 'Medical', 'Insurance', 'Financial', 'Services',
  'Enterprises', 'Partners', 'Associates', 'Ventures', 'Capital', 'Global',
  'News', 'Media', 'Network', 'Broadcasting', 'Publications', 'Press'
];

export const TECH_COMPANIES = new Map<string, CompanyInfo>([
  ['UnitedHealthcare', { 
    industry: 'Healthcare', 
    type: 'Insurance', 
    aliases: ['UnitedHealth Group', 'UnitedHealth', 'United Healthcare', 'UHC'] 
  }],
  ['Fox News', { 
    industry: 'Media', 
    type: 'News', 
    aliases: [
      'Fox', 'Fox News Media', 'Fox Business', 'Fox Nation', 
      'Fox News Channel', 'Fox Corporation', 'Fox News Network'
    ] 
  }]
]);

export const EVENT_TYPES = new Set([
  'shooting', 'attack', 'incident', 'murder', 'assault', 'robbery',
  'arrest', 'chase', 'escape', 'fled', 'investigation', 'search'
]);

export const TRANSPORT_TYPES = new Set([
  'train', 'bus', 'car', 'vehicle', 'subway', 'metro', 'taxi',
  'aircraft', 'plane', 'helicopter', 'boat', 'ship', 'ferry'
]);

export const LOCATION_PREPOSITIONS = new Set([
  'in', 'at', 'from', 'to', 'near', 'within', 'around', 'outside', 'inside',
  'across', 'through', 'between', 'among', 'beyond', 'behind', 'beside',
  'via', 'towards', 'toward', 'into', 'onto', 'over', 'under', 'past'
]);

export const MOVEMENT_VERBS = new Set([
  'fled', 'escaped', 'traveled', 'moved', 'went', 'left', 'arrived',
  'departed', 'crossed', 'entered', 'exited', 'passed', 'reached'
]);

export const KNOWN_LOCATIONS = new Set([
  'New York', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island',
  'Wall Street', 'Silicon Valley', 'San Francisco', 'Cupertino',
  'California', 'Seattle', 'Washington', 'Boston', 'London', 'Tokyo',
  'Chicago', 'Los Angeles', 'Pennsylvania'
]);

export const IRRELEVANT_ENTITIES = new Set([
  'True Crime', 'Collapse', 'Game', 'Word', 'Search', 'Mini', 'Crossword',
  'Puzzle', 'Stack', 'Match', 'Block', 'Quotes', 'Comments', 'Share',
  'Facebook', 'Twitter', 'Email', 'Print', 'Article', 'Page', 'Section',
  'Menu', 'Navigation', 'Header', 'Footer', 'Sidebar', 'Button'
]);

export const POSSESSIVE_PATTERN = /'s|s'/;

export function cleanEntityName(name: string): string {
  // Remove possessives and extra whitespace
  name = name.replace(POSSESSIVE_PATTERN, '').trim();
  
  // Filter out irrelevant entities
  if (IRRELEVANT_ENTITIES.has(name)) {
    return '';
  }

  // Handle special cases
  if (name.includes('Dr.') || name.includes('Dr ')) {
    name = name.replace(/Dr\.?\s+/, '');
    return `Dr. ${name}`;
  }

  // Handle company names with spaces
  for (const [company, info] of TECH_COMPANIES.entries()) {
    if (name === company || info.aliases?.includes(name)) {
      return company;
    }
  }

  return name;
}

export function detectEntityType(
  name: string,
  prevWords: string[],
  nextWords: string[],
  context: string
): { type: EntityType; confidence: number; category?: string } {
  // Skip irrelevant entities
  if (IRRELEVANT_ENTITIES.has(name)) {
    return { type: 'MISC', confidence: 0 };
  }

  // Check known locations first (highest priority)
  if (KNOWN_LOCATIONS.has(name)) {
    return { type: 'LOCATION', confidence: 0.95 };
  }

  // Check known companies and their aliases (second priority)
  for (const [company, info] of TECH_COMPANIES.entries()) {
    if (name === company || info.aliases?.includes(name)) {
      return {
        type: 'ORGANIZATION',
        confidence: 0.95,
        category: info.industry
      };
    }
  }

  // Check for person names with titles (third priority)
  if (/^[A-Z][a-z]+\s+[A-Z][a-z]+$/.test(name) || 
      prevWords.some(w => /^(Mr|Mrs|Ms|Dr|CEO|President|Director)\.?$/i.test(w))) {
    const type = 'PERSON';
    let confidence = 0.9;
    let category = undefined;

    const titleWord = prevWords.find(w => /^(Mr|Mrs|Ms|Dr|CEO|President|Director)\.?$/i.test(w));
    if (titleWord) {
      category = titleWord.replace(/\.$/, '');
      confidence = 0.95;
    }

    return { type, confidence, category };
  }

  // Check for organization indicators (fourth priority)
  if (COMPANY_INDICATORS.some(indicator => name.includes(indicator))) {
    return { type: 'ORGANIZATION', confidence: 0.85 };
  }

  // Check for location patterns (fifth priority)
  if (LOCATION_PREPOSITIONS.has(prevWords[0]?.toLowerCase()) ||
      /^[A-Z][a-z]+ (City|County|State|Province|District|Region)$/.test(name) ||
      MOVEMENT_VERBS.has(context.toLowerCase().split(' ')[0]) ||
      context.toLowerCase().includes('located in')) {
    return { type: 'LOCATION', confidence: 0.8 };
  }

  // Check for event types (sixth priority)
  if (EVENT_TYPES.has(name.toLowerCase()) || 
      context.toLowerCase().includes('incident') ||
      context.toLowerCase().includes('investigation')) {
    return {
      type: 'EVENT',
      confidence: 0.9,
      category: context.toLowerCase().includes('shooting') ? 'Crime' : undefined
    };
  }

  // Check for transport types (seventh priority)
  if (TRANSPORT_TYPES.has(name.toLowerCase())) {
    return { type: 'TRANSPORT', confidence: 0.85 };
  }

  // Default case
  return { type: 'MISC', confidence: 0.5 };
}

export function detectRelationships(
  entity1: { name: string; type: string },
  entity2: { name: string; type: string },
  context: string
): { type: EntityRelationship['type']; strength: number; context?: string } | null {
  // Skip relationships involving irrelevant entities
  if (IRRELEVANT_ENTITIES.has(entity1.name) || IRRELEVANT_ENTITIES.has(entity2.name)) {
    return null;
  }

  // Check for movement relationships between locations and other entities
  if ((entity1.type === 'LOCATION' || entity2.type === 'LOCATION') &&
      (MOVEMENT_VERBS.has(context.toLowerCase().split(' ')[0]) ||
       context.toLowerCase().includes('via') ||
       context.toLowerCase().includes('to') ||
       context.toLowerCase().includes('from'))) {
    return {
      type: 'movement',
      strength: 0.9,
      context: context.split('.')[0]
    };
  }

  // Check for company-person relationships
  if (entity1.type === 'ORGANIZATION' && entity2.type === 'PERSON' ||
      entity2.type === 'ORGANIZATION' && entity1.type === 'PERSON') {
    // Check for CEO/executive relationship in context
    if (/CEO|chief executive|leads|heading|announced/.test(context)) {
      return {
        type: 'executive',
        strength: 0.95,
        context: context.split('.')[0]
      };
    }
  }

  // Check for incident relationships
  if (context.toLowerCase().includes('shooting') ||
      context.toLowerCase().includes('shot') ||
      context.toLowerCase().includes('injured') ||
      context.toLowerCase().includes('killed') ||
      context.toLowerCase().includes('arrested')) {
    return {
      type: 'incident',
      strength: 0.95,
      context: context.split('.')[0]
    };
  }

  return null;
}
