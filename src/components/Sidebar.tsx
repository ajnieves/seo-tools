import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background: var(--surface-color);
  border-right: 1px solid var(--border-color);
  padding: var(--space-6) var(--space-4);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  margin-bottom: var(--space-8);
  padding: 0 var(--space-4);

  a {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    gap: var(--space-3);
    letter-spacing: -0.02em;

    &:hover {
      color: var(--primary-light);
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const NavItem = styled.div<{ active?: boolean }>`
  a {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
    border-radius: var(--radius-lg);
    transition: all 0.2s ease;
    font-weight: ${props => props.active ? '600' : '400'};
    background: ${props => props.active ? 'rgba(0, 229, 176, 0.1)' : 'transparent'};
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: var(--primary-color);
      transform: scaleY(0);
      transition: transform 0.2s ease;
      border-radius: 0 2px 2px 0;
    }

    &:hover {
      background: rgba(0, 229, 176, 0.1);
      color: var(--primary-color);
      transform: translateX(4px);

      &:before {
        transform: scaleY(1);
      }
    }

    svg {
      width: 20px;
      height: 20px;
      stroke: currentColor;
      stroke-width: 2;
      flex-shrink: 0;
    }
  }
`;

const tools = [
  {
    name: 'Home',
    href: '/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    name: 'XML Sitemap',
    href: '/sitemap-generator',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12h-8" />
        <path d="M21 6H8" />
        <path d="M21 18H8" />
        <path d="M3 6h3" />
        <path d="M3 12h3" />
        <path d="M3 18h3" />
      </svg>
    )
  },
  {
    name: 'RSS Parser',
    href: '/rss-parser',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" />
      </svg>
    )
  },
  {
    name: 'Robots.txt',
    href: '/robots-tester',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 3v18" />
      </svg>
    )
  },
  {
    name: 'Calculator',
    href: '/percentage-calculator',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="16" y1="14" x2="16" y2="18" />
        <line x1="8" y1="14" x2="8" y2="18" />
        <line x1="12" y1="14" x2="12" y2="18" />
      </svg>
    )
  }
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <SidebarContainer>
      <Logo>
        <Link href="/">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          SEO Tools
        </Link>
      </Logo>

      <Nav>
        {tools.map((tool) => (
          <NavItem 
            key={tool.href} 
            active={router.pathname === tool.href}
          >
            <Link href={tool.href}>
              {tool.icon}
              {tool.name}
            </Link>
          </NavItem>
        ))}
      </Nav>
    </SidebarContainer>
  );
}
