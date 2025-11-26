
import BaseHowItWorks, { Step } from './shared/BaseHowItWorks';

const steps: Step[] = [
  {
    number: '1',
    title: 'Choose Calculation',
    description: 'Select the type of percentage calculation you need: find a percentage of a number, calculate what percentage one number is of another, or determine value after percentage change.'
  },
  {
    number: '2',
    title: 'Enter Values',
    description: 'Input your numbers into the clearly labeled fields. For percentage changes, specify whether it\'s an increase or decrease.'
  },
  {
    number: '3',
    title: 'Get Results',
    description: 'Instantly see your calculation results with precise decimal places. Results are formatted for clarity and easy understanding.'
  }
];

export default function CalculatorHowItWorks() {
  return <BaseHowItWorks steps={steps} />;
}
