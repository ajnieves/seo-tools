import React from 'react';
import styled from '@emotion/styled';
import { Entity, EntityRelationship } from '@/types/analysis';

const EntityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-4);
`;

const EntityCard = styled.div`
  background: var(--surface-color);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  height: fit-content;
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
  font-size: 1.1rem;
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
  gap: var(--space-2);
  margin-top: var(--space-4);
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2);
  background: var(--surface-hover);
  border-radius: var(--radius-lg);
  font-size: 0.875rem;
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
  line-height: 1.4;

  .entity {
    font-weight: 500;
  }

  .context {
    color: var(--text-secondary);
    font-size: 0.8rem;
    margin-top: var(--space-1);
    display: block;
  }
`;

const RelationshipIcon = styled.span`
  font-size: 1.1rem;
  flex-shrink: 0;
`;

const TypeSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
`;

const TypeCard = styled.div`
  background: var(--surface-color);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TypeName = styled.span`
  font-weight: 500;
`;

const TypeCount = styled.span`
  padding: var(--space-1) var(--space-3);
  background: var(--primary-light);
  color: var(--primary-color);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
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

function truncateContext(context: string): string {
  if (context.length > 100) {
    return context.substring(0, 100) + '...';
  }
  return context;
}

interface Props {
  entities: Entity[];
}

export default function SimpleEntityAnalyzer({ entities }: Props) {
  if (!entities?.length) {
    return <div>No entities found</div>;
  }

  // Group entities by type for summary
  const entityTypeCount = entities.reduce((acc: Record<string, number>, entity) => {
    acc[entity.type] = (acc[entity.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      {/* Entity Type Summary */}
      <TypeSummary>
        {Object.entries(entityTypeCount).map(([type, count]) => (
          <TypeCard key={type}>
            <TypeName>{type}</TypeName>
            <TypeCount>{count}</TypeCount>
          </TypeCard>
        ))}
      </TypeSummary>

      {/* Entity List */}
      <EntityList>
        {entities.map((entity, index) => (
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

              <StatRow>
                <span>Confidence</span>
                <span>{(entity.confidence * 100).toFixed(1)}%</span>
              </StatRow>

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
                      <div>
                        {getRelationshipText(rel.type)}{' '}
                        <span className="entity">{rel.entity}</span>
                        {rel.context && (
                          <span className="context">
                            {truncateContext(rel.context)}
                          </span>
                        )}
                      </div>
                    </RelationshipItem>
                  ))}
                </RelationshipList>
              )}
            </EntityStats>
          </EntityCard>
        ))}
      </EntityList>
    </div>
  );
}
