import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { Entity, EntityRelationship } from '@/types/analysis';

// Container and Layout
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const TopControls = styled.div`
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  align-items: center;
  flex-wrap: wrap;
`;

const SearchBar = styled.input`
  flex: 1;
  min-width: 250px;
  padding: var(--space-3) var(--space-4);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  color: var(--text-color);
  font-size: 1rem;
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

const FilterChips = styled.div`
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
`;

const FilterChip = styled.button<{ active: boolean }>`
  padding: var(--space-2) var(--space-4);
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--surface-color)'};
  color: ${props => props.active ? 'var(--background-color)' : 'var(--text-color)'};
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--border-color)'};
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  span {
    margin-left: var(--space-2);
    opacity: 0.8;
  }
`;

// Summary Stats
const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
`;

const SummaryCard = styled.div`
  background: var(--surface-color);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  border: 1px solid var(--border-color);
`;

const SummaryValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--space-1);
`;

const SummaryLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// Entity Table
const EntityTable = styled.div`
  background: var(--surface-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-color);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 100px 100px 60px;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--surface-hover);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
`;

const TableRow = styled.div<{ highlighted?: boolean }>`
  display: grid;
  grid-template-columns: 2fr 1fr 100px 100px 60px;
  gap: var(--space-3);
  padding: var(--space-4);
  border-top: 1px solid var(--border-color);
  transition: all 0.2s ease;
  background: ${props => props.highlighted ? 'rgba(0, 229, 176, 0.05)' : 'transparent'};
  cursor: pointer;

  &:hover {
    background: var(--surface-hover);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
`;

const EntityNameCell = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

const EntityIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const EntityInfo = styled.div`
  flex: 1;
`;

const EntityNameText = styled.div`
  font-weight: 600;
  color: var(--text-color);
  font-size: 1rem;
  margin-bottom: 2px;
`;

const EntityTypeText = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const MentionsBadge = styled.span`
  padding: var(--space-1) var(--space-3);
  background: rgba(0, 229, 176, 0.1);
  color: var(--primary-color);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
`;

const ConfidenceBar = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);
`;

const ConfidenceBarFill = styled.div`
  flex: 1;
  height: 6px;
  background: var(--surface-hover);
  border-radius: var(--radius-full);
  overflow: hidden;
  
  > div {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
    border-radius: var(--radius-full);
    transition: width 0.3s ease;
  }
`;

const ConfidenceText = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
  min-width: 40px;
  text-align: right;
`;

const ExpandButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const ExpandedDetails = styled.div`
  grid-column: 1 / -1;
  padding: var(--space-4);
  background: var(--background-color);
  border-top: 1px solid var(--border-color);
`;

const DetailSection = styled.div`
  margin-bottom: var(--space-3);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
  font-weight: 600;
`;

const RelationshipTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`;

const RelationshipTag = styled.div<{ type: string }>`
  padding: var(--space-2) var(--space-3);
  background: ${props => getRelationshipColor(props.type)};
  border-radius: var(--radius-md);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  
  .icon {
    font-size: 1rem;
  }
  
  .name {
    font-weight: 500;
    color: var(--text-color);
  }
  
  .type {
    color: var(--text-secondary);
    font-size: 0.75rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: var(--space-10);
  color: var(--text-secondary);
  
  .icon {
    font-size: 3rem;
    margin-bottom: var(--space-4);
    opacity: 0.5;
  }
`;

const CategoryTag = styled.span`
  padding: var(--space-1) var(--space-2);
  background: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: var(--space-2);
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-6);
  padding: var(--space-4);
  background: var(--surface-color);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
`;

const PaginationButton = styled.button`
  padding: var(--space-2) var(--space-4);
  background: var(--background-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover:not(:disabled) {
    background: var(--surface-hover);
    border-color: var(--primary-color);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const PageNumbers = styled.div`
  display: flex;
  gap: var(--space-2);
`;

const PageNumber = styled.button<{ active: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--background-color)' : 'var(--text-color)'};
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.active ? 'var(--primary-dark)' : 'var(--surface-hover)'};
  }
`;

const ExportButton = styled.button`
  padding: var(--space-2) var(--space-4);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: all 0.2s ease;

  &:hover {
    background: var(--surface-hover);
    border-color: var(--primary-color);
    transform: translateY(-1px);
  }
`;

// Helper functions
function getRelationshipColor(type: string): string {
  switch (type) {
    case 'executive': return 'rgba(0, 229, 176, 0.15)';
    case 'incident': return 'rgba(239, 68, 68, 0.15)';
    case 'movement': return 'rgba(59, 130, 246, 0.15)';
    default: return 'rgba(161, 161, 170, 0.1)';
  }
}

function getRelationshipIcon(type: string): string {
  switch (type) {
    case 'executive': return '👔';
    case 'incident': return '⚠️';
    case 'movement': return '🔄';
    default: return '🔗';
  }
}

function getEntityIcon(type: string): string {
  switch (type) {
    case 'PERSON': return '👤';
    case 'ORGANIZATION': return '🏢';
    case 'LOCATION': return '📍';
    case 'EVENT': return '📅';
    default: return '🔖';
  }
}

interface Props {
  entities: Entity[];
}

export default function SimpleEntityAnalyzer({ entities }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const ITEMS_PER_PAGE = 15;

  if (!entities?.length) {
    return (
      <EmptyState>
        <div className="icon">🔍</div>
        <div>No entities found in the analyzed content</div>
      </EmptyState>
    );
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const totalMentions = entities.reduce((sum, e) => sum + e.mentions, 0);
    const avgConfidence = entities.reduce((sum, e) => sum + e.confidence, 0) / entities.length;
    const typeCount = new Set(entities.map(e => e.type)).size;
    
    return {
      totalEntities: entities.length,
      totalMentions,
      avgConfidence,
      typeCount
    };
  }, [entities]);

  // Group entities by type for filter chips
  const entityTypeCount = useMemo(() => {
    return entities.reduce((acc: Record<string, number>, entity) => {
      acc[entity.type] = (acc[entity.type] || 0) + 1;
      return acc;
    }, {});
  }, [entities]);

  // Filter and search
  const filteredEntities = useMemo(() => {
    let filtered = entities;
    
    // Filter by type
    if (selectedType !== 'ALL') {
      filtered = filtered.filter(e => e.type === selectedType);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e => 
        e.name.toLowerCase().includes(query) ||
        e.type.toLowerCase().includes(query) ||
        e.category?.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [entities, selectedType, searchQuery]);

  // Paginate
  const totalPages = Math.ceil(filteredEntities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEntities = filteredEntities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filter or search changes
  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Type', 'Category', 'Mentions', 'Confidence', 'Salience'].join(','),
      ...filteredEntities.map(e => [
        `"${e.name}"`,
        e.type,
        e.category || '',
        e.mentions,
        (e.confidence * 100).toFixed(1),
        (e.salience * 100).toFixed(1)
      ].join(','))
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

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage, '...', totalPages);
    }
    
    return pages;
  };

  return (
    <Container>
      {/* Summary Statistics */}
      <SummaryGrid>
        <SummaryCard>
          <SummaryValue>{stats.totalEntities}</SummaryValue>
          <SummaryLabel>Total Entities</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{stats.totalMentions}</SummaryValue>
          <SummaryLabel>Total Mentions</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{(stats.avgConfidence * 100).toFixed(0)}%</SummaryValue>
          <SummaryLabel>Avg Confidence</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{stats.typeCount}</SummaryValue>
          <SummaryLabel>Entity Types</SummaryLabel>
        </SummaryCard>
      </SummaryGrid>

      {/* Search and Filters */}
      <TopControls>
        <SearchBar
          type="text"
          placeholder="🔍 Search entities by name, type, or category..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <FilterChips>
          <FilterChip
            active={selectedType === 'ALL'}
            onClick={() => handleTypeFilter('ALL')}
          >
            All <span>({entities.length})</span>
          </FilterChip>
          {Object.entries(entityTypeCount).map(([type, count]) => (
            <FilterChip
              key={type}
              active={selectedType === type}
              onClick={() => handleTypeFilter(type)}
            >
              {type} <span>({count})</span>
            </FilterChip>
          ))}
        </FilterChips>
        <ExportButton onClick={handleExport}>
          📥 Export CSV
        </ExportButton>
      </TopControls>

      {/* Entity Table */}
      {filteredEntities.length === 0 ? (
        <EmptyState>
          <div className="icon">🔍</div>
          <div>No entities match your search criteria</div>
        </EmptyState>
      ) : (
        <>
          <EntityTable>
            <TableHeader>
              <div>Entity</div>
              <div>Type</div>
              <div>Mentions</div>
              <div>Confidence</div>
              <div></div>
            </TableHeader>
            {paginatedEntities.map((entity, index) => {
              const globalIndex = startIndex + index;
              const isExpanded = expandedRows.has(globalIndex);
              const hasRelationships = entity.relationships && entity.relationships.length > 0;
              
              return (
                <React.Fragment key={globalIndex}>
                  <TableRow 
                    highlighted={isExpanded}
                    onClick={() => hasRelationships && toggleRow(globalIndex)}
                  >
                    <EntityNameCell>
                      <EntityIcon>{getEntityIcon(entity.type)}</EntityIcon>
                      <EntityInfo>
                        <EntityNameText>
                          {entity.name}
                          {entity.category && (
                            <CategoryTag>{entity.category}</CategoryTag>
                          )}
                        </EntityNameText>
                        {hasRelationships && (
                          <EntityTypeText>
                            {entity.relationships.length} relationship{entity.relationships.length !== 1 ? 's' : ''}
                          </EntityTypeText>
                        )}
                      </EntityInfo>
                    </EntityNameCell>
                    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem' }}>{entity.type}</span>
                    </div>
                    
                    <MentionsBadge>{entity.mentions}×</MentionsBadge>
                    
                    <ConfidenceBar>
                      <ConfidenceBarFill>
                        <div style={{ width: `${entity.confidence * 100}%` }} />
                      </ConfidenceBarFill>
                      <ConfidenceText>{(entity.confidence * 100).toFixed(0)}%</ConfidenceText>
                    </ConfidenceBar>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {hasRelationships && (
                        <ExpandButton onClick={(e) => { e.stopPropagation(); toggleRow(globalIndex); }}>
                          {isExpanded ? '▼' : '▶'}
                        </ExpandButton>
                      )}
                    </div>
                  </TableRow>
                  
                  {isExpanded && hasRelationships && (
                    <ExpandedDetails>
                      <DetailSection>
                        <DetailLabel>Related Entities ({entity.relationships.length})</DetailLabel>
                        <RelationshipTags>
                          {entity.relationships
                            .slice(0, 10) // Limit to top 10 relationships
                            .map((rel: EntityRelationship, idx: number) => (
                              <RelationshipTag key={idx} type={rel.type}>
                                <span className="icon">{getRelationshipIcon(rel.type)}</span>
                                <span className="name">{rel.entity}</span>
                              </RelationshipTag>
                            ))}
                          {entity.relationships.length > 10 && (
                            <RelationshipTag type="default">
                              <span className="type">+{entity.relationships.length - 10} more</span>
                            </RelationshipTag>
                          )}
                        </RelationshipTags>
                      </DetailSection>
                    </ExpandedDetails>
                  )}
                </React.Fragment>
              );
            })}
          </EntityTable>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <PaginationControls>
              <PaginationButton
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ← Previous
              </PaginationButton>
              
              <PageInfo>
                <span>Page {currentPage} of {totalPages}</span>
                <span>•</span>
                <span>{filteredEntities.length} entities</span>
                {searchQuery && (
                  <>
                    <span>•</span>
                    <span style={{ color: 'var(--primary-color)' }}>Filtered</span>
                  </>
                )}
              </PageInfo>
              
              <PaginationButton
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next →
              </PaginationButton>
            </PaginationControls>
          )}
        </>
      )}
    </Container>
  );
}
