'use client';
import { useState } from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import RobotsFetcher from './RobotsFetcher';

interface TestResult {
  allowed: boolean;
  matchedRule: string;
  explanation: string;
}

const TesterSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  grid-column: 1 / -1;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  min-width: 120px;
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

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  width: 100%;
  min-height: 200px;
  resize: vertical;
  font-family: monospace;
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

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a8e8;
    box-shadow: 0 0 0 2px rgba(0, 168, 232, 0.2);
  }

  option {
    background: #1a1a2e;
    color: white;
  }
`;

const ResultContainer = styled.div<{ allowed: boolean }>`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: ${props => props.allowed 
    ? 'rgba(0, 255, 157, 0.1)'
    : 'rgba(255, 77, 77, 0.1)'};
  border: 1px solid ${props => props.allowed
    ? 'rgba(0, 255, 157, 0.2)'
    : 'rgba(255, 77, 77, 0.2)'};
`;

const ResultTitle = styled.h3<{ allowed: boolean }>`
  color: ${props => props.allowed ? '#00ff9d' : '#ff4d4d'};
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ResultDetails = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.6;

  code {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: monospace;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  padding: 1rem;
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 12px;
  background: rgba(255, 77, 77, 0.1);
  margin-top: 1rem;
`;

export default function RobotsTester() {
  const [robotsTxt, setRobotsTxt] = useState('');
  const [url, setUrl] = useState('');
  const [userAgent, setUserAgent] = useState('Googlebot');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/test-robots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ robotsTxt, url, userAgent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to test robots.txt');
      }

      setResult(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while testing robots.txt';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TesterSection>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="test-url">Test URL</Label>
          <Input
            id="test-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/page-to-test"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="robots-txt">Robots.txt Content</Label>
          <div style={{ width: '100%' }}>
            <TextArea
              id="robots-txt"
              value={robotsTxt}
              onChange={(e) => setRobotsTxt(e.target.value)}
              placeholder="User-agent: *&#10;Disallow: /private/&#10;Allow: /public/"
              required
            />
            <RobotsFetcher 
              url={url} 
              onContentFetched={setRobotsTxt}
            />
          </div>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="user-agent">User Agent</Label>
          <Select
            id="user-agent"
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
          >
            <option value="Googlebot">Googlebot</option>
            <option value="Bingbot">Bingbot</option>
            <option value="Baiduspider">Baiduspider</option>
            <option value="*">All robots (*)</option>
            <option value="custom">Custom</option>
          </Select>
        </FormGroup>

        {userAgent === 'custom' && (
          <FormGroup>
            <Label htmlFor="custom-agent">Custom Agent</Label>
            <Input
              id="custom-agent"
              type="text"
              placeholder="Enter custom user agent"
              required
            />
          </FormGroup>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Testing...' : 'Test Access'}
        </Button>
      </Form>

      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      {result && (
        <ResultContainer allowed={result.allowed}>
          <ResultTitle allowed={result.allowed}>
            {result.allowed ? '✓ URL is Allowed' : '✕ URL is Blocked'}
          </ResultTitle>
          <ResultDetails>
            <p><strong>Matched Rule:</strong> <code>{result.matchedRule}</code></p>
            <p>{result.explanation}</p>
          </ResultDetails>
        </ResultContainer>
      )}
    </TesterSection>
  );
}
