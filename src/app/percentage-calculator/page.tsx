import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';

const Calculator = dynamic(() => import('@/components/Calculator'), {
  ssr: true
});

export const metadata: Metadata = {
  title: 'Percentage Calculator - SEO Tools',
  description: 'A comprehensive percentage calculator for all your calculation needs. Calculate percentages, find percentage changes, and more with our easy-to-use tools.',
  keywords: 'percentage calculator, percentage change calculator, percentage increase, percentage decrease, percentage difference',
};

export default function PercentageCalculatorPage() {
  return (
    <>
      <Calculator />
      <div className="content-sections">
        <AboutSection />
        <FAQSection />
      </div>
    </>
  );
}
