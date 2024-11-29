import { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 2rem;
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

const Card = styled.div`
  padding: 2rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`;

const CardTitle = styled.h2`
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
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 255, 157, 0.1);
  }
`;

const Result = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 255, 157, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  color: var(--primary-color);
  font-weight: 600;
  text-align: center;
  font-size: 1.2rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 6px;
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

export default function PercentageCalculator() {
  // Percentage of a number
  const [number, setNumber] = useState('');
  const [percentage, setPercentage] = useState('');
  const [percentageResult, setPercentageResult] = useState<number | null>(null);

  // Percentage increase/decrease
  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [changeResult, setChangeResult] = useState<{ percentage: number; type: string } | null>(null);

  // Percentage difference
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [differenceResult, setDifferenceResult] = useState<number | null>(null);

  const calculatePercentage = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(number);
    const pct = parseFloat(percentage);
    if (!isNaN(num) && !isNaN(pct)) {
      setPercentageResult((num * pct) / 100);
    }
  };

  const calculateChange = (e: React.FormEvent) => {
    e.preventDefault();
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);
    if (!isNaN(original) && !isNaN(newVal)) {
      const change = ((newVal - original) / original) * 100;
      setChangeResult({
        percentage: Math.abs(change),
        type: change >= 0 ? 'increase' : 'decrease'
      });
    }
  };

  const calculateDifference = (e: React.FormEvent) => {
    e.preventDefault();
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);
    if (!isNaN(val1) && !isNaN(val2)) {
      const difference = Math.abs(((val1 - val2) / ((val1 + val2) / 2)) * 100);
      setDifferenceResult(difference);
    }
  };

  return (
    <Container>
      <Title>Percentage Calculator</Title>

      <CalculatorGrid>
        <Card>
          <CardTitle>Calculate Percentage of a Number</CardTitle>
          <Form onSubmit={calculatePercentage}>
            <InputGroup>
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Enter a number"
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="percentage">Percentage</Label>
              <Input
                id="percentage"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Enter percentage"
                required
              />
            </InputGroup>
            <Button type="submit">Calculate</Button>
            {percentageResult !== null && (
              <Result>
                {percentage}% of {number} = {percentageResult.toFixed(2)}
              </Result>
            )}
          </Form>
        </Card>

        <Card>
          <CardTitle>Calculate Percentage Change</CardTitle>
          <Form onSubmit={calculateChange}>
            <InputGroup>
              <Label htmlFor="originalValue">Original Value</Label>
              <Input
                id="originalValue"
                type="number"
                value={originalValue}
                onChange={(e) => setOriginalValue(e.target.value)}
                placeholder="Enter original value"
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="newValue">New Value</Label>
              <Input
                id="newValue"
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Enter new value"
                required
              />
            </InputGroup>
            <Button type="submit">Calculate</Button>
            {changeResult && (
              <Result>
                {changeResult.percentage.toFixed(2)}% {changeResult.type}
              </Result>
            )}
          </Form>
        </Card>

        <Card>
          <CardTitle>Calculate Percentage Difference</CardTitle>
          <Form onSubmit={calculateDifference}>
            <InputGroup>
              <Label htmlFor="value1">First Value</Label>
              <Input
                id="value1"
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder="Enter first value"
                required
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="value2">Second Value</Label>
              <Input
                id="value2"
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="Enter second value"
                required
              />
            </InputGroup>
            <Button type="submit">Calculate</Button>
            {differenceResult !== null && (
              <Result>
                {differenceResult.toFixed(2)}% difference
              </Result>
            )}
          </Form>
        </Card>
      </CalculatorGrid>
    </Container>
  );
}
