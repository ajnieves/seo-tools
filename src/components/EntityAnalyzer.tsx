'use client';
import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import SearchTools from './SearchTools';
import SentimentCard from './SentimentCard';
import { Entity, EntityRelationship } from '@/types/analysis';
import { Container, Card, Grid, ErrorMessage } from './shared/StyledComponents';

const EntityCard = styled(Card)`
  padding: var(--space-4);
  background: var(--surface-color);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
`;

const EntityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
`;

const EntityName = styled.h3`
  margin: 0;
  color: var(--text-color);
`;

const EntityType = styled.span`
  padding: var(--space-1) var(--space-3);
  background: var(--primary-light);
  color: var(--primary-color);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
`;

const EntityStats = styled.div`
  display: grid;
  gap: var(--space-4);
  margin-top: var(--space-4);
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2);
  background: var(--surface-hover);
  border-radius: var(--radius-lg);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: var(--surface-hover);
  border-radius: var(--radius-full);
  margin-top: var(--space-1);

  > div {
    height: 100%;
    background: var(--primary-color);
    border-radius: var(--radius-full);
    transition: width 0.3s ease;
  }
`;

const RelationshipList = styled.div`
  margin-top: var(--space-4);
  display: grid;
  gap: var(--space-2);
`;

const RelationshipItem = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: ${props => getRelationshipColor(props.type)};
  border-radius: var(--radius-lg);
  font-size: 0.875rem;

  .context {
    color: var(--text-secondary);
    margin-left: var(--space-2);
  }
`;

const RelationshipIcon = styled.span`
  font-size: 1.25rem;
`;

function getRelationshipColor(type: string): string {
  switch (type) {
    case 'executive':
      return 'rgba(0, 229, 176, 0.1)';
    case 'incident':
      return 'rgba(255, 99, 71, 0.1)';
    case 'movement':
      return 'rgba(64, 224, 208, 0.1)';
    default:
      return 'var(--surface-hover)';
  }
}

function getRelationshipIcon(type: string): string {
  switch (type) {
    case 'executive':
      return '👔';
    case 'incident':
      return '⚠️';
    case 'movement':
      return '🔄';
    default:
      return '🔗';
  }
}

function getRelationshipText(type: string): string {
  switch (type) {
    case 'executive':
      return 'Executive of';
    case 'incident':
      return 'Involved in incident with';
    case 'movement':
      return 'Movement related to';
    default:
      return 'Related to';
  }
}

interface EntityAnalyzerProps {
  initialResult?: any;
}

export default function EntityAnalyzer({ initialResult }: EntityAnalyzerProps) {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<any>(initialResult || null);

  const handleExport = () => {
    if (!result?.entities) return;

    const headers = ['Name', 'Type', 'Relevance (%)', 'Mentions', 'Category', 'Relationships'];
    const rows = filteredEntities.map(entity => [
      entity.name,
      entity.type,
      (entity.salience * 100).toFixed(1),
      entity.mentions,
      entity.category || '',
      entity.relationships?.map((r: EntityRelationship) => `${r.entity} (${r.type})`).join('; ') || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

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

  const filteredEntities = useMemo(() => {
    if (!result?.entities) return [];

    let entities = [...result.entities];

    if (filterType !== 'ALL') {
      entities = entities.filter(entity => entity.type === filterType);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      entities = entities.filter(entity => 
        entity.name.toLowerCase().includes(term) ||
        entity.type.toLowerCase().includes(term) ||
        entity.category?.toLowerCase().includes(term) ||
        entity.relationships?.some((r: EntityRelationship) => 
          r.entity.toLowerCase().includes(term) || 
          r.type.toLowerCase().includes(term)
        )
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

  if (!result) {
    return <ErrorMessage>No analysis result available</ErrorMessage>;
  }

  return (
    <Container>
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
          <EntityCard
            key={type}
            onClick={() => setFilterType(filterType === type ? 'ALL' : type)}
            style={{ cursor: 'pointer' }}
          >
            <EntityHeader>
              <EntityName>{type}</EntityName>
              <EntityType>{count}</EntityType>
            </EntityHeader>
            <div>
              {((count / filteredEntities.length) * 100).toFixed(1)}% of total
            </div>
          </EntityCard>
        ))}
      </Grid>

      <Grid columns={3} style={{ marginTop: 'var(--space-6)' }}>
        {filteredEntities.map((entity: Entity, index: number) => (
          <EntityCard key={index}>
            <EntityHeader>
              <EntityName>{entity.name}</EntityName>
              <EntityType>{entity.type}</EntityType>
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
              {entity.category && (
                <StatRow>
                  <span>Category</span>
                  <span>{entity.category}</span>
                </StatRow>
              )}
              {entity.relationships && entity.relationships.length > 0 && (
                <RelationshipList>
                  {entity.relationships.map((rel: EntityRelationship, idx: number) => (
                    <RelationshipItem key={idx} type={rel.type}>
                      <RelationshipIcon>{getRelationshipIcon(rel.type)}</RelationshipIcon>
                      {getRelationshipText(rel.type)}: {rel.entity}
                      {rel.context && <span className="context"> - {rel.context}</span>}
                    </RelationshipItem>
                  ))}
                </RelationshipList>
              )}
            </EntityStats>
          </EntityCard>
        ))}
      </Grid>
    </Container>
  );
}
