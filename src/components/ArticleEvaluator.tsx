
import React, { useState } from 'react';
import styled from '@emotion/styled';
import LoadingSpinner from './LoadingSpinner';
import {
  Container,
  Card,
  Form,
  FormGroup,
  Input,
  ErrorMessage,
  LoadingContainer
} from './shared/StyledComponents';

interface EvaluationResult {
  currentH1: string;
  currentMetaTitle: string;
  currentMetaDescription: string;
  recommendedH1: string;
  recommendedMetaTitle: string;
  recommendedMetaDescription: string;
  sentiment?: {
    type: 'positive' | 'neutral' | 'negative';
    explanation: string;
  };
}

type TabType = 'seo' | 'sentiment';

const SearchBar = styled.div`
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  flex-direction: column;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-color);
  font-size: 0.9rem;
  cursor: pointer;

  input {
    width: 1rem;
    height: 1rem;
    margin: 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-color);
`;

const Tab = styled.button<{ active: boolean }>`
  padding: var(--space-3) var(--space-4);
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
  border-bottom: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  background: none;
  font-weight: ${props => props.active ? '600' : '400'};
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-4);

  th, td {
    padding: var(--space-4);
    border: 1px solid var(--border-color);
    text-align: left;
  }

  th {
    background: var(--surface-hover);
    color: var(--primary-color);
    font-weight: 600;
  }

  td {
    vertical-align: top;
  }
`;

const Content = styled.div`
  margin-bottom: var(--space-2);
`;

const MetaInfo = styled.div<{ status: 'success' | 'warning' | 'error' }>`
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  color: ${props => {
    switch (props.status) {
      case 'success': return 'var(--success-color)';
      case 'warning': return 'var(--warning-color)';
      case 'error': return 'var(--error-color)';
      default: return 'var(--text-color)';
    }
  }};
  background: ${props => {
    switch (props.status) {
      case 'success': return 'rgba(16, 185, 129, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'error': return 'rgba(239, 68, 68, 0.1)';
      default: return 'var(--surface-hover)';
    }
  }};
`;

const SentimentCell = styled.td<{ type: string }>`
  color: ${props => {
    switch (props.type) {
      case 'positive': return 'var(--success-color)';
      case 'negative': return 'var(--error-color)';
      default: return 'var(--text-color)';
    }
  }};
  font-weight: 600;
  text-transform: capitalize;
`;

export default function ArticleEvaluator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState('');
  const [includeSentiment, setIncludeSentiment] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('seo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/evaluate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, includeSentiment }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to evaluate article');
      }

      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to evaluate article. Please check the URL and try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (text: string, min: number, max: number): 'success' | 'warning' | 'error' => {
    const count = text.length;
    if (count < min) return 'warning';
    if (count > max) return 'error';
    return 'success';
  };

  const getStatusText = (text: string, min: number, max: number) => {
    const count = text.length;
    return `${count}/${max}`;
  };

  return (
    <Container>
      <Card>
        <Form onSubmit={handleSubmit}>
          <SearchBar>
            <InputGroup>
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter article URL"
                required
              />
              <Toggle>
                <input
                  type="checkbox"
                  checked={includeSentiment}
                  onChange={(e) => setIncludeSentiment(e.target.checked)}
                />
                Include Sentiment Analysis
              </Toggle>
            </InputGroup>
            <button type="submit" disabled={loading || !url.trim()}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </SearchBar>
        </Form>

        {loading && (
          <LoadingContainer>
            <LoadingSpinner />
            <p>Analyzing article metadata...</p>
          </LoadingContainer>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {result && (
          <>
            <Tabs>
              <Tab
                active={activeTab === 'seo'}
                onClick={() => setActiveTab('seo')}
              >
                SEO Analysis
              </Tab>
              {includeSentiment && result.sentiment && (
                <Tab
                  active={activeTab === 'sentiment'}
                  onClick={() => setActiveTab('sentiment')}
                >
                  Sentiment Analysis
                </Tab>
              )}
            </Tabs>

            {activeTab === 'seo' && (
              <Table>
                <thead>
                  <tr>
                    <th>Element</th>
                    <th>Current</th>
                    <th>Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>H1</th>
                    <td>
                      <Content>{result.currentH1 || 'Not found'}</Content>
                    </td>
                    <td>
                      <Content>{result.recommendedH1}</Content>
                    </td>
                  </tr>
                  <tr>
                    <th>Meta Title</th>
                    <td>
                      <Content>{result.currentMetaTitle || 'Not found'}</Content>
                      <MetaInfo status={getStatus(result.currentMetaTitle, 50, 60)}>
                        {getStatusText(result.currentMetaTitle, 50, 60)}
                      </MetaInfo>
                    </td>
                    <td>
                      <Content>{result.recommendedMetaTitle}</Content>
                      <MetaInfo status={getStatus(result.recommendedMetaTitle, 50, 60)}>
                        {getStatusText(result.recommendedMetaTitle, 50, 60)}
                      </MetaInfo>
                    </td>
                  </tr>
                  <tr>
                    <th>Meta Description</th>
                    <td>
                      <Content>{result.currentMetaDescription || 'Not found'}</Content>
                      <MetaInfo status={getStatus(result.currentMetaDescription, 150, 160)}>
                        {getStatusText(result.currentMetaDescription, 150, 160)}
                      </MetaInfo>
                    </td>
                    <td>
                      <Content>{result.recommendedMetaDescription}</Content>
                      <MetaInfo status={getStatus(result.recommendedMetaDescription, 150, 160)}>
                        {getStatusText(result.recommendedMetaDescription, 150, 160)}
                      </MetaInfo>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}

            {activeTab === 'sentiment' && result.sentiment && (
              <Table>
                <thead>
                  <tr>
                    <th>Sentiment</th>
                    <th>Explanation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <SentimentCell type={result.sentiment.type}>
                      {result.sentiment.type}
                    </SentimentCell>
                    <td>{result.sentiment.explanation}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </>
        )}
      </Card>
    </Container>
  );
}
