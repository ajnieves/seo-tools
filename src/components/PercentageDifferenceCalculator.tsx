
import { useState, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/Button';

const Container = styled.div`
  grid-column: 1 / -1;
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

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

interface ResultProps {
  type: 'increase' | 'decrease';
}

const Result = styled.div<ResultProps>`
  background: ${props => props.type === 'increase' 
    ? 'rgba(0, 255, 157, 0.1)'
    : 'rgba(255, 77, 77, 0.1)'};
  border: 1px solid ${props => props.type === 'increase'
    ? 'rgba(0, 255, 157, 0.2)'
    : 'rgba(255, 77, 77, 0.2)'};
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  font-weight: 500;
  color: ${props => props.type === 'increase' ? '#00ff9d' : '#ff4d4d'};
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

export default function PercentageDifferenceCalculator() {
  const [startValue, setStartValue] = useState<CalculatorFormState>({ value: '', error: '' });
  const [endValue, setEndValue] = useState<CalculatorFormState>({ value: '', error: '' });
  const [diffResult, setDiffResult] = useState<{ percentage: number; type: 'increase' | 'decrease' } | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: (state: CalculatorFormState) => void) => {
    const value = e.target.value.replace(/[^\d.]/g, '');
    setter({ value, error: '' });
    setDiffResult(null); // Clear result when input changes
  };

  const validateNumber = (value: string, fieldName: string): string => {
    if (!value.trim()) return `${fieldName} is required`;
    const num = parseFloat(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < 0) return 'Please enter a positive number';
    return '';
  };

  const calculatePercentageDifference = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startError = validateNumber(startValue.value, 'Initial value');
    const endError = validateNumber(endValue.value, 'Final value');
    
    setStartValue({ ...startValue, error: startError });
    setEndValue({ ...endValue, error: endError });

    if (!startError && !endError) {
      const start = parseFloat(startValue.value);
      const end = parseFloat(endValue.value);
      
      if (start === 0) {
        setStartValue({ ...startValue, error: 'Initial value cannot be zero' });
        return;
      }

      const difference = end - start;
      const percentageChange = (Math.abs(difference) / start) * 100;
      const type = difference >= 0 ? 'increase' : 'decrease';
      
      setDiffResult({ percentage: percentageChange, type });
    }
  };

  const handleReset = () => {
    setStartValue({ value: '', error: '' });
    setEndValue({ value: '', error: '' });
    setDiffResult(null);
  };

  return (
    <Container>
      <CalculatorSection>
        <SectionTitle>What is the percentage increase/decrease?</SectionTitle>
        <Form onSubmit={calculatePercentageDifference} onReset={handleReset} noValidate>
          <FormGroup>
            <Label>Initial value</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={startValue.value}
              onChange={(e) => handleInputChange(e, setStartValue)}
              placeholder="From"
            />
          </FormGroup>
          <FormGroup>
            <Label>Final value</Label>
            <Input
              type="text"
              inputMode="decimal"
              value={endValue.value}
              onChange={(e) => handleInputChange(e, setEndValue)}
              placeholder="To"
            />
          </FormGroup>
          {startValue.error && <ErrorMessage>{startValue.error}</ErrorMessage>}
          {endValue.error && <ErrorMessage>{endValue.error}</ErrorMessage>}
          <FormGroup>
            <Button type="submit" style={{ flex: 1 }}>Calculate</Button>
            <Button type="reset" style={{ flex: 1 }}>Reset</Button>
          </FormGroup>
          {diffResult !== null && (
            <Result type={diffResult.type}>
              The value has {diffResult.type}d by {diffResult.percentage.toFixed(2)}%
              {diffResult.type === 'increase' ? ' ↑' : ' ↓'}
            </Result>
          )}
        </Form>
      </CalculatorSection>
    </Container>
  );
}
