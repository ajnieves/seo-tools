'use client';
import { useState, FormEvent } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/Button';
import PercentageDifferenceCalculator from '@/components/PercentageDifferenceCalculator';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #00a8e8, #00ff9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CalculatorSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const SectionTitle = styled.h2`
  color: #00a8e8;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (min-width: 480px) {
    flex-wrap: nowrap;
  }
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  min-width: 100px;
  flex-shrink: 0;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  width: 100%;
  max-width: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a8e8;
    box-shadow: 0 0 0 2px rgba(0, 168, 232, 0.2);
  }

  &:invalid {
    border-color: rgba(255, 77, 77, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const StyledText = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  white-space: nowrap;
`;

const Result = styled.div`
  background: rgba(0, 255, 157, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.2);
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  font-weight: 500;
  color: #00ff9d;
  text-align: center;
  font-size: 1.1rem;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ErrorMessage = styled.span`
  color: #ff4d4d;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
`;

interface CalculatorFormState {
  value: string;
  error: string;
}

export default function Calculator() {
  const [percentage1, setPercentage1] = useState<CalculatorFormState>({ value: '', error: '' });
  const [number1, setNumber1] = useState<CalculatorFormState>({ value: '', error: '' });
  const [result1, setResult1] = useState<number | null>(null);

  const [number2, setNumber2] = useState<CalculatorFormState>({ value: '', error: '' });
  const [total2, setTotal2] = useState<CalculatorFormState>({ value: '', error: '' });
  const [result2, setResult2] = useState<number | null>(null);

  const [number3, setNumber3] = useState<CalculatorFormState>({ value: '', error: '' });
  const [percentage3, setPercentage3] = useState<CalculatorFormState>({ value: '', error: '' });
  const [isIncrease, setIsIncrease] = useState(true);
  const [result3, setResult3] = useState<number | null>(null);

  const validateNumber = (value: string, fieldName: string): string => {
    if (!value) return `${fieldName} is required`;
    const num = parseFloat(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < 0) return 'Please enter a positive number';
    return '';
  };

  const calculatePercentageOf = (e: FormEvent) => {
    e.preventDefault();
    
    const percentageError = validateNumber(percentage1.value, 'Percentage');
    const numberError = validateNumber(number1.value, 'Number');
    
    setPercentage1({ ...percentage1, error: percentageError });
    setNumber1({ ...number1, error: numberError });

    if (!percentageError && !numberError) {
      const result = (parseFloat(percentage1.value) / 100) * parseFloat(number1.value);
      setResult1(result);
    }
  };

  const calculateWhatPercentage = (e: FormEvent) => {
    e.preventDefault();
    
    const numberError = validateNumber(number2.value, 'Number');
    const totalError = validateNumber(total2.value, 'Total');
    
    setNumber2({ ...number2, error: numberError });
    setTotal2({ ...total2, error: totalError });

    if (!numberError && !totalError) {
      const totalNum = parseFloat(total2.value);
      if (totalNum === 0) {
        setTotal2({ ...total2, error: 'Total cannot be zero' });
        return;
      }
      const result = (parseFloat(number2.value) / totalNum) * 100;
      setResult2(result);
    }
  };

  const calculatePercentageChange = (e: FormEvent) => {
    e.preventDefault();
    
    const numberError = validateNumber(number3.value, 'Starting value');
    const percentageError = validateNumber(percentage3.value, 'Percentage');
    
    setNumber3({ ...number3, error: numberError });
    setPercentage3({ ...percentage3, error: percentageError });

    if (!numberError && !percentageError) {
      const baseNumber = parseFloat(number3.value);
      const percentageChange = parseFloat(percentage3.value) / 100;
      const result = isIncrease
        ? baseNumber + baseNumber * percentageChange
        : baseNumber - baseNumber * percentageChange;
      setResult3(result);
    }
  };

  return (
    <Container>
      <Title>Percentage Calculator</Title>

      <Grid>
        <CalculatorSection>
          <SectionTitle>What is X% of Y?</SectionTitle>
          <Form onSubmit={calculatePercentageOf}>
            <FormGroup>
              <Label>What is</Label>
              <Input
                type="number"
                step="any"
                value={percentage1.value}
                onChange={(e) => setPercentage1({ value: e.target.value, error: '' })}
                placeholder="X"
                required
                min="0"
              />
              <StyledText>% of</StyledText>
              <Input
                type="number"
                step="any"
                value={number1.value}
                onChange={(e) => setNumber1({ value: e.target.value, error: '' })}
                placeholder="Y"
                required
                min="0"
              />
            </FormGroup>
            {percentage1.error && <ErrorMessage>{percentage1.error}</ErrorMessage>}
            {number1.error && <ErrorMessage>{number1.error}</ErrorMessage>}
            <Button type="submit">Calculate</Button>
            {result1 !== null && (
              <Result>
                {percentage1.value}% of {number1.value} is {result1.toFixed(2)}
              </Result>
            )}
          </Form>
        </CalculatorSection>

        <CalculatorSection>
          <SectionTitle>X is what % of Y?</SectionTitle>
          <Form onSubmit={calculateWhatPercentage}>
            <FormGroup>
              <Input
                type="number"
                step="any"
                value={number2.value}
                onChange={(e) => setNumber2({ value: e.target.value, error: '' })}
                placeholder="X"
                required
                min="0"
              />
              <StyledText>is what % of</StyledText>
              <Input
                type="number"
                step="any"
                value={total2.value}
                onChange={(e) => setTotal2({ value: e.target.value, error: '' })}
                placeholder="Y"
                required
                min="0"
              />
            </FormGroup>
            {number2.error && <ErrorMessage>{number2.error}</ErrorMessage>}
            {total2.error && <ErrorMessage>{total2.error}</ErrorMessage>}
            <Button type="submit">Calculate</Button>
            {result2 !== null && (
              <Result>
                {number2.value} is {result2.toFixed(2)}% of {total2.value}
              </Result>
            )}
          </Form>
        </CalculatorSection>

        <CalculatorSection style={{ gridColumn: '1 / -1' }}>
          <SectionTitle>Calculate Value After Percentage Change</SectionTitle>
          <Form onSubmit={calculatePercentageChange}>
            <FormGroup>
              <Label>Starting value</Label>
              <Input
                type="number"
                step="any"
                value={number3.value}
                onChange={(e) => setNumber3({ value: e.target.value, error: '' })}
                placeholder="Value"
                required
                min="0"
              />
            </FormGroup>
            <FormGroup>
              <Label>Change by</Label>
              <Input
                type="number"
                step="any"
                value={percentage3.value}
                onChange={(e) => setPercentage3({ value: e.target.value, error: '' })}
                placeholder="%"
                required
                min="0"
              />
              <select
                value={isIncrease ? 'increase' : 'decrease'}
                onChange={(e) => setIsIncrease(e.target.value === 'increase')}
                style={{
                  padding: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="increase">Increase</option>
                <option value="decrease">Decrease</option>
              </select>
            </FormGroup>
            {number3.error && <ErrorMessage>{number3.error}</ErrorMessage>}
            {percentage3.error && <ErrorMessage>{percentage3.error}</ErrorMessage>}
            <Button type="submit">Calculate</Button>
            {result3 !== null && (
              <Result>
                {number3.value} {isIncrease ? 'increased' : 'decreased'} by {percentage3.value}% is{' '}
                {result3.toFixed(2)}
              </Result>
            )}
          </Form>
        </CalculatorSection>

        <div style={{ gridColumn: '1 / -1' }}>
          <PercentageDifferenceCalculator />
        </div>
      </Grid>
    </Container>
  );
}
