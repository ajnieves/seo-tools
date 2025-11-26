
import BaseFAQ, { FAQ } from './shared/BaseFAQ';

const faqs: FAQ[] = [
  {
    question: "What does this tool analyze?",
    answer: "Our tool analyzes your article's H1 heading, meta title, meta description, and overall content sentiment. It checks for optimal length, keyword usage, and provides AI-powered recommendations for improvement."
  },
  {
    question: "How accurate is the sentiment analysis?",
    answer: "The sentiment analysis uses advanced natural language processing to determine the emotional tone of your content with high accuracy. However, context and nuance may affect results, so use it as a general guide."
  },
  {
    question: "What are the optimal lengths for meta tags?",
    answer: "Meta titles should be 50-60 characters for optimal display in search results. Meta descriptions should be 150-160 characters to avoid truncation while providing comprehensive information."
  },
  {
    question: "Can I analyze articles in other languages?",
    answer: "Yes, our tool supports content analysis in multiple languages. The AI adapts its recommendations based on the detected language while maintaining SEO best practices."
  },
  {
    question: "How often should I analyze my articles?",
    answer: "We recommend analyzing articles before publication and after any significant updates. Regular analysis helps maintain SEO effectiveness and ensures your content meets current best practices."
  }
];

export default function ArticleFAQ() {
  return <BaseFAQ faqs={faqs} />;
}
