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

const ResultSection = styled.div`
  margin-top: 2rem;
`;

const CodeBlock = styled.pre`
  background: var(--surface-color);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  font-family: monospace;
  line-height: 1.4;
`;

export default function SitemapGenerator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sitemap, setSitemap] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('URL must start with http:// or https://');
      }

      setLoading(true);
      setSitemap('');

      const response = await fetch('/api/generate-sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate sitemap');
      }

      setSitemap(data.sitemap);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>XML Sitemap Generator</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL (e.g., https://example.com)"
          required
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Sitemap'}
        </Button>
      </Form>

      {loading && (
        <LoadingMessage>
          Crawling website and generating sitemap...
        </LoadingMessage>
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {sitemap && (
        <ResultSection>
          <CodeBlock>
            {sitemap}
          </CodeBlock>
        </ResultSection>
      )}
    </Container>
  );
}
