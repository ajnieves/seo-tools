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

const CodeBlock = styled.pre`
  background: var(--surface-color);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  font-family: monospace;
  line-height: 1.4;
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

      <AboutSection>
        <SectionTitle>About XML Sitemap Generator</SectionTitle>
        <Text>
          The XML Sitemap Generator is a powerful tool that helps search engines better understand and index your website's structure. It automatically crawls your website and creates a standardized XML sitemap that follows search engine guidelines.
        </Text>
        <Text>
          Key features include:
        </Text>
        <List>
          <ListItem>
            <strong>Automatic Crawling:</strong> Discovers all accessible pages on your website
          </ListItem>
          <ListItem>
            <strong>Priority Assignment:</strong> Automatically assigns priority based on page hierarchy
          </ListItem>
          <ListItem>
            <strong>Last Modified Dates:</strong> Includes last modification timestamps
          </ListItem>
          <ListItem>
            <strong>Search Engine Compatible:</strong> Follows Google, Bing, and other search engine specifications
          </ListItem>
        </List>
      </AboutSection>

      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQList>
          <FAQItem>
            <Question>What is an XML sitemap?</Question>
            <Answer>
              An XML sitemap is a file that lists all important URLs on your website, helping search engines discover and understand your content structure. It includes additional information like last update time and relative importance of pages.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>Why do I need a sitemap?</Question>
            <Answer>
              Sitemaps help search engines crawl your site more efficiently, ensuring better indexing of your content. They're especially important for large websites, new sites, or sites with complex navigation structures.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>How often should I update my sitemap?</Question>
            <Answer>
              It's recommended to update your sitemap whenever significant changes are made to your website, such as adding new pages or updating existing content. For regularly updated sites, consider regenerating your sitemap weekly or monthly.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>Where should I put my sitemap?</Question>
            <Answer>
              Place your sitemap.xml file in your website's root directory (e.g., https://example.com/sitemap.xml). You should also reference it in your robots.txt file and submit it through search engine webmaster tools.
            </Answer>
          </FAQItem>
        </FAQList>
      </FAQSection>
    </Container>
  );
}
