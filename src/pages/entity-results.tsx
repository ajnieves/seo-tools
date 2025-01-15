'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import EntityAnalyzer from '@/components/EntityAnalyzer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Container, ErrorMessage, LoadingContainer } from '@/components/shared/StyledComponents';
import { AnalysisResult } from '@/types/analysis';

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

export default function EntityResultsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const analyzeUrl = async () => {
      const { url } = router.query;
      if (!url) return;

      try {
        const response = await fetch('/api/entity-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to analyze URL');
        }

        const data = await response.json();
        setResult(data);
      } catch (err) {
        console.error('Analysis error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (router.query.url) {
      analyzeUrl();
    }
  }, [router.query]);

  return (
    <>
      <PageHead page="entityAnalyzer" />
      <ContentContainer>
        <Title>Entity Analysis Results</Title>
        
        {loading && (
          <LoadingContainer>
            <LoadingSpinner />
            <p>Analyzing content...</p>
          </LoadingContainer>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {result && <EntityAnalyzer initialResult={result} />}
      </ContentContainer>
    </>
  );
}
