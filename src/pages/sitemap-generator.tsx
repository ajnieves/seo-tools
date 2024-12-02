import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import SitemapGenerator from '@/components/SitemapGenerator';
import SitemapAboutSection from '@/components/SitemapAboutSection';
import SitemapFAQSection from '@/components/SitemapFAQSection';

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

export default function SitemapGeneratorPage() {
  return (
    <>
      <PageHead page="sitemapGenerator" />
      
      <Container>
        <Title>XML Sitemap Generator</Title>
        <SitemapGenerator />
        <SitemapAboutSection />
        <SitemapFAQSection />
      </Container>
    </>
  );
}
