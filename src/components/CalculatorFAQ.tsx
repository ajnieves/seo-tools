'use client';
import BaseFAQ, { FAQ } from './shared/BaseFAQ';

const faqs: FAQ[] = [
  {
    question: "What types of percentage calculations can I perform?",
    answer: "Our calculator supports multiple percentage calculations: finding a percentage of a number (X% of Y), calculating what percentage one number is of another (X is what % of Y), and determining values after percentage increases or decreases."
  },
  {
    question: "How accurate are the calculations?",
    answer: "All calculations are performed with high precision and rounded to 2 decimal places in the display for clarity. This ensures accurate results while maintaining readability."
  },
  {
    question: "Can I calculate percentage differences?",
    answer: "Yes, you can calculate the percentage difference between two numbers. The calculator will show both the absolute difference and the percentage change, indicating whether it's an increase or decrease."
  },
  {
    question: "How do I calculate a percentage increase?",
    answer: "Enter your starting value and the percentage increase. The calculator will show the final value after applying the increase. For example, a 10% increase on 100 would give you 110."
  },
  {
    question: "Can I use negative percentages?",
    answer: "While you can't enter negative percentages directly, you can use the decrease option when calculating percentage changes. This achieves the same result as using negative percentages."
  }
];

export default function CalculatorFAQ() {
  return <BaseFAQ faqs={faqs} />;
}
