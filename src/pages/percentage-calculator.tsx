import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import Calculator from '@/components/Calculator';
import CalculatorHowItWorks from '@/components/CalculatorHowItWorks';
import CalculatorFAQ from '@/components/CalculatorFAQ';

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: var(--space-6);
`;

const Title = styled.h1`
  color: var(--primary-color);
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ToolSection = styled.section`
  margin-bottom: var(--space-8);
`;

export default function PercentageCalculatorPage() {
  return (
    <>
      <PageHead />
      <Main>
        <article>
          <Header>
            <Title>Percentage Calculator</Title>
          </Header>
          
          <ToolSection aria-label="Percentage Calculator Tool">
            <Calculator />
          </ToolSection>
          
          <CalculatorHowItWorks />
          <CalculatorFAQ />
        </article>
      </Main>
    </>
  );
}
