import { useState } from 'react';
import styled from '@emotion/styled';

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

const CalculatorGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CalculatorSection = styled.div`
  padding: 2rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`;

const SectionTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-color);
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 255, 157, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 255, 157, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const AboutSection = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`;

const Text = styled.p`
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 1rem;
  font-size: 1.05rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FAQSection = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`;

const FAQList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const FAQItem = styled.div`
  padding: 1.5rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

const Question = styled.h3`
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Answer = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1rem;
`;

export default function PercentageCalculator() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [percentageResult, setPercentageResult] = useState<string | null>(null);

  const [percentage, setPercentage] = useState('');
  const [baseValue, setBaseValue] = useState('');
  const [valueResult, setValueResult] = useState<string | null>(null);

  const calculatePercentage = (e: React.FormEvent) => {
    e.preventDefault();
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    if (!isNaN(num1) && !isNaN(num2)) {
      const result = (num1 / num2) * 100;
      setPercentageResult(`${result.toFixed(2)}%`);
    }
  };

  const calculateValue = (e: React.FormEvent) => {
    e.preventDefault();
    const percent = parseFloat(percentage);
    const base = parseFloat(baseValue);
    if (!isNaN(percent) && !isNaN(base)) {
      const result = (percent / 100) * base;
      setValueResult(result.toFixed(2));
    }
  };

  return (
    <Container>
      <Title>Percentage Calculator</Title>

      <CalculatorGrid>
        <CalculatorSection>
          <SectionTitle>Calculate Percentage</SectionTitle>
          <Form onSubmit={calculatePercentage}>
            <InputGroup>
              <Label>Value 1</Label>
              <Input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder="Enter first value"
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Value 2</Label>
              <Input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="Enter second value"
                required
              />
            </InputGroup>
            <Button type="submit">Calculate Percentage</Button>
            {percentageResult && <Result>{percentageResult}</Result>}
          </Form>
        </CalculatorSection>

        <CalculatorSection>
          <SectionTitle>Calculate Value from Percentage</SectionTitle>
          <Form onSubmit={calculateValue}>
            <InputGroup>
              <Label>Percentage</Label>
              <Input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Enter percentage"
                required
              />
            </InputGroup>
            <InputGroup>
              <Label>Base Value</Label>
              <Input
                type="number"
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
                placeholder="Enter base value"
                required
              />
            </InputGroup>
            <Button type="submit">Calculate Value</Button>
            {valueResult && <Result>{valueResult}</Result>}
          </Form>
        </CalculatorSection>
      </CalculatorGrid>

      <AboutSection>
        <SectionTitle>About Percentage Calculator</SectionTitle>
        <Text>
          The Percentage Calculator is a versatile tool that helps you perform various percentage calculations quickly and accurately. Whether you need to find what percentage one number is of another, or calculate a value based on a percentage, this tool has you covered.
        </Text>
        <Text>
          Key features include:
        </Text>
        <List>
          <ListItem>
            <strong>Percentage Calculation:</strong> Find what percentage one value is of another
          </ListItem>
          <ListItem>
            <strong>Value from Percentage:</strong> Calculate a value based on a percentage and base number
          </ListItem>
          <ListItem>
            <strong>Real-time Results:</strong> Instant calculations as you input values
          </ListItem>
          <ListItem>
            <strong>Precise Results:</strong> Calculations accurate to two decimal places
          </ListItem>
        </List>
      </AboutSection>

      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQList>
          <FAQItem>
            <Question>How do I calculate a percentage?</Question>
            <Answer>
              To calculate what percentage one number is of another, divide the first number by the second number and multiply by 100. For example, to find what percentage 25 is of 100: (25 ÷ 100) × 100 = 25%.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>How do I calculate a value from a percentage?</Question>
            <Answer>
              To find a value from a percentage, multiply the base number by the percentage divided by 100. For example, to find 15% of 200: (15 ÷ 100) × 200 = 30.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>Why are percentages useful?</Question>
            <Answer>
              Percentages are useful for comparing relative values, expressing parts of a whole, calculating changes or differences, and standardizing measurements. They're essential in business, finance, statistics, and everyday calculations.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>What does the percentage symbol (%) mean?</Question>
            <Answer>
              The percentage symbol (%) represents parts per hundred. For example, 50% means 50 parts per 100, or one-half of the total. The symbol comes from the Italian phrase "per cento" meaning "per hundred."
            </Answer>
          </FAQItem>
        </FAQList>
      </FAQSection>
    </Container>
  );
}
