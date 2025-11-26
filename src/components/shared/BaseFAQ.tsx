
import React from 'react';
import styled from '@emotion/styled';
import { Card } from './StyledComponents';

const Section = styled.section`
  margin: var(--space-10) 0;
`;

const Title = styled.h2`
  color: var(--text-color);
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: var(--space-8);
`;

const FAQGrid = styled.div`
  display: grid;
  gap: var(--space-4);
`;

const FAQCard = styled(Card)`
  background: var(--surface-color);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const FAQContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
`;

const QuestionIcon = styled.div`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
  background: rgba(0, 229, 176, 0.1);
  color: var(--primary-color);
  font-size: 1.125rem;
  font-weight: 600;
`;

const TextContent = styled.div`
  flex: 1;
`;

const Question = styled.h3`
  color: var(--text-color);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--space-3);
`;

const Answer = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  opacity: 0.9;
`;

interface FAQ {
  question: string;
  answer: string;
}

interface BaseFAQProps {
  title?: string;
  faqs: FAQ[];
}

export default function BaseFAQ({ title = "Frequently Asked Questions", faqs }: BaseFAQProps) {
  return (
    <Section>
      <Title>{title}</Title>
      <FAQGrid>
        {faqs.map((faq, index) => (
          <FAQCard key={index}>
            <FAQContent>
              <QuestionIcon>Q</QuestionIcon>
              <TextContent>
                <Question>{faq.question}</Question>
                <Answer>{faq.answer}</Answer>
              </TextContent>
            </FAQContent>
          </FAQCard>
        ))}
      </FAQGrid>
    </Section>
  );
}

export type { FAQ };
