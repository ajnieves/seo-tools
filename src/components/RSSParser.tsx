'use client';
import { useState } from 'react';
import styled from '@emotion/styled';
import Button from './Button';

interface FeedItem {
  title: string;
  description: string;
  pubDate: string;
  link?: string;
}

const ParserSection = styled.div`
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
  min-width: 100px;
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

const ResultsContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FeedItemCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }
`;

const ItemTitle = styled.h3`
  color: #00a8e8;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ItemDate = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const ItemDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  padding: 1rem;
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 12px;
  background: rgba(255, 77, 77, 0.1);
  margin-top: 1rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #00a8e8;
`;

export default function RSSParser() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/parse-rss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to parse RSS feed');
      }

      setFeedItems(data.items);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while parsing the RSS feed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParserSection>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="rss-url">RSS Feed URL</Label>
          <Input
            id="rss-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/feed.xml"
            required
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'Parsing...' : 'Parse Feed'}
        </Button>
      </Form>

      {loading && (
        <LoadingSpinner>Loading...</LoadingSpinner>
      )}

      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      {feedItems.length > 0 && (
        <ResultsContainer>
          {feedItems.map((item, index) => (
            <FeedItemCard key={index}>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDate>{new Date(item.pubDate).toLocaleDateString()}</ItemDate>
              <ItemDescription>{item.description}</ItemDescription>
            </FeedItemCard>
          ))}
        </ResultsContainer>
      )}
    </ParserSection>
  );
}
