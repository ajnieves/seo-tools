
import BaseHowItWorks, { Step } from './shared/BaseHowItWorks';

const steps: Step[] = [
  {
    number: '1',
    title: 'Add URLs',
    description: 'Enter your website URLs one by one, specifying change frequency and priority for each page to help search engines understand your site structure.'
  },
  {
    number: '2',
    title: 'Configure',
    description: 'Set the update frequency and priority level for each URL to indicate how often content changes and its relative importance on your site.'
  },
  {
    number: '3',
    title: 'Generate',
    description: 'Generate a standards-compliant XML sitemap that you can submit to search engines or include in your robots.txt file for better indexing.'
  }
];

export default function SitemapHowItWorks() {
  return <BaseHowItWorks steps={steps} />;
}
