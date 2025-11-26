/**
 * HTML Utilities
 * Common functions for HTML processing and cleaning
 */

/**
 * Strips HTML tags and returns clean text, focusing on main content
 * @param html - Raw HTML string
 * @returns Clean text with HTML tags and navigation removed
 */
export function stripHtmlTags(html: string): string {
  return html
    // Remove script tags and their contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove style tags and their contents
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove noscript tags and their contents
    .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, '')
    // Remove navigation and menu elements
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '')
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '')
    .replace(/<aside\b[^<]*(?:(?!<\/aside>)<[^<]*)*<\/aside>/gi, '')
    // Remove common menu/nav classes and IDs
    .replace(/<[^>]*(class|id)=["'][^"']*menu[^"']*["'][^>]*>.*?<\/[^>]+>/gi, '')
    .replace(/<[^>]*(class|id)=["'][^"']*nav[^"']*["'][^>]*>.*?<\/[^>]+>/gi, '')
    .replace(/<[^>]*(class|id)=["'][^"']*sidebar[^"']*["'][^>]*>.*?<\/[^>]+>/gi, '')
    // Remove all remaining HTML tags
    .replace(/<[^>]+>/g, ' ')
    // Decode common HTML entities
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&[a-z]+;/gi, ' ')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract main article content for better accuracy
 * @param html - Raw HTML string
 * @returns Clean article text
 */
export function extractArticleContent(html: string): string {
  // Try to find article/main content selectors
  // Use [\s\S] to match any character including newlines (works in ES2017)
  let content = html;
  
  // Try to extract <article> content first
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/i;
  const articleMatch = html.match(articleRegex);
  if (articleMatch) {
    content = articleMatch[1];
  } else {
    // Try <main> content
    const mainRegex = /<main[^>]*>([\s\S]*?)<\/main>/i;
    const mainMatch = html.match(mainRegex);
    if (mainMatch) {
      content = mainMatch[1];
    }
  }
  
  return stripHtmlTags(content);
}

/**
 * Extracts the title from HTML
 * @param html - Raw HTML string
 * @returns Title text or empty string
 */
export function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/i);
  return match ? stripHtmlTags(match[1]).trim() : '';
}

/**
 * Extracts meta description from HTML
 * @param html - Raw HTML string
 * @returns Meta description or empty string
 */
export function extractMetaDescription(html: string): string {
  const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)
    || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  return match ? match[1].trim() : '';
}

/**
 * Extracts H1 from HTML
 * @param html - Raw HTML string
 * @returns H1 text or empty string
 */
export function extractH1(html: string): string {
  const match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  return match ? stripHtmlTags(match[1]).trim() : '';
}

/**
 * Extracts all headings from HTML
 * @param html - Raw HTML string
 * @returns Array of heading texts
 */
export function extractHeadings(html: string): string[] {
  const headings = html.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi);
  if (!headings) return [];
  return headings.map(h => stripHtmlTags(h).trim()).filter(Boolean);
}

/**
 * Extracts all paragraphs from HTML
 * @param html - Raw HTML string
 * @returns Array of paragraph texts
 */
export function extractParagraphs(html: string): string[] {
  const paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/gi);
  if (!paragraphs) return [];
  return paragraphs.map(p => stripHtmlTags(p).trim()).filter(Boolean);
}

/**
 * Extracts all list items from HTML
 * @param html - Raw HTML string
 * @returns Array of list item texts
 */
export function extractListItems(html: string): string[] {
  const items = html.match(/<li[^>]*>(.*?)<\/li>/gi);
  if (!items) return [];
  return items.map(li => stripHtmlTags(li).trim()).filter(Boolean);
}

/**
 * Truncates text to a maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum character length
 * @param suffix - Suffix to add if truncated (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length).trim() + suffix;
}

