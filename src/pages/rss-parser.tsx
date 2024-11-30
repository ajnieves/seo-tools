import { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
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

const AboutSection = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`;

const SectionTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Text = styled.p`
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 1rem;
  font-size: 1.05rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FAQSection = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`;

const FAQList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const FAQItem = styled.div`
  padding: 1.5rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

const Question = styled.h3`
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Answer = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1rem;
`;

export default function RSSParser() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedData, setFeedData] = useState<any>(null);

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
            {feedData.items.map((item: any, index: number) => (
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

      <AboutSection>
        <SectionTitle>About RSS Feed Parser</SectionTitle>
        <Text>
          The RSS Feed Parser is a powerful tool that helps you analyze and validate RSS feeds. It provides a comprehensive view of feed content and structure, making it easy to understand and work with RSS feeds.
        </Text>
        <Text>
          Key features include:
        </Text>
        <List>
          <ListItem>
            <strong>Feed Validation:</strong> Ensures RSS feeds follow proper format and standards
          </ListItem>
          <ListItem>
            <strong>Content Preview:</strong> View feed items with titles, descriptions, and publication dates
          </ListItem>
          <ListItem>
            <strong>Link Verification:</strong> Checks that all feed links are valid and accessible
          </ListItem>
          <ListItem>
            <strong>Multiple Format Support:</strong> Handles RSS 2.0 and Atom feed formats
          </ListItem>
        </List>
      </AboutSection>

      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQList>
          <FAQItem>
            <Question>What is an RSS feed?</Question>
            <Answer>
              RSS (Really Simple Syndication) is a web feed format that allows users and applications to access updates to websites in a standardized, computer-readable format. It provides a way to easily distribute and consume content from blogs, news sites, and other online publishers.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>Why should I validate my RSS feed?</Question>
            <Answer>
              Validating your RSS feed ensures that it can be properly read by feed readers and aggregators. Invalid feeds may not display correctly or might be rejected by some services. Regular validation helps maintain compatibility and reliability.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>What feed formats are supported?</Question>
            <Answer>
              Our parser supports RSS 2.0 and Atom feed formats, which are the most commonly used standards. It can automatically detect the format and parse accordingly, providing consistent output regardless of the input format.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>How can I fix feed validation errors?</Question>
            <Answer>
              Common feed issues include invalid XML syntax, missing required elements, or incorrect date formats. Our parser provides detailed error messages to help identify and fix these issues. For specific errors, refer to the RSS 2.0 or Atom specifications.
            </Answer>
          </FAQItem>
        </FAQList>
      </FAQSection>
    </Container>
  );
}
