'use client';
import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import Calculator from '@/components/Calculator';
import CalculatorHowItWorks from '@/components/CalculatorHowItWorks';
import CalculatorFAQ from '@/components/CalculatorFAQ';
import { Container } from '@/components/shared/StyledComponents';

const Title = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: var(--space-6);
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContentContainer = styled(Container)`
  max-width: 1200px;
`;

export default function PercentageCalculatorPage() {
  return (
    <>
      <PageHead page="percentageCalculator" />
      <ContentContainer>
        <Title>Percentage Calculator</Title>
        <Calculator />
        <CalculatorHowItWorks />
        <CalculatorFAQ />
      </ContentContainer>
    </>
  );
}
