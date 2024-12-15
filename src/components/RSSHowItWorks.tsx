'use client';
import BaseHowItWorks, { Step } from './shared/BaseHowItWorks';

const steps: Step[] = [
  {
    number: '1',
    title: 'Enter Feed URL',
    description: 'Input the URL of any RSS feed you want to analyze. Our tool supports RSS 2.0, RSS 1.0, and Atom feed formats.'
  },
  {
    number: '2',
    title: 'Parse Content',
    description: 'The tool automatically parses the feed, extracting titles, descriptions, publication dates, and other metadata from each entry.'
  },
  {
    number: '3',
    title: 'View Results',
    description: 'Review the parsed feed content in a clean, organized format. Each entry is displayed with its full details and direct links to the original content.'
  }
];

export default function RSSHowItWorks() {
  return <BaseHowItWorks steps={steps} />;
}
