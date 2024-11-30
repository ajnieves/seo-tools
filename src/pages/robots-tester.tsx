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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  font-family: monospace;
  resize: vertical;
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
  padding: 1.5rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

const ResultTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const ResultText = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 0.5rem;
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

export default function RobotsTester() {
  const [url, setUrl] = useState('');
  const [robotsTxt, setRobotsTxt] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const [path, setPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!robotsTxt || !userAgent || !path) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch('/api/test-robots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ robotsTxt, userAgent, path }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to test robots.txt');
      }

      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Robots.txt Tester</Title>

      <Form onSubmit={handleSubmit}>
        <TextArea
          value={robotsTxt}
          onChange={(e) => setRobotsTxt(e.target.value)}
          placeholder="Enter robots.txt content"
          required
          disabled={loading}
        />
        <Input
          type="text"
          value={userAgent}
          onChange={(e) => setUserAgent(e.target.value)}
          placeholder="Enter User-agent (e.g., Googlebot)"
          required
          disabled={loading}
        />
        <Input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="Enter path to test (e.g., /blog)"
          required
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Testing...' : 'Test Access'}
        </Button>
      </Form>

      {loading && (
        <LoadingMessage>
          Testing robots.txt rules...
        </LoadingMessage>
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {result && (
        <ResultSection>
          <ResultTitle>Test Results</ResultTitle>
          <ResultText>
            Access for {userAgent} to {path}:{' '}
            <strong>{result.allowed ? 'Allowed' : 'Disallowed'}</strong>
          </ResultText>
          {result.matchedRule && (
            <ResultText>
              Matched rule: {result.matchedRule}
            </ResultText>
          )}
        </ResultSection>
      )}

      <AboutSection>
        <SectionTitle>About Robots.txt Tester</SectionTitle>
        <Text>
          The Robots.txt Tester helps you verify and debug your robots.txt file rules. It simulates how search engine crawlers interpret your robots.txt directives, ensuring your website's crawling and indexing instructions are working as intended.
        </Text>
        <Text>
          Key features include:
        </Text>
        <List>
          <ListItem>
            <strong>Rule Testing:</strong> Test specific paths against user-agent rules
          </ListItem>
          <ListItem>
            <strong>Rule Matching:</strong> See which specific rule matched your test case
          </ListItem>
          <ListItem>
            <strong>Syntax Validation:</strong> Verify your robots.txt follows proper formatting
          </ListItem>
          <ListItem>
            <strong>Multiple User-Agents:</strong> Test different crawler behaviors
          </ListItem>
        </List>
      </AboutSection>

      <FAQSection>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <FAQList>
          <FAQItem>
            <Question>What is robots.txt?</Question>
            <Answer>
              Robots.txt is a text file that tells search engine crawlers which pages or files they can or can't request from your site. It's part of the Robots Exclusion Protocol (REP), a standard used by websites to communicate with web crawlers and other web robots.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>How do I write robots.txt rules?</Question>
            <Answer>
              Robots.txt rules follow a specific format: start with User-agent: to specify which crawler the rules apply to, then use Allow: or Disallow: followed by the path. You can use wildcards (*) and end-of-line matches ($) for more complex patterns.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>What are common robots.txt mistakes?</Question>
            <Answer>
              Common mistakes include using incorrect syntax, blocking important resources, having conflicting rules, or using rules that are too broad. This tester helps identify these issues by showing exactly how crawlers interpret your rules.
            </Answer>
          </FAQItem>

          <FAQItem>
            <Question>Should I block search engines from my site?</Question>
            <Answer>
              Generally, you should only block search engines from accessing sensitive or duplicate content. Blocking search engines from important content can harm your SEO. Use this tool to ensure you're only blocking what you intend to block.
            </Answer>
          </FAQItem>
        </FAQList>
      </FAQSection>
    </Container>
  );
}
