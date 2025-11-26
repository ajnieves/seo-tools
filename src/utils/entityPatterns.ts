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
  'Chicago', 'Los Angeles', 'Pennsylvania', 'Georgia', 'Florida', 'Texas',
  'Arizona', 'Nevada', 'Oregon', 'Michigan', 'Wisconsin', 'Ohio',
  'North Carolina', 'South Carolina', 'Virginia', 'Maryland', 'Delaware',
  'New Jersey', 'Connecticut', 'Rhode Island', 'Massachusetts', 'Maine',
  'United States', 'USA', 'America', 'Europe', 'Asia', 'Africa',
  'Latin America', 'Middle East', 'China', 'France', 'Germany', 'Spain',
  'Italy', 'Canada', 'Mexico', 'Brazil', 'India', 'Japan', 'Philippines',
  'Thailand', 'Vietnam', 'Indonesia', 'Australia', 'Colombia', 'Columbia',
  'Capitol Hill', 'White House', 'Pentagon'
]);

// Known political figures
export const KNOWN_POLITICIANS = new Map<string, string>([
  ['Donald Trump', 'President'],
  ['Joe Biden', 'President'],
  ['Kamala Harris', 'Vice President'],
  ['Marjorie Taylor Greene', 'Representative'],
  ['Nancy Pelosi', 'Representative'],
  ['Mitch McConnell', 'Senator'],
  ['Chuck Schumer', 'Senator'],
  ['Ron DeSantis', 'Governor'],
  ['Gavin Newsom', 'Governor']
]);

// Known organizations for better classification
export const KNOWN_ORGANIZATIONS = new Set([
  'Congress', 'House', 'Senate', 'White House', 'Supreme Court',
  'FBI', 'CIA', 'NSA', 'DOJ', 'IRS', 'FDA', 'CDC', 'EPA',
  'AP', 'AP News', 'Associated Press', 'Reuters', 'BBC', 'CNN', 'Fox News',
  'Google', 'Apple', 'Microsoft', 'Amazon', 'Facebook', 'Meta', 'Twitter', 'X'
]);

export const IRRELEVANT_ENTITIES = new Set([
  'True Crime', 'Collapse', 'Game', 'Word', 'Search', 'Mini', 'Crossword',
  'Puzzle', 'Stack', 'Match', 'Block', 'Quotes', 'Comments', 'Share',
  'Facebook', 'Twitter', 'Email', 'Print', 'Article', 'Page', 'Section',
  'Menu', 'Navigation', 'Header', 'Footer', 'Sidebar', 'Button',
  // Newsletter and menu-related terms
  'Newsletters', 'Newsletter', 'See All', 'TOP STORIES', 'SECTIONS',
  'Subscribe', 'Sign', 'Login', 'Account', 'Profile', 'Settings',
  'Privacy Policy', 'Terms', 'Cookies', 'Contact', 'About', 'Help',
  // Navigation terms
  'Click', 'Read More', 'Learn More', 'View All', 'Show More', 'Load More',
  // Advertisement/career terms
  'Careers', 'Advertise', 'Advertising', 'Jobs', 'Work', 'Apply',
  // Generic UI terms
  'Download', 'Upload', 'Submit', 'Cancel', 'Close', 'Open', 'Back', 'Next',
  'Previous', 'Continue', 'Confirm', 'Delete', 'Edit', 'Save', 'Update',
  // Media controls
  'Play', 'Pause', 'Stop', 'Volume', 'Mute', 'Unmute', 'Fullscreen',
  // Social/engagement
  'Like', 'Follow', 'Subscribe', 'Unsubscribe', 'Bookmark', 'Flag',
  // Generic group references (not specific entities)
  'Some Republicans', 'Some Democrats', 'Many People', 'Several Officials',
  'Multiple Sources', 'Various Agencies', 'Some Experts', 'Many Analysts',
  'America First', 'Home Page', 'Main Story', 'Breaking News'
]);

// Common English words that should never be entities
export const STOP_WORDS = new Set([
  'But', 'And', 'Or', 'The', 'A', 'An', 'In', 'On', 'At', 'To', 'For', 'Of',
  'With', 'From', 'By', 'As', 'Is', 'Was', 'Were', 'Been', 'Be', 'Are',
  'This', 'That', 'These', 'Those', 'It', 'Its', 'Their', 'There', 'They',
  'He', 'She', 'Him', 'Her', 'His', 'Them', 'Our', 'Your', 'My', 'Me',
  'We', 'You', 'All', 'Some', 'Any', 'Many', 'Few', 'Other', 'Another',
  'More', 'Most', 'Less', 'Much', 'Very', 'Such', 'So', 'Just', 'Only'
]);

// Patterns that indicate menu/navigation content (not real entities)
export const NAV_PATTERNS = [
  /^(See All|View All|Show|Load|Click|Read|Browse|Explore).+$/i,
  /^.+(Menu|Navigation|Nav|Sidebar|Header|Footer).*$/i,
  /^.+(Newsletter|Newsletters|Subscribe|Sign Up|Sign In|Log In|Log Out).+$/i,
  /^(TOP STORIES|SECTIONS|Categories|Tags|Archive|Recent|Latest).+$/i,
  /^.+(Privacy|Terms|Policy|Cookie|Settings|About|Contact|Help|FAQ|Support).+$/i,
  /^(Download|Upload|Share|Print|Email|Bookmark|Flag|Save|Export).+$/i,
  /^(Careers|Jobs|Advertise|Advertising|Work|Apply|Join).+$/i,
  /^(Add|Get|Try|Start|Begin|Launch|Open).+(App|News|Service).+$/i,
  /^(Google|Apple|Microsoft|Facebook|Twitter|Instagram).+(Add|Get|Download).+$/i
];

// Filter function to check if an entity name looks like navigation content
export function isNavigationContent(name: string): boolean {
  // Filter very short or single-letter entities
  if (name.length < 3) return true;
  
  // Check against stop words
  if (STOP_WORDS.has(name)) return true;
  
  // Check against irrelevant entities
  if (IRRELEVANT_ENTITIES.has(name)) return true;
  
  // Check against navigation patterns
  if (NAV_PATTERNS.some(pattern => pattern.test(name))) return true;
  
  // Check if name is very long (likely concatenated menu items)
  if (name.length > 50) return true;
  
  // Check if name contains too many capitalized words (menu concatenation)
  const capitalizedWords = (name.match(/[A-Z][a-z]+/g) || []).length;
  const totalWords = name.split(/\s+/).length;
  if (totalWords > 5 && capitalizedWords > 4) return true;
  
  // Filter entities that are just a single last name
  const words = name.split(/\s+/);
  if (words.length === 1 && /^[A-Z][a-z]+$/.test(name) && name.length < 8) {
    return true; // Single short capitalized word, likely noise
  }
  
  // Filter entities ending with common prepositions (e.g., "House in", "Congress at")
  if (/\s(in|at|on|to|from|with|by|for|and|or|but)$/i.test(name)) return true;
  
  return false;
}

export const POSSESSIVE_PATTERN = /'s|s'/;

export function cleanEntityName(name: string): string {
  // Remove possessives and extra whitespace
  name = name.replace(POSSESSIVE_PATTERN, '').trim();
  
  // Remove trailing punctuation (commas, periods, colons, etc.)
  name = name.replace(/[,;:\.!?]+$/g, '').trim();
  
  // Remove leading articles/prepositions (For X, To X, etc.)
  name = name.replace(/^(For|To|From|With|By|As)\s+/i, '').trim();
  
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
