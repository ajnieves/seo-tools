import styled from '@emotion/styled';

const ResultsContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #00ff9d;
  margin-bottom: 10px;
`;

const SentimentBadge = styled.div<{ sentiment: string }>`
  display: inline-block;
  padding: 8px 16px;
  background: ${props => {
    switch (props.sentiment.toLowerCase()) {
      case 'positive': return 'rgba(0, 255, 157, 0.1)';
      case 'optimistic': return 'rgba(124, 255, 205, 0.1)';
      case 'balanced': return 'rgba(0, 168, 232, 0.1)';
      case 'critical': return 'rgba(255, 157, 157, 0.1)';
      case 'negative': return 'rgba(255, 77, 77, 0.1)';
      default: return 'rgba(0, 168, 232, 0.1)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.sentiment.toLowerCase()) {
      case 'positive': return '#00ff9d';
      case 'optimistic': return '#7cffcd';
      case 'balanced': return '#00a8e8';
      case 'critical': return '#ff9d9d';
      case 'negative': return '#ff4d4d';
      default: return '#00a8e8';
    }
  }};
  border-radius: 20px;
  color: ${props => {
    switch (props.sentiment.toLowerCase()) {
      case 'positive': return '#00ff9d';
      case 'optimistic': return '#7cffcd';
      case 'balanced': return '#00a8e8';
      case 'critical': return '#ff9d9d';
      case 'negative': return '#ff4d4d';
      default: return '#00a8e8';
    }
  }};
  font-weight: bold;
`;

interface SentimentResultsProps {
  sentiment: string;
}

export default function SentimentResults({ sentiment }: SentimentResultsProps) {
  return (
    <ResultsContainer>
      <Title>Sentiment Analysis Results</Title>
      <SentimentBadge sentiment={sentiment}>
        {sentiment}
      </SentimentBadge>
    </ResultsContainer>
  );
}
