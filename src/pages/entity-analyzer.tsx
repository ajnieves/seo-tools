import React, { useState } from 'react';
import styled from '@emotion/styled';
import SimpleEntityAnalyzer from '@/components/SimpleEntityAnalyzer';
import EntityHowItWorks from '@/components/EntityHowItWorks';
import EntityFAQ from '@/components/EntityFAQ';
import PageHead from '@/components/PageHead';
import { AnalysisResult } from '@/types/analysis';

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4);
`;

const Header = styled.header`
  margin-bottom: var(--space-6);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ToolSection = styled.section`
  margin-bottom: var(--space-8);
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
  
  &:disabled {
    background: var(--surface-hover);
    color: var(--text-secondary);
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  padding: var(--space-4);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-color);
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 3px solid var(--surface-hover);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  margin-bottom: var(--space-4);
  padding: var(--space-3);
  background: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius-md);
`;

export default function EntityAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze URL');
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze URL';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHead />
      <Main>
        <article>
          <Header>
            <Title>Entity Analyzer</Title>
          </Header>

          <ToolSection aria-label="Entity Analyzer Tool">
            <Form onSubmit={handleSubmit} role="search">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to analyze (e.g., https://example.com)"
                disabled={loading}
                aria-label="URL to analyze"
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze'}
              </Button>
            </Form>

            {loading && (
              <LoadingMessage>
                <div className="spinner" />
                <div>
                  <strong>🤖 Analyzing with AI-powered entity recognition...</strong>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    First-time use may take 10-30 seconds to initialize the model
                  </div>
                </div>
              </LoadingMessage>
            )}

            {error && (
              <ErrorMessage role="alert">
                {error}
              </ErrorMessage>
            )}

            {result && <SimpleEntityAnalyzer entities={result.entities} />}
          </ToolSection>

          <EntityHowItWorks />
          <EntityFAQ />
        </article>
      </Main>
    </>
  );
}
