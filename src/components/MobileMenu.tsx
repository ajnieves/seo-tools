import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const MenuButton = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1100;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--primary-color);
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 0;

  &:hover {
    background: var(--surface-hover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  svg {
    width: 32px;
    height: 32px;
    stroke: var(--primary-color);
    stroke-width: 1.5;
    transition: transform 0.3s ease;
    display: block;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1090;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background: var(--background-color);
  z-index: 1095;
  padding: 5rem 1.5rem 2rem;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.2);

  @media (min-width: 769px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NavItem = styled.div<{ active?: boolean }>`
  a {
    display: block;
    padding: 0.875rem 1.25rem;
    color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
    border-radius: 12px;
    transition: all 0.2s ease;
    font-weight: ${props => props.active ? '600' : '400'};
    background: ${props => props.active ? 'rgba(0, 255, 157, 0.1)' : 'transparent'};
    text-decoration: none;
    font-size: 1.1rem;

    &:hover {
      background: rgba(0, 255, 157, 0.1);
      color: var(--primary-color);
      transform: translateX(4px);
    }
  }
`;

const tools = [
  {
    name: 'Home',
    href: '/',
    description: 'Return to homepage'
  },
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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </MenuButton>

      <MenuOverlay isOpen={isOpen} onClick={closeMenu} />

      <MenuContainer isOpen={isOpen}>
        <Nav>
          {tools.map((tool) => (
            <NavItem 
              key={tool.href} 
              active={router.pathname === tool.href}
            >
              <Link 
                href={tool.href}
                title={tool.description}
                onClick={closeMenu}
              >
                {tool.name}
              </Link>
            </NavItem>
          ))}
        </Nav>
      </MenuContainer>
    </>
  );
}
