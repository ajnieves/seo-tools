/**
 * Centralized Navigation Configuration
 * Single source of truth for all navigation items
 */

import { ReactElement } from 'react';

export interface NavItem {
  name: string;
  href: string;
  icon: ReactElement;
  description?: string;
  category?: 'main' | 'technical-seo' | 'utilities';
}

// Icon components as JSX elements
const HomeIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ArticleIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const EntityIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const SitemapIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12h-8" />
    <path d="M21 6H8" />
    <path d="M21 18H8" />
    <path d="M3 6h3" />
    <path d="M3 12h3" />
    <path d="M3 18h3" />
  </svg>
);

const RssIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11a9 9 0 0 1 9 9" />
    <path d="M4 4a16 16 0 0 1 16 16" />
    <circle cx="5" cy="19" r="1" />
  </svg>
);

const RobotsIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16" />
    <line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

const CalculatorIcon = (
  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="16" y1="14" x2="16" y2="18" />
    <line x1="8" y1="14" x2="8" y2="18" />
    <line x1="12" y1="14" x2="12" y2="18" />
  </svg>
);

/**
 * Main navigation items for sidebar and mobile menu
 */
export const navigationItems: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
    description: 'Dashboard and overview',
    category: 'main',
  },
  {
    name: 'Article Evaluator',
    href: '/article-evaluator',
    icon: ArticleIcon,
    description: 'Analyze and optimize article SEO',
    category: 'technical-seo',
  },
  {
    name: 'Entity Analyzer',
    href: '/entity-analyzer',
    icon: EntityIcon,
    description: 'Extract and analyze named entities',
    category: 'technical-seo',
  },
  {
    name: 'XML Sitemap',
    href: '/sitemap-generator',
    icon: SitemapIcon,
    description: 'Generate XML sitemaps',
    category: 'technical-seo',
  },
  {
    name: 'RSS Parser',
    href: '/rss-parser',
    icon: RssIcon,
    description: 'Parse and validate RSS feeds',
    category: 'technical-seo',
  },
  {
    name: 'Robots.txt',
    href: '/robots-tester',
    icon: RobotsIcon,
    description: 'Test robots.txt rules',
    category: 'technical-seo',
  },
  {
    name: 'Calculator',
    href: '/percentage-calculator',
    icon: CalculatorIcon,
    description: 'Calculate percentages and metrics',
    category: 'utilities',
  },
];

/**
 * Get navigation items by category
 */
export function getNavItemsByCategory(category: NavItem['category']): NavItem[] {
  return navigationItems.filter(item => item.category === category);
}

/**
 * Footer navigation structure
 */
export const footerNavigation = {
  technicalSeo: {
    name: 'Technical SEO',
    items: navigationItems.filter(item => item.category === 'technical-seo'),
  },
  utilities: {
    name: 'Utilities',
    items: navigationItems.filter(item => item.category === 'utilities'),
  },
};

/**
 * Logo SVG component
 */
export const LogoIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

