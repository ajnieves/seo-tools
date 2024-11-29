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

const Form = styled.form`
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: var(--surface-color);
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

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 1rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  font-size: 1rem;
  font-family: monospace;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 255, 157, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
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

const ResultSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

const ResultTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ResultText = styled.p<{ allowed?: boolean }>`
  color: ${props => props.allowed ? '#4CAF50' : '#f44336'};
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 77, 77, 0.1);
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 8px;
`;

export default function RobotsTester() {
  const [robotsTxt, setRobotsTxt] = useState('');
  const [userAgent, setUserAgent] = useState('Googlebot');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<{ allowed: boolean; reason: string } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!robotsTxt.trim() || !userAgent.trim() || !url.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/test-robots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          robotsTxt,
          userAgent,
          url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to test robots.txt');
      }

      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Container>
      <Title>Robots.txt Tester</Title>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="robotsTxt">Robots.txt Content</Label>
          <TextArea
            id="robotsTxt"
            value={robotsTxt}
            onChange={(e) => setRobotsTxt(e.target.value)}
            placeholder="User-agent: *&#10;Disallow: /private/&#10;Allow: /public/"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="userAgent">User Agent</Label>
          <Input
            id="userAgent"
            type="text"
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            placeholder="e.g., Googlebot"
            required
          />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="url">URL to Test</Label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/path/to/test"
            required
          />
        </InputGroup>

        <Button type="submit">Test Access</Button>
      </Form>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {result && (
        <ResultSection>
          <ResultTitle>Test Result</ResultTitle>
          <ResultText allowed={result.allowed}>
            {result.allowed ? 'Access Allowed ✓' : 'Access Denied ✗'}
          </ResultText>
          <p>{result.reason}</p>
        </ResultSection>
      )}
    </Container>
  );
}
