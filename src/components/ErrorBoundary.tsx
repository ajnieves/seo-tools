import { Component, ReactNode } from 'react';
import styled from '@emotion/styled';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: var(--space-8);
  text-align: center;
`;

const ErrorIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-4);
  color: var(--error-color);
  
  svg {
    width: 100%;
    height: 100%;
    stroke: currentColor;
    stroke-width: 1.5;
  }
`;

const ErrorTitle = styled.h2`
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: var(--space-2);
`;

const ErrorMessage = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: var(--space-6);
  max-width: 500px;
`;

const RetryButton = styled.button`
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }
`;

const DefaultErrorFallback = ({ onRetry }: { onRetry: () => void }) => (
  <ErrorContainer>
    <ErrorIcon>
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </ErrorIcon>
    <ErrorTitle>Something went wrong</ErrorTitle>
    <ErrorMessage>
      An unexpected error occurred. Please try again or refresh the page.
    </ErrorMessage>
    <RetryButton onClick={onRetry}>
      Try Again
    </RetryButton>
  </ErrorContainer>
);

/**
 * Error Boundary Component
 * Catches JavaScript errors in child components and displays a fallback UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, you could send this to an error reporting service
    // e.g., Sentry, LogRocket, etc.
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <DefaultErrorFallback onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

