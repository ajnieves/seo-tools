import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import Calculator from '@/components/Calculator';
import CalculatorAboutSection from '@/components/CalculatorAboutSection';
import CalculatorFAQSection from '@/components/CalculatorFAQSection';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

export default function PercentageCalculatorPage() {
  return (
    <>
      <PageHead page="percentageCalculator" />
      
      <Container>
        <Title>Percentage Calculator</Title>
        <Calculator />
        <CalculatorAboutSection />
        <CalculatorFAQSection />
      </Container>
    </>
  );
}
