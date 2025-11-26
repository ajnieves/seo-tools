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

export default function SitemapFAQSection() {
  return (
    <Section>
      <Title>Frequently Asked Questions</Title>
      <FAQList>
        <FAQItem>
          <Question>What is an XML sitemap?</Question>
          <Answer>
            An XML sitemap is a file that lists all the important URLs on your website. It helps search engines understand your website structure and ensures all your pages are discovered and indexed properly.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Why do I need a sitemap?</Question>
          <Answer>
            Sitemaps help search engines crawl your site more efficiently. They&apos;re especially important for large websites, new sites, sites with dynamic content, or sites that aren&apos;t well linked internally.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>What do the priority and change frequency values mean?</Question>
          <Answer>
            Priority (0.0 to 1.0) indicates the importance of a page relative to other pages. Change frequency tells search engines how often the page content typically changes (e.g., daily, weekly, monthly).
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>How do I submit my sitemap to search engines?</Question>
          <Answer>
            You can submit your sitemap through search engine webmaster tools (like Google Search Console), or include its URL in your robots.txt file. Our tool provides instructions for both methods.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>How often should I update my sitemap?</Question>
          <Answer>
            It&apos;s recommended to update your sitemap whenever you make significant changes to your website, such as adding new pages or removing old ones. For dynamic sites, consider updating it weekly or monthly.
          </Answer>
        </FAQItem>
      </FAQList>
    </Section>
  );
}
