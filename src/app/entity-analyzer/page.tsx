'use client';
import { useState } from 'react';
import styled from '@emotion/styled';
import UrlAnalyzerForm from '@/components/UrlAnalyzerForm';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Section = styled.section`
  margin: 3rem 0;
`;

const SectionTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const AboutText = styled.p`
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 1rem;
  font-size: 1.05rem;
`;

const FAQList = styled.div`
  display: grid;
  gap: 2rem;
`;

const FAQItem = styled.div`
  h3 {
    color: var(--primary-color);
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  p {
    color: var(--text-color);
    line-height: 1.6;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: var(--surface-color);
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  th {
    background: rgba(0, 255, 157, 0.1);
    color: var(--primary-color);
    font-weight: 600;
  }

  td {
    color: var(--text-color);
  }

  tr:last-child {
    td {
      border-bottom: none;
    }
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

export default function EntityAnalyzerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (url: string) => {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze URL');
      }

      // Handle successful response
      console.log('Analysis complete:', data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Entity Analyzer</Title>
      <Subtitle>
        Extract and analyze named entities from any webpage with our advanced natural language processing tool
      </Subtitle>

      <UrlAnalyzerForm onSubmit={handleAnalyze} loading={loading} />

      {loading && <LoadingMessage>Analyzing content...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Section>
        <SectionTitle>About Entity Analysis</SectionTitle>
        <AboutText>
          The Entity Analyzer tool uses advanced natural language processing to identify and extract named entities from web content. It helps you understand the key subjects, organizations, locations, and other important elements mentioned in any webpage.
        </AboutText>
        <AboutText>
          Our tool not only identifies entities but also determines their relevance and the overall sentiment of the content, providing valuable insights for content analysis and SEO optimization.
        </AboutText>
      </Section>

      <Section>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQList>
          <FAQItem>
            <h3>Entity Types Reference</h3>
            <p>
              Our analyzer categorizes entities into the following types:
            </p>
            <Table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PERSON</td>
                  <td>Individual names and personas</td>
                  <td>Albert Einstein, Leonardo da Vinci</td>
                </tr>
                <tr>
                  <td>ORGANIZATION</td>
                  <td>Companies, institutions, and groups</td>
                  <td>Google, United Nations, NASA</td>
                </tr>
                <tr>
                  <td>LOCATION</td>
                  <td>Places and geographical areas</td>
                  <td>Paris, Mount Everest, Pacific Ocean</td>
                </tr>
                <tr>
                  <td>EVENT</td>
                  <td>Historical events and occurrences</td>
                  <td>World War II, Olympics</td>
                </tr>
                <tr>
                  <td>WORK</td>
                  <td>Creative works and products</td>
                  <td>Mona Lisa, iPhone, Harry Potter</td>
                </tr>
              </tbody>
            </Table>
          </FAQItem>

          <FAQItem>
            <h3>Sentiment Categories</h3>
            <p>
              The sentiment analysis classifies content tone into these categories:
            </p>
            <Table>
              <thead>
                <tr>
                  <th>Sentiment</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Positive</td>
                  <td>Content expresses approval, optimism, or favorable views</td>
                </tr>
                <tr>
                  <td>Negative</td>
                  <td>Content expresses criticism, pessimism, or unfavorable views</td>
                </tr>
                <tr>
                  <td>Neutral</td>
                  <td>Content maintains an objective or balanced perspective</td>
                </tr>
              </tbody>
            </Table>
          </FAQItem>

          <FAQItem>
            <h3>What is entity salience?</h3>
            <p>
              Salience is a percentage that indicates how important or central an entity is to the overall content. A higher percentage (e.g., 80%) means the entity is a major focus of the text, while a lower percentage suggests it plays a more minor role. This helps identify the most significant subjects in the content.
            </p>
          </FAQItem>

          <FAQItem>
            <h3>How can I use this for SEO?</h3>
            <p>
              Entity analysis helps optimize content by identifying key topics and their relationships, ensuring proper coverage of relevant subjects, and understanding content sentiment. This information can guide content strategy, help target specific topics more effectively, and improve topical authority.
            </p>
          </FAQItem>
        </FAQList>
      </Section>
    </Container>
  );
}
