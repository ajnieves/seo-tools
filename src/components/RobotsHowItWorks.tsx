
import BaseHowItWorks, { Step } from './shared/BaseHowItWorks';

const steps: Step[] = [
  {
    number: '1',
    title: 'Enter URL',
    description: 'Input the URL you want to test. The tool will automatically fetch the robots.txt content from the domain root if available.'
  },
  {
    number: '2',
    title: 'Select User Agent',
    description: 'Choose which crawler to test against (e.g., Googlebot, Bingbot) or enter a custom user agent. Different crawlers may have different access rules.'
  },
  {
    number: '3',
    title: 'Test Access',
    description: 'Get instant results showing whether the URL is allowed or blocked for the selected crawler, along with the specific matching rule from robots.txt.'
  }
];

export default function RobotsHowItWorks() {
  return <BaseHowItWorks steps={steps} />;
}
