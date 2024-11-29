'use client';
import { useState, FormEvent } from 'react';
import styled from '@emotion/styled';

const Form = styled.form`
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 255, 157, 0.1);
  }

  &::placeholder {
    color: var(--text-secondary);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 255, 157, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: #ff4d4d;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`;

interface Props {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
}

export default function UrlAnalyzerForm({ onSubmit, loading }: Props) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }

    try {
      // Validate URL format
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('URL must start with http:// or https://');
      }

      // Call the parent's onSubmit handler
      await onSubmit(url);
    } catch (err) {
      console.error('Form submission error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Please enter a valid URL (e.g., https://example.com)');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError('');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          type="url"
          value={url}
          onChange={handleInputChange}
          placeholder="Enter URL to analyze (e.g., https://example.com)"
          required
          disabled={loading}
          aria-label="URL to analyze"
          aria-invalid={!!error}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze URL'}
        </Button>
      </Form>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
