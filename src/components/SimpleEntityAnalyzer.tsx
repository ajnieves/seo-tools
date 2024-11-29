'use client';
import { useState } from 'react';
import styled from '@emotion/styled';
import SentimentResults from './SentimentResults';

interface Entity {
  name: string;
  type: string;
  salience: number;
}

interface AnalysisResult {
  entities: Entity[];
  sentiment: string;
}

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #00ff9d;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: #1a1a2e;
  border: 1px solid #333;
  color: white;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #00ff9d;
  }
`;

const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 10px;
  background: ${props => props.disabled ? '#333' : '#00ff9d'};
  color: ${props => props.disabled ? '#666' : '#1a1a2e'};
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 255, 157, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  padding: 10px;
  margin-bottom: 20px;
  background: rgba(255, 77, 77, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(255, 77, 77, 0.2);
`;

const LoadingMessage = styled.div`
  color: #00ff9d;
  text-align: center;
  padding: 20px;
`;

const ResultsSection = styled.div`
  margin-bottom: 30px;
`;

const EntityList = styled.div`
  display: grid;
  gap: 10px;
`;

const EntityItem = styled.div`
  padding: 15px;
  background: #1a1a2e;
  border: 1px solid #333;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 157, 0.1);
  }
`;

const EntityName = styled.h3`
  color: #00ff9d;
  margin: 0 0 5px 0;
`;

const EntityDetail = styled.p`
  color: #fff;
  margin: 0;
  margin-top: 5px;
`;

const EntityResultsTitle = styled.h2`
  color: #00ff9d;
  margin-bottom: 15px;
`;

export default function SimpleEntityAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/entity-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze URL');
      }

      if (!data.entities || !Array.isArray(data.entities)) {
        throw new Error('No entities found');
      }

      setResult({
        entities: data.entities,
        sentiment: data.sentiment
      });
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Entity Analyzer</Title>
      
      <InputContainer>
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to analyze"
          disabled={loading}
        />
        <Button 
          onClick={handleAnalyze}
          disabled={loading || !url}
        >
          {loading ? 'Analyzing...' : 'Analyze URL'}
        </Button>
      </InputContainer>

      {loading && (
        <LoadingMessage>
          Analyzing content...
        </LoadingMessage>
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {result && (
        <ResultsSection>
          <SentimentResults sentiment={result.sentiment} />
          
          <EntityResultsTitle>Entity Analysis Results</EntityResultsTitle>
          <EntityList>
            {result.entities.map((entity, index) => (
              <EntityItem key={index}>
                <EntityName>{entity.name}</EntityName>
                <EntityDetail>Type: {entity.type}</EntityDetail>
                <EntityDetail>Salience: {(entity.salience * 100).toFixed(2)}%</EntityDetail>
              </EntityItem>
            ))}
          </EntityList>
        </ResultsSection>
      )}

      <InfoSection />
    </Container>
  );
}
