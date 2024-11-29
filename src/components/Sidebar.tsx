import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background: var(--surface-color);
  border-right: 1px solid var(--border-color);
  padding: 2rem 0;
  overflow-y: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  padding: 0 1rem;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
`;

const NavItem = styled.div<{ active?: boolean }>`
  a {
    display: block;
    padding: 0.75rem 1rem;
    color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
    border-radius: 8px;
    transition: all 0.2s ease;
    font-weight: ${props => props.active ? '600' : '400'};
    background: ${props => props.active ? 'rgba(0, 255, 157, 0.1)' : 'transparent'};
    text-decoration: none;

    &:hover {
      background: rgba(0, 255, 157, 0.1);
      color: var(--primary-color);
    }
  }
`;

const tools = [
  {
    name: 'Entity Analyzer',
    href: '/entity-analyzer',
    description: 'Extract and analyze named entities'
  },
  {
    name: 'XML Sitemap Generator',
    href: '/sitemap-generator',
    description: 'Generate XML sitemaps'
  },
  {
    name: 'RSS Feed Parser',
    href: '/rss-parser',
    description: 'Parse and validate RSS feeds'
  },
  {
    name: 'Robots.txt Tester',
    href: '/robots-tester',
    description: 'Test robots.txt rules'
  },
  {
    name: 'Percentage Calculator',
    href: '/percentage-calculator',
    description: 'Calculate percentages'
  }
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <SidebarContainer>
      <Logo>
        <Link href="/">SEO Tools</Link>
      </Logo>
      <Nav>
        {tools.map((tool) => (
          <NavItem 
            key={tool.href} 
            active={router.pathname === tool.href}
          >
            <Link 
              href={tool.href}
              title={tool.description}
            >
              {tool.name}
            </Link>
          </NavItem>
        ))}
      </Nav>
    </SidebarContainer>
  );
}
