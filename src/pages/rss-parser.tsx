import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import RSSParser from '@/components/RSSParser';
import RSSAboutSection from '@/components/RSSAboutSection';
import RSSFAQSection from '@/components/RSSFAQSection';

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

export default function RSSParserPage() {
  return (
    <>
      <PageHead page="rssParser" />
      
      <Container>
        <Title>RSS Feed Parser</Title>
        <RSSParser />
        <RSSAboutSection />
        <RSSFAQSection />
      </Container>
    </>
  );
}
