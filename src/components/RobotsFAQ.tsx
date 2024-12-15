'use client';
import BaseFAQ, { FAQ } from './shared/BaseFAQ';

const faqs: FAQ[] = [
  {
    question: "What is a robots.txt file?",
    answer: "A robots.txt file is a text file placed in a website's root directory that provides instructions to search engine crawlers about which pages or sections of the site should or should not be crawled and indexed."
  },
  {
    question: "How do Allow and Disallow rules work?",
    answer: "Disallow rules specify URLs that crawlers should not access, while Allow rules explicitly permit access to specific URLs. When multiple rules match a URL, the most specific rule takes precedence."
  },
  {
    question: "Why do different crawlers matter?",
    answer: "Different search engines' crawlers (like Googlebot or Bingbot) may have different rules in robots.txt. Our tool lets you test access for specific crawlers to ensure proper access control for each search engine."
  },
  {
    question: "What are common robots.txt mistakes?",
    answer: "Common mistakes include blocking important resources, using incorrect syntax, having conflicting rules, or not testing rules before implementation. Our tool helps identify and avoid these issues."
  },
  {
    question: "Do I need a robots.txt file?",
    answer: "While not mandatory, a robots.txt file is recommended for most websites to guide crawler behavior. It helps optimize crawling efficiency and prevent unnecessary server load from crawling of non-essential pages."
  }
];

export default function RobotsFAQ() {
  return <BaseFAQ faqs={faqs} />;
}
