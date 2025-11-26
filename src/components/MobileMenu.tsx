import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { navigationItems, LogoIcon } from '@/config/navigation';

const MenuButton = styled.button`
  position: fixed;
  top: var(--space-4);
  left: var(--space-4);
  z-index: 1100;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  color: var(--primary-color);
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: rgba(0, 229, 176, 0.1);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    stroke-width: 2;
    transition: transform 0.3s ease;
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
  background: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(8px);
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
  background: var(--surface-color);
  z-index: 1095;
  padding: var(--space-10) var(--space-4) var(--space-6);
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  box-shadow: var(--shadow-lg);

  @media (min-width: 769px) {
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
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </>
          )}
        </svg>
      </MenuButton>

      <MenuOverlay isOpen={isOpen} onClick={closeMenu} />

      <MenuContainer isOpen={isOpen}>
        <Logo>
          <Link href="/" onClick={closeMenu}>
            {LogoIcon}
            SEO Tools
          </Link>
        </Logo>

        <Nav>
          {navigationItems.map((tool) => (
            <NavItem 
              key={tool.href} 
              active={router.pathname === tool.href}
            >
              <Link 
                href={tool.href}
                onClick={closeMenu}
              >
                {tool.icon}
                {tool.name}
              </Link>
            </NavItem>
          ))}
        </Nav>
      </MenuContainer>
    </>
  );
}
