import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';
import Calculator from '@/components/Calculator';

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
        <AboutSection />
        <FAQSection />
      </Container>
    </>
  );
}
