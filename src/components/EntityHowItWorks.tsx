'use client';
import BaseHowItWorks, { Step } from './shared/BaseHowItWorks';

const steps: Step[] = [
  {
    number: '1',
    title: 'Input URL',
    description: 'Enter the URL of any webpage you want to analyze. Our tool will extract the content and prepare it for entity analysis.'
  },
  {
    number: '2',
    title: 'Extract Entities',
    description: 'Using advanced natural language processing, we identify and categorize named entities such as people, organizations, locations, and more.'
  },
  {
    number: '3',
    title: 'View Analysis',
    description: 'Review detailed insights about each entity, including relevance scores, mention frequency, and entity relationships. Filter and search results to focus on specific entity types.'
  }
];

export default function EntityHowItWorks() {
  return <BaseHowItWorks steps={steps} />;
}
