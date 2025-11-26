
import BaseHowItWorks, { Step } from './shared/BaseHowItWorks';

const steps: Step[] = [
  {
    number: '1',
    title: 'Analysis',
    description: 'Enter any article URL and our AI will analyze its content, meta tags, and structure using advanced natural language processing.'
  },
  {
    number: '2',
    title: 'Evaluation',
    description: 'We evaluate your H1, meta title, and meta description against SEO best practices and provide character count analysis.'
  },
  {
    number: '3',
    title: 'Recommendations',
    description: 'Receive AI-powered recommendations to improve your content\'s SEO and optional sentiment analysis for tone optimization.'
  }
];

export default function ArticleHowItWorks() {
  return <BaseHowItWorks steps={steps} />;
}
