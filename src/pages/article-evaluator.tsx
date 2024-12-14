import React from 'react';
import PageHead from '../components/PageHead';
import ArticleEvaluator from '../components/ArticleEvaluator';
import { MainContent, ContentWrapper } from '../components/StyledLayout';

const ArticleEvaluatorPage: React.FC = () => {
  return (
    <>
      <PageHead page="articleEvaluator" />
      <MainContent>
        <ContentWrapper>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Article SEO Evaluator</h1>
            <p className="mb-8 text-gray-600">
              Enter a URL to analyze your article's H1 tag, meta title, and meta description. 
              Get AI-powered recommendations to improve your on-page SEO elements.
            </p>
            <ArticleEvaluator />
          </div>
        </ContentWrapper>
      </MainContent>
    </>
  );
};

export default ArticleEvaluatorPage;
