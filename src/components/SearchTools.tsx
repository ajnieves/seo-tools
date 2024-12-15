import styled from '@emotion/styled';

const SearchToolsContainer = styled.div`
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
`;

const ExportButton = styled.button`
  background: var(--surface-color);
  color: var(--primary-color);
  border: 1px solid var(--border-color);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: all 0.2s ease;

  &:hover {
    background: var(--surface-hover);
    border-color: var(--primary-color);
    transform: translateY(-1px);
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
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

interface SearchToolsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
}

export default function SearchTools({ searchTerm, onSearchChange, onExport }: SearchToolsProps) {
  return (
    <SearchToolsContainer>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search entities..."
      />
      <ExportButton onClick={onExport} title="Export to CSV">
        <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export Results
      </ExportButton>
    </SearchToolsContainer>
  );
}
