'use client';
import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import EntityAnalyzer from '@/components/EntityAnalyzer';
import EntityHowItWorks from '@/components/EntityHowItWorks';
import EntityFAQ from '@/components/EntityFAQ';
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

export default function EntityAnalyzerPage() {
  return (
    <>
      <PageHead page="entityAnalyzer" />
      <ContentContainer>
        <Title>Entity Analyzer</Title>
        <EntityAnalyzer />
        <EntityHowItWorks />
        <EntityFAQ />
      </ContentContainer>
    </>
  );
}
