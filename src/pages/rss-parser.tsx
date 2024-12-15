'use client';
import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import RSSParser from '@/components/RSSParser';
import RSSHowItWorks from '@/components/RSSHowItWorks';
import RSSFAQ from '@/components/RSSFAQ';
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
  max-width: 900px;
`;

export default function RSSParserPage() {
  return (
    <>
      <PageHead page="rssParser" />
      <ContentContainer>
        <Title>RSS Feed Parser</Title>
        <RSSParser />
        <RSSHowItWorks />
        <RSSFAQ />
      </ContentContainer>
    </>
  );
}
