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

const FeedInfo = styled.div`
  padding: 1.5rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const FeedTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const FeedDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ItemsList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const FeedItem = styled.div`
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

const ItemTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const ItemMeta = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ItemDescription = styled.p`
  color: var(--text-color);
  line-height: 1.6;
`;

interface FeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

interface FeedData {
  title: string;
  description: string;
  link: string;
  items: FeedItem[];
}

export default function RSSParser() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedData, setFeedData] = useState<FeedData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setFeedData(null);

      const response = await fetch('/api/parse-rss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse RSS feed');
      }

      setFeedData(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>RSS Feed Parser</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter RSS feed URL (e.g., https://example.com/feed.xml)"
          required
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Parsing...' : 'Parse Feed'}
        </Button>
      </Form>

      {loading && (
        <LoadingMessage>
          Parsing RSS feed...
        </LoadingMessage>
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {feedData && (
        <ResultSection>
          <FeedInfo>
            <FeedTitle>{feedData.title}</FeedTitle>
            <FeedDescription>{feedData.description}</FeedDescription>
            <a href={feedData.link} target="_blank" rel="noopener noreferrer">Visit Website</a>
          </FeedInfo>

          <ItemsList>
            {feedData.items.map((item, index) => (
              <FeedItem key={index}>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemMeta>
                  Published: {new Date(item.pubDate).toLocaleDateString()}
                </ItemMeta>
                <ItemDescription>{item.description}</ItemDescription>
                <a href={item.link} target="_blank" rel="noopener noreferrer">Read More</a>
              </FeedItem>
            ))}
          </ItemsList>
        </ResultSection>
      )}
    </Container>
  );
}
