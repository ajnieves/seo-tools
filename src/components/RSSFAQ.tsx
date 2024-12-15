'use client';
import BaseFAQ, { FAQ } from './shared/BaseFAQ';

const faqs: FAQ[] = [
  {
    question: "What types of RSS feeds can I parse?",
    answer: "Our tool supports all major feed formats including RSS 2.0 (most common), RSS 1.0, and Atom feeds. It automatically detects the format and parses accordingly."
  },
  {
    question: "What information can I extract from an RSS feed?",
    answer: "You can extract feed title, description, publication date, author information, entry content, media attachments, and various other metadata depending on what's included in the feed."
  },
  {
    question: "Can I parse password-protected feeds?",
    answer: "Currently, our tool supports parsing of public RSS feeds only. For password-protected or authenticated feeds, you'll need to use your feed reader's authentication features."
  },
  {
    question: "How do I find a website's RSS feed URL?",
    answer: "Most websites place RSS feed links in their headers, footers, or alongside social media icons. Look for RSS, XML, or Feed icons. You can also try adding '/feed' or '/rss' to the main website URL."
  },
  {
    question: "What should I do if a feed isn't parsing correctly?",
    answer: "First, verify the feed URL is correct and accessible. If the feed loads in a browser but won't parse, it might contain invalid XML. Our tool provides specific error messages to help identify and resolve issues."
  }
];

export default function RSSFAQ() {
  return <BaseFAQ faqs={faqs} />;
}
