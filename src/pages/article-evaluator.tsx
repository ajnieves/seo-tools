'use client';
import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import ArticleEvaluator from '@/components/ArticleEvaluator';
import ArticleHowItWorks from '@/components/ArticleHowItWorks';
import ArticleFAQ from '@/components/ArticleFAQ';
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

export default function ArticleEvaluatorPage() {
  return (
    <>
      <PageHead 
        title="Article SEO Evaluator - Analyze Your Content"
        description="Evaluate your article's SEO performance with our comprehensive analysis tool. Get insights on readability, keyword usage, and content optimization."
      />
      <ContentContainer>
        <Title>Article SEO Evaluator</Title>
        <ArticleEvaluator />
        <ArticleHowItWorks />
        <ArticleFAQ />
      </ContentContainer>
    </>
  );
}
