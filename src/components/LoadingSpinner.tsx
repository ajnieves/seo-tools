import styled from '@emotion/styled';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #00ff9d;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
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
}

export default function LoadingSpinner({ text = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <SpinnerContainer>
      <Spinner />
      <SpinnerText>{text}</SpinnerText>
    </SpinnerContainer>
  );
}
