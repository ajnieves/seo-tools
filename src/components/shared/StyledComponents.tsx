import styled from '@emotion/styled';

// Layout Components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4);
`;

export const Card = styled.div`
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 640px) {
    grid-template-columns: repeat(${props => Math.min(props.columns || 2, 2)}, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  }
`;

// Form Components
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Label = styled.label`
  color: var(--text-color);
  font-weight: 500;
  min-width: 120px;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  color: var(--text-color);
  border: 1px solid ${props => props.hasError ? 'var(--error-color)' : 'var(--border-color)'};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 229, 176, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

export const TextArea = styled.textarea`
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  min-height: 150px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 229, 176, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

export const Select = styled.select`
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 229, 176, 0.1);
  }

  option {
    background: var(--background-color);
    color: var(--text-color);
  }
`;

// Feedback Components
export const ErrorMessage = styled.div`
  color: var(--error-color);
  font-size: 0.875rem;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

export const SuccessMessage = styled.div`
  color: var(--success-color);
  font-size: 0.875rem;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

// Progress Components
export const ProgressBar = styled.div`
  width: 100%;
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

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) 0;
  gap: var(--space-4);
  color: var(--text-secondary);
`;

// Typography
export const Title = styled.h1`
  color: var(--primary-color);
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: var(--space-8);
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Subtitle = styled.h2`
  color: var(--text-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: var(--space-4);
`;

export const Text = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: var(--space-4);
`;
