import styled from '@emotion/styled';

const SpinnerContainer = styled.div<{ inline?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.inline ? '0' : '2rem'};
  color: #00ff9d;
  gap: 1rem;
`;

const Spinner = styled.div<{ size?: string }>`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border: 3px solid rgba(0, 255, 157, 0.1);
  border-top-color: #00ff9d;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerText = styled.span`
  color: #00ff9d;
  font-size: 1rem;
`;

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
  size?: string;
  inline?: boolean;
  hideText?: boolean;
}

export default function LoadingSpinner({ 
  text = 'Loading...', 
  className = '', 
  size,
  inline = false,
  hideText = false
}: LoadingSpinnerProps) {
  return (
    <SpinnerContainer className={className} inline={inline}>
      <Spinner size={size} />
      {!hideText && <SpinnerText>{text}</SpinnerText>}
    </SpinnerContainer>
  );
}
