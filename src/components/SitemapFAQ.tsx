'use client';
import BaseFAQ, { FAQ } from './shared/BaseFAQ';

const faqs: FAQ[] = [
  {
    question: "What is an XML sitemap?",
    answer: "An XML sitemap is a file that lists all important URLs on your website. It helps search engines understand your site structure and ensures all your pages are discovered and indexed properly."
  },
  {
    question: "What do the priority and change frequency values mean?",
    answer: "Priority (0.0 to 1.0) indicates the importance of a page relative to other pages on your site. Change frequency tells search engines how often the page content typically changes (e.g., daily, weekly, monthly)."
  },
  {
    question: "How do I submit my sitemap to search engines?",
    answer: "You can submit your sitemap through search engine webmaster tools (like Google Search Console), or include its URL in your robots.txt file. Our tool provides instructions for both methods."
  },
  {
    question: "How many URLs can I include in a sitemap?",
    answer: "A single sitemap file can contain up to 50,000 URLs and must be no larger than 50MB when uncompressed. For larger sites, you can create multiple sitemaps and use a sitemap index file."
  },
  {
    question: "How often should I update my sitemap?",
    answer: "It's recommended to update your sitemap whenever you make significant changes to your website, such as adding new pages or removing old ones. For dynamic sites, consider updating it weekly or monthly."
  }
];

export default function SitemapFAQ() {
  return <BaseFAQ faqs={faqs} />;
}
