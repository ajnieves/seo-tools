import { useState } from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import {
  Container,
  Card,
  Grid,
  Form,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  LoadingContainer
} from './shared/StyledComponents';

interface FeedItem {
  title: string;
  description: string;
  pubDate: string;
  link?: string;
}

const FeedItemCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  background: var(--surface-color);
  
  &:hover {
    border-color: var(--primary-color);
  }
`;

const ItemTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.1rem;
  font-weight: 600;
`;

const ItemDate = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const ItemDescription = styled.p`
  color: var(--text-color);
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemLink = styled.a`
  color: var(--primary-color);
  font-size: 0.9rem;
  text-decoration: none;
  margin-top: auto;
  padding-top: var(--space-2);

  &:hover {
    text-decoration: underline;
  }
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
    <Container>
      <Card>
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
          <LoadingContainer>
            <div className="loader"></div>
            <p>Parsing RSS feed...</p>
          </LoadingContainer>
        )}

        {error && (
          <ErrorMessage>{error}</ErrorMessage>
        )}

        {feedItems.length > 0 && (
          <Grid columns={2}>
            {feedItems.map((item, index) => (
              <FeedItemCard key={index}>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDate>{new Date(item.pubDate).toLocaleDateString()}</ItemDate>
                <ItemDescription>{item.description}</ItemDescription>
                {item.link && (
                  <ItemLink href={item.link} target="_blank" rel="noopener noreferrer">
                    Read more →
                  </ItemLink>
                )}
              </FeedItemCard>
            ))}
          </Grid>
        )}
      </Card>
    </Container>
  );
}
