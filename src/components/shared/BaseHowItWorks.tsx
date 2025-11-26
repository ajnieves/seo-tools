
import React from 'react';
import styled from '@emotion/styled';
import { Card, Grid } from './StyledComponents';

const Section = styled.section`
  margin: var(--space-10) 0;
`;

const Title = styled.h2`
  color: var(--text-color);
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: var(--space-8);
`;

const StepCard = styled(Card)`
  background: var(--surface-color);
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
`;

const StepNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-lg);
  background: rgba(0, 229, 176, 0.1);
  color: var(--primary-color);
  font-weight: 600;
`;

const StepTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.25rem;
  font-weight: 600;
`;

const StepDescription = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  opacity: 0.9;
`;

interface Step {
  number: string;
  title: string;
  description: string;
}

interface BaseHowItWorksProps {
  title?: string;
  steps: Step[];
}

export default function BaseHowItWorks({ title = "How This Tool Works", steps }: BaseHowItWorksProps) {
  return (
    <Section>
      <Title>{title}</Title>
      <Grid columns={3}>
        {steps.map((step) => (
          <StepCard key={step.number}>
            <StepHeader>
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
            </StepHeader>
            <StepDescription>{step.description}</StepDescription>
          </StepCard>
        ))}
      </Grid>
    </Section>
  );
}

export type { Step };
