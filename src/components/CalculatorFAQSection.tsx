import styled from '@emotion/styled';

const Section = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: var(--surface-color);
  border-radius: 16px;
  border: 1px solid var(--border-color);
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Question = styled.h3`
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
`;

const Answer = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1.1rem;
`;

export default function CalculatorFAQSection() {
  return (
    <Section>
      <Title>Frequently Asked Questions</Title>
      <FAQList>
        <FAQItem>
          <Question>How do I calculate what percentage X is of Y?</Question>
          <Answer>
            To find what percentage X is of Y, divide X by Y and multiply by 100. For example, if X is 50 and Y is 200, then (50 ÷ 200) × 100 = 25%. Our calculator handles this automatically.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>How do I calculate a percentage increase or decrease?</Question>
          <Answer>
            To calculate percentage change, subtract the old value from the new value, divide by the old value, and multiply by 100. For example, if a value increases from 100 to 150, the percentage increase is ((150 - 100) ÷ 100) × 100 = 50%.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What's the difference between percentage change and percentage points?</Question>
          <Answer>
            Percentage change compares the relative difference between two values, while percentage points measure the absolute difference between two percentages. For example, if a rate increases from 40% to 50%, that's a 25% increase but a 10 percentage point increase.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>How can I use this for SEO metrics?</Question>
          <Answer>
            You can use the calculator to analyze changes in key SEO metrics like conversion rates, bounce rates, click-through rates (CTR), and ranking positions. It helps you quantify improvements and track performance changes over time.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Why do I need to calculate percentage differences?</Question>
          <Answer>
            Percentage differences help you understand relative changes and performance trends. In SEO, this is crucial for measuring the impact of optimizations, comparing performance across different time periods, and setting realistic improvement goals.
          </Answer>
        </FAQItem>
      </FAQList>
    </Section>
  );
}
