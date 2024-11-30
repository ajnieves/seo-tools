'use client';
import { useState } from 'react';
import styled from '@emotion/styled';

interface Entity {
  name: string;
  type: string;
  salience: number;
}

interface AnalysisResult {
  entities: Entity[];
  sentiment: string;
}

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.2rem;
  letter-spacing: -0.02em;
`;

const Form = styled.form`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
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

const LoadingMessage = styled.div`
  color: var(--primary-color);
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 77, 77, 0.1);
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 8px;
`;

const ResultsSection = styled.div`
  margin-bottom: 2rem;
`;

const SentimentBadge = styled.div<{ sentiment: string }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(0, 255, 157, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const EntityList = styled.div`
  display: grid;
  gap: 1rem;
`;

const EntityItem = styled.div`
  padding: 1.5rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 157, 0.1);
  }
`;

const EntityName = styled.h3`
  color: var(--primary-color);
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  letter-spacing: -0.01em;
`;

const EntityDetail = styled.p`
  color: var(--text-color);
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;

  & + & {
    margin-top: 0.25rem;
  }
`;

const ResultsTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.8rem;
  letter-spacing: -0.02em;
  text-align: center;
`;

export default function EntityAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/entity-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze URL');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Analyze Content</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to analyze (e.g., https://example.com)"
          disabled={loading}
          required
        />
        <Button type="submit" disabled={loading || !url}>
          {loading ? 'Analyzing...' : 'Analyze URL'}
        </Button>
      </Form>

      {loading && (
        <LoadingMessage>
          Analyzing content...
        </LoadingMessage>
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {result && (
        <ResultsSection>
          <ResultsTitle>Analysis Results</ResultsTitle>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <SentimentBadge sentiment={result.sentiment}>
              {result.sentiment} Sentiment
            </SentimentBadge>
          </div>

          <EntityList>
            {result.entities.map((entity, index) => (
              <EntityItem key={index}>
                <EntityName>{entity.name}</EntityName>
                <EntityDetail>Type: {entity.type}</EntityDetail>
                <EntityDetail>Salience: {(entity.salience * 100).toFixed(2)}%</EntityDetail>
              </EntityItem>
            ))}
          </EntityList>
        </ResultsSection>
      )}
    </Container>
  );
}
