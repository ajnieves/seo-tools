import styled from '@emotion/styled';
import { Card } from './shared/StyledComponents';

const SentimentContainer = styled(Card)`
  margin-bottom: var(--space-6);
  padding: var(--space-6);
`;

const SentimentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-4);
`;

const SentimentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`;

const SentimentIcon = styled.div<{ type: string }>`
  font-size: 2rem;
  color: ${props => {
    switch (props.type.toLowerCase()) {
      case 'positive': return 'var(--success-color)';
      case 'negative': return 'var(--error-color)';
      default: return 'var(--text-secondary)';
    }
  }};
`;

const SentimentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const SentimentType = styled.div<{ type: string }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => {
    switch (props.type.toLowerCase()) {
      case 'positive': return 'var(--success-color)';
      case 'negative': return 'var(--error-color)';
      default: return 'var(--text-secondary)';
    }
  }};
  text-transform: capitalize;
`;

const ConfidenceSection = styled.div`
  text-align: right;
`;

const ConfidenceBar = styled.div`
  width: 200px;
  height: 8px;
  background: var(--surface-hover);
  border-radius: var(--radius-full);
  overflow: hidden;

  div {
    height: 100%;
    background: var(--primary-color);
    border-radius: var(--radius-full);
    transition: width 0.3s ease;
  }
`;

const ConfidenceLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: var(--space-1);
`;

const Description = styled.div`
  color: var(--text-color);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-color);
`;

interface SentimentCardProps {
  type: string;
  confidence: number;
  description?: string;
}

const getSentimentEmoji = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'positive': return '😊';
    case 'negative': return '😔';
    default: return '😐';
  }
};

const getDefaultDescription = (type: string, confidence: number): string => {
  const confidenceLevel = confidence >= 0.8 ? 'high' : confidence >= 0.6 ? 'moderate' : 'low';
  
  switch (type.toLowerCase()) {
    case 'positive':
      return `The content exhibits a ${confidenceLevel} confidence positive sentiment, suggesting an optimistic, favorable, or constructive tone. This is often characterized by the use of positive language, affirmative statements, and encouraging themes.`;
    case 'negative':
      return `The content displays a ${confidenceLevel} confidence negative sentiment, indicating a critical, unfavorable, or pessimistic tone. This is typically reflected in the use of negative language, critical statements, or concerning themes.`;
    default:
      return `The content shows a ${confidenceLevel} confidence neutral sentiment, suggesting a balanced or objective tone. This often indicates factual reporting, balanced perspectives, or the absence of strong emotional language.`;
  }
};

export default function SentimentCard({ type, confidence, description }: SentimentCardProps) {
  return (
    <SentimentContainer>
      <SentimentHeader>
        <SentimentInfo>
          <SentimentIcon type={type}>{getSentimentEmoji(type)}</SentimentIcon>
          <SentimentDetails>
            <div>Content Sentiment</div>
            <SentimentType type={type}>{type}</SentimentType>
          </SentimentDetails>
        </SentimentInfo>
        <ConfidenceSection>
          <ConfidenceBar>
            <div style={{ width: `${confidence * 100}%` }} />
          </ConfidenceBar>
          <ConfidenceLabel>{(confidence * 100).toFixed(1)}% confidence</ConfidenceLabel>
        </ConfidenceSection>
      </SentimentHeader>
      <Description>
        {description || getDefaultDescription(type, confidence)}
      </Description>
    </SentimentContainer>
  );
}
