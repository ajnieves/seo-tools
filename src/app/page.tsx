'use client';
import styled from '@emotion/styled';
import Link from 'next/link';
import Script from 'next/script';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  overflow-x: hidden;
  position: relative;

  @media (min-width: 768px) {
    min-height: 100vh;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
  flex: 1;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const Hero = styled.section`
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
    margin-bottom: 3rem;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #00a8e8, #00ff9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  padding: 0 0.5rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    padding: 0;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  padding: 0 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    padding: 0;
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

const Card = styled(Link)`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: auto;
  min-height: 140px;

  @media (min-width: 768px) {
    padding: 2rem;
    min-height: 180px;
    gap: 1rem;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }

  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  background: linear-gradient(135deg, #00a8e8, #00ff9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  font-size: 0.95rem;
  margin: 0;
  flex-grow: 1;

  @media (min-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const tools = [
  {
    title: 'XML Sitemap Generator',
    description: 'Generate XML sitemaps for your website with support for images and custom settings.',
    href: '/sitemap-generator'
  },
  {
    title: 'RSS Feed Parser',
    description: 'Parse and analyze RSS feeds with an easy-to-use interface and detailed results.',
    href: '/rss-parser'
  },
  {
    title: 'Robots.txt Tester',
    description: 'Test your robots.txt configuration and verify crawler access to your pages.',
    href: '/robots-tester'
  },
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages with ease using our versatile percentage calculator.',
    href: '/percentage-calculator'
  }
];

export default function Home() {
  return (
    <>
      <Script id="schema-org" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "SEO Tools",
            "description": "A comprehensive suite of SEO tools including XML sitemap generator, RSS feed parser, robots.txt tester, and percentage calculator.",
            "applicationCategory": "WebApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "XML Sitemap Generator",
              "RSS Feed Parser",
              "Robots.txt Tester",
              "Percentage Calculator"
            ]
          }
        `}
      </Script>

      <Container>
        <Hero>
          <HeroContent>
            <Title>Welcome to SEO Tools</Title>
            <Description>
              A collection of powerful tools designed to help you optimize your website&apos;s SEO.
              Choose from our suite of professional tools below to get started.
            </Description>
          </HeroContent>
        </Hero>
        <ContentWrapper>
          <h2 className="sr-only">Available Tools</h2>
          <Grid role="list" aria-label="SEO Tools">
            {tools.map((tool, index) => (
              <Card 
                key={index} 
                href={tool.href}
                role="listitem"
                aria-labelledby={`tool-title-${index}`}
              >
                <CardTitle id={`tool-title-${index}`}>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </Card>
            ))}
          </Grid>
        </ContentWrapper>
      </Container>
    </>
  );
}
