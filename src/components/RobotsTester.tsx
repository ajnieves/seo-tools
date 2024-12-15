'use client';
import { useState } from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import RobotsFetcher from './RobotsFetcher';
import {
  Container,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  TextArea,
  Select,
  ErrorMessage
} from './shared/StyledComponents';

interface TestResult {
  allowed: boolean;
  matchedRule: string;
  explanation: string;
}

const ResultContainer = styled(Card)<{ allowed: boolean }>`
  margin-top: var(--space-6);
  background: ${props => props.allowed 
    ? 'rgba(0, 229, 176, 0.1)'
    : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.allowed
    ? 'var(--success-color)'
    : 'var(--error-color)'};
`;

const ResultTitle = styled.h3<{ allowed: boolean }>`
  color: ${props => props.allowed ? 'var(--success-color)' : 'var(--error-color)'};
  font-size: 1.2rem;
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

const ResultDetails = styled.div`
  color: var(--text-color);
  font-size: 0.9rem;
  line-height: 1.6;

  code {
    background: var(--surface-hover);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-family: monospace;
  }

  p {
    margin-bottom: var(--space-2);
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
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
    <Container>
      <Card>
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
            <TextAreaWrapper>
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
            </TextAreaWrapper>
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

        {error && <ErrorMessage>{error}</ErrorMessage>}

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
      </Card>
    </Container>
  );
}
