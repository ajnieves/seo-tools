'use client';
import React, { useState, useMemo, ChangeEvent, FormEvent } from 'react';
import styled from '@emotion/styled';
import LoadingSpinner from './LoadingSpinner';
import SearchTools from './SearchTools';
import SentimentCard from './SentimentCard';
import { Entity, AnalysisResult } from '@/types/analysis';
import {
  Container,
  Card,
  Grid,
  Form,
  FormGroup,
  Input,
  ErrorMessage,
  LoadingContainer
} from './shared/StyledComponents';

interface StyledProps {
  active?: boolean;
  type: string;
}

const SearchSection = styled.div`
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
`;

const ResultsSection = styled(Card)`
  padding: var(--space-6);
`;

const EntityTypeCard = styled(Card)<StyledProps>`
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.active ? `${getTypeColor(props.type)}10` : 'var(--surface-color)'};
  border-color: ${props => props.active ? getTypeColor(props.type) : 'var(--border-color)'};

  &:hover {
    border-color: ${props => getTypeColor(props.type)};
    transform: translateY(-2px);
  }
`;

const EntityCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  
  &:hover {
    border-color: var(--primary-color);
  }
`;

const EntityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: var(--space-2);
`;

const EntityName = styled.h3`
  color: var(--text-color);
  font-size: 1.125rem;
  font-weight: 600;
`;

const EntityType = styled.span<StyledProps>`
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => getTypeColor(props.type)};
  background: ${props => `${getTypeColor(props.type)}20`};
`;

const EntityStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--surface-hover);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-top: var(--space-2);

  div {
    height: 100%;
    background: var(--primary-color);
    border-radius: var(--radius-full);
    transition: width 0.3s ease;
  }
`;

function getTypeColor(type: string): string {
  switch (type) {
    case 'PERSON': return 'var(--primary-color)';
    case 'ORGANIZATION': return 'var(--info-color)';
    case 'LOCATION': return 'var(--warning-color)';
    default: return 'var(--text-secondary)';
  }
}

export default function EntityAnalyzer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/entity-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze URL');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!result?.entities) return;

    // Create CSV content
    const headers = ['Name', 'Type', 'Relevance (%)', 'Mentions'];
    const rows = filteredEntities.map(entity => [
      entity.name,
      entity.type,
      (entity.salience * 100).toFixed(1),
      entity.mentions
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `entity-analysis-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const cleanEntityName = (name: string): string => {
    if (name.includes('Stephanop') || name.includes('Stephanopou')) {
      return 'George Stephanopoulos';
    }
    if (name === 'Trump' || name === 'DonaldTrump' || name === 'DonaldJ.Trump') {
      return 'Donald Trump';
    }
    
    if (name.includes('News')) {
      return name.replace(/([A-Z])/g, ' $1').trim()
        .replace(/\s+News/g, ' News')
        .replace(/\s+Digital/g, ' Digital');
    }
    
    return name
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      .trim();
  };

  const filteredEntities = useMemo(() => {
    if (!result?.entities) return [];

    let entities = [...result.entities]
      .map(entity => ({
        ...entity,
        name: cleanEntityName(entity.name)
      }))
      .reduce((acc: Entity[], curr) => {
        const existing = acc.find(e => e.name === curr.name && e.type === curr.type);
        if (existing) {
          existing.mentions += curr.mentions;
          existing.salience = Math.max(existing.salience, curr.salience);
        } else {
          acc.push(curr);
        }
        return acc;
      }, [])
      .sort((a, b) => b.salience - a.salience);

    if (filterType !== 'ALL') {
      entities = entities.filter(entity => entity.type === filterType);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      entities = entities.filter(entity => 
        entity.name.toLowerCase().includes(term) ||
        entity.type.toLowerCase().includes(term)
      );
    }

    return entities;
  }, [result?.entities, filterType, searchTerm]);

  const entityTypeStats = useMemo(() => {
    if (!filteredEntities.length) return {};
    return filteredEntities.reduce((acc: Record<string, number>, entity) => {
      acc[entity.type] = (acc[entity.type] || 0) + 1;
      return acc;
    }, {});
  }, [filteredEntities]);

  return (
    <Container>
      <SearchSection>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="url"
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter URL to analyze (e.g., https://example.com)"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </FormGroup>
        </Form>
      </SearchSection>

      {loading && (
        <LoadingContainer>
          <LoadingSpinner />
          <p>Analyzing content...</p>
        </LoadingContainer>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {result && (
        <ResultsSection>
          <SearchTools
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onExport={handleExport}
          />

          <SentimentCard 
            type={result.sentiment}
            confidence={result.sentimentConfidence}
            description={result.sentimentExplanation}
          />

          <Grid columns={4}>
            {Object.entries(entityTypeStats).map(([type, count]) => (
              <EntityTypeCard
                key={type}
                active={filterType === type}
                type={type}
                onClick={() => setFilterType(filterType === type ? 'ALL' : type)}
              >
                <div style={{ opacity: 0.75 }}>{type}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 'var(--space-2) 0' }}>
                  {count}
                </div>
                <div>
                  {((count / filteredEntities.length) * 100).toFixed(1)}% of total
                </div>
              </EntityTypeCard>
            ))}
          </Grid>

          <Grid columns={3} style={{ marginTop: 'var(--space-6)' }}>
            {filteredEntities.map((entity, index) => (
              <EntityCard key={index}>
                <EntityHeader>
                  <EntityName>{entity.name}</EntityName>
                  <EntityType type={entity.type}>{entity.type}</EntityType>
                </EntityHeader>
                <EntityStats>
                  <StatRow>
                    <span>Mentions</span>
                    <span>{entity.mentions}×</span>
                  </StatRow>
                  <div>
                    <StatRow>
                      <span>Relevance</span>
                      <span>{(entity.salience * 100).toFixed(1)}%</span>
                    </StatRow>
                    <ProgressBar>
                      <div style={{ width: `${entity.salience * 100}%` }} />
                    </ProgressBar>
                  </div>
                </EntityStats>
              </EntityCard>
            ))}
          </Grid>
        </ResultsSection>
      )}
    </Container>
  );
}
