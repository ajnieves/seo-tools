import styled from '@emotion/styled';
import Link from 'next/link';
import PageHead from '@/components/PageHead';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const ToolsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const ToolCard = styled.div`
  padding: 2rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 255, 157, 0.1);
  }
`;

const ToolTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ToolDescription = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const tools = [
  {
    title: 'Entity Analyzer',
    description: 'Extract and analyze named entities from web content. Identify key subjects, organizations, locations, and more.',
    href: '/entity-analyzer',
  },
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
    title: 'Percentage Calculator',
    description: 'Calculate percentages easily. Find percentage increases, decreases, and differences between values.',
    href: '/percentage-calculator',
  },
];

export default function Home() {
  return (
    <>
      <PageHead page="home" />
      
      <Container>
        <Title>SEO Tools</Title>

        <ToolsGrid>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} passHref legacyBehavior>
              <a style={{ textDecoration: 'none' }}>
                <ToolCard>
                  <ToolTitle>{tool.title}</ToolTitle>
                  <ToolDescription>{tool.description}</ToolDescription>
                </ToolCard>
              </a>
            </Link>
          ))}
        </ToolsGrid>
      </Container>
    </>
  );
}
