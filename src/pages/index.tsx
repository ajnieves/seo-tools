import Link from 'next/link';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const ToolsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const ToolLink = styled.a`
  padding: 1.5rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 157, 0.1);
    border-color: var(--primary-color);
  }
`;

export default function Home() {
  return (
    <Container>
      <Title>SEO Tools</Title>
      <ToolsList>
        <Link href="/entity-analyzer" passHref>
          <ToolLink>Entity Analyzer</ToolLink>
        </Link>
      </ToolsList>
    </Container>
  );
}
