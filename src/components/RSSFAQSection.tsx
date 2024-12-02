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

export default function RSSFAQSection() {
  return (
    <Section>
      <Title>Frequently Asked Questions</Title>
      <FAQList>
        <FAQItem>
          <Question>What is an RSS feed?</Question>
          <Answer>
            RSS (Really Simple Syndication) is a web feed format that allows users and applications to access updates from websites in a standardized, computer-readable format. It enables automatic content distribution and syndication.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What feed formats are supported?</Question>
          <Answer>
            Our parser supports all major feed formats including RSS 2.0 (most common), RSS 1.0, and Atom feeds. It automatically detects the format and parses accordingly.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Why should I validate my RSS feed?</Question>
          <Answer>
            Validating your RSS feed ensures it's properly formatted and can be read by feed readers and aggregators. Invalid feeds may not display correctly or might be rejected by some services.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What information can I extract from an RSS feed?</Question>
          <Answer>
            You can extract feed title, description, publication date, author information, entry content, media attachments, and various other metadata depending on what's included in the feed.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>How can I fix common RSS feed errors?</Question>
          <Answer>
            Our parser provides detailed error messages and suggestions for fixing common issues like malformed XML, missing required elements, or incorrect date formats. Follow the provided recommendations to resolve these issues.
          </Answer>
        </FAQItem>
      </FAQList>
    </Section>
  );
}
