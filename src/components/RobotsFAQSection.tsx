import styled from '@emotion/styled';

const Section = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: var(--surface-color);
  border-radius: 16px;
  border: 1px solid var(--border-color);
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FAQItem = styled.div`
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Question = styled.h3`
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
`;

const Answer = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1.1rem;
`;

export default function RobotsFAQSection() {
  return (
    <Section>
      <Title>Frequently Asked Questions</Title>
      <FAQList>
        <FAQItem>
          <Question>What is a robots.txt file?</Question>
          <Answer>
            A robots.txt file is a text file placed in a website's root directory that provides instructions to search engine crawlers about which pages or sections of the site should or should not be crawled and indexed.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Why do I need to test my robots.txt?</Question>
          <Answer>
            Testing your robots.txt helps ensure your crawl directives are working as intended. Incorrect configurations can accidentally block important pages from search engines or allow access to pages you want to keep private.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What are the most common robots.txt directives?</Question>
          <Answer>
            The most common directives are User-agent (specifies which crawler the rules apply to), Allow (permits access to specific URLs), and Disallow (blocks access to specific URLs). Our tester supports all standard directives.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>How do wildcards work in robots.txt?</Question>
          <Answer>
            Wildcards like * and $ can be used to match multiple URLs with a single rule. For example, /*.pdf$ would match all PDF files. Our tester helps you understand how these pattern matches work.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Are robots.txt rules case-sensitive?</Question>
          <Answer>
            While robots.txt directives (like User-agent and Disallow) are case-insensitive, the URLs and paths in your rules are typically case-sensitive. Our tester helps you identify potential case-sensitivity issues.
          </Answer>
        </FAQItem>
      </FAQList>
    </Section>
  );
}
