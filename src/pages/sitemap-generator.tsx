'use client';
import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import SitemapGenerator from '@/components/SitemapGenerator';
import SitemapHowItWorks from '@/components/SitemapHowItWorks';
import SitemapFAQ from '@/components/SitemapFAQ';
import { Container } from '@/components/shared/StyledComponents';

const Title = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: var(--space-6);
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContentContainer = styled(Container)`
  max-width: 1200px;
`;

export default function SitemapGeneratorPage() {
  return (
    <>
      <PageHead page="sitemapGenerator" />
      <ContentContainer>
        <Title>XML Sitemap Generator</Title>
        <SitemapGenerator />
        <SitemapHowItWorks />
        <SitemapFAQ />
      </ContentContainer>
    </>
  );
}
