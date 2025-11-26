import styled from '@emotion/styled';
import Link from 'next/link';
import PageHead from '@/components/PageHead';

const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
`;

const ToolsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const ToolCard = styled.article`
  padding: 1.5rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 229, 176, 0.1);
    border-color: var(--primary-color);
  }
`;

const ToolTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
`;

const ToolDescription = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 0;
  font-size: 0.95rem;
`;

const ToolLink = styled(Link)`
  text-decoration: none;
  display: block;
  height: 100%;
`;

// All available tools organized by category
const seoTools = [
  {
    title: 'XML Sitemap Generator',
    description: 'Generate XML sitemaps for your website to help search engines better understand and index your content structure.',
    href: '/sitemap-generator',
  },
  {
    title: 'RSS Feed Parser',
    description: 'Parse and validate RSS feeds to ensure proper syndication. Check feed structure and content compatibility.',
    href: '/rss-parser',
  },
  {
    title: 'Robots.txt Tester',
    description: 'Test and validate your robots.txt file to ensure proper search engine crawling directives.',
    href: '/robots-tester',
  },
  {
    title: 'Article Evaluator',
    description: 'Analyze your articles for SEO optimization with AI-powered recommendations for H1, meta title, and description.',
    href: '/article-evaluator',
  },
  {
    title: 'Entity Analyzer',
    description: 'Extract and analyze named entities from web content to understand key subjects, organizations, and locations.',
    href: '/entity-analyzer',
  },
];

const utilityTools = [
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages easily. Find percentage increases, decreases, and differences between values.',
    href: '/percentage-calculator',
  },
];

export default function Home() {
  return (
    <>
      <PageHead />
      
      <Main>
        <Header>
          <Title>SEO Tools</Title>
          <Subtitle>
            A comprehensive suite of free tools designed to help you optimize your website&apos;s 
            SEO performance and improve your online visibility.
          </Subtitle>
        </Header>

        <Section aria-labelledby="seo-tools-heading">
          <SectionTitle id="seo-tools-heading">Technical SEO Tools</SectionTitle>
          <ToolsGrid role="list">
            {seoTools.map((tool) => (
              <ToolLink key={tool.href} href={tool.href}>
                <ToolCard role="listitem">
                  <ToolTitle>{tool.title}</ToolTitle>
                  <ToolDescription>{tool.description}</ToolDescription>
                </ToolCard>
              </ToolLink>
            ))}
          </ToolsGrid>
        </Section>

        <Section aria-labelledby="utility-tools-heading">
          <SectionTitle id="utility-tools-heading">Utility Tools</SectionTitle>
          <ToolsGrid role="list">
            {utilityTools.map((tool) => (
              <ToolLink key={tool.href} href={tool.href}>
                <ToolCard role="listitem">
                  <ToolTitle>{tool.title}</ToolTitle>
                  <ToolDescription>{tool.description}</ToolDescription>
                </ToolCard>
              </ToolLink>
            ))}
          </ToolsGrid>
        </Section>
      </Main>
    </>
  );
}
