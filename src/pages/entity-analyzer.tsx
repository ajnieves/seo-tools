import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container } from '@/components/shared/StyledComponents';
import SimpleEntityAnalyzer from '@/components/SimpleEntityAnalyzer';
import EntityHowItWorks from '@/components/EntityHowItWorks';
import EntityFAQ from '@/components/EntityFAQ';
import PageHead from '@/components/PageHead';

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: var(--space-6);
`;

const Input = styled.input`
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-color);
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px var(--primary-light);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Form = styled.form`
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
  padding: var(--space-4);
  background: var(--background-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
`;

const Button = styled.button`
  padding: var(--space-3) var(--space-6);
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: var(--primary-dark);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-light);
  }
`;

export default function EntityAnalyzer() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/entity-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze URL');
      }

      const data = await response.json();
      console.log('Analysis result:', data);
      setResult(data);
    } catch (err) {
      console.error('Error analyzing URL:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHead
        title="Entity Analyzer - Extract Named Entities from Web Pages"
        description="Analyze web pages to extract and categorize named entities like people, organizations, locations, and more using advanced natural language processing."
      />

      <Container>
        <Title>Entity Analyzer</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to analyze (e.g., https://example.com)"
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </Button>
        </Form>

        {error && (
          <div style={{ color: 'var(--error-color)', marginBottom: 'var(--space-4)' }}>
            {error}
          </div>
        )}

        {result && <SimpleEntityAnalyzer entities={result.entities} />}

        <EntityHowItWorks />
        <EntityFAQ />
      </Container>
    </>
  );
}
