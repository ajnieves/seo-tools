
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Message = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const LoadingIndicator = styled.span`
  color: var(--primary-color);
  font-size: 0.9rem;
  margin-left: 0.5rem;
`;

interface RobotsFetcherProps {
  url: string;
  onContentFetched: (content: string) => void;
}

export default function RobotsFetcher({ url, onContentFetched }: RobotsFetcherProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRobotsTxt = async () => {
      if (!url) return;
      
      try {
        // Check if URL is valid
        new URL(url);
        
        setLoading(true);
        setMessage('');
        setError('');
        
        const response = await fetch('/api/fetch-robots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch robots.txt');
        }

        onContentFetched(data.content);
        if (data.message) {
          setMessage(data.message);
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes('Invalid URL')) {
          // Don't show error for invalid URLs - wait for full URL
          return;
        }
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch robots.txt';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (url) {
        fetchRobotsTxt();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [url, onContentFetched]);

  return (
    <>
      {loading && <LoadingIndicator>Fetching robots.txt...</LoadingIndicator>}
      {message && <Message>{message}</Message>}
      {error && <Message style={{ color: 'var(--error-color)' }}>{error}</Message>}
    </>
  );
}
