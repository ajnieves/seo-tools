'use client';
import { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuButton = styled.button`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  display: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const MenuBar = styled.span<{ $isOpen: boolean }>`
  width: 24px;
  height: 2px;
  background: #00a8e8;
  transition: all 0.3s ease;
  transform-origin: center;
  box-shadow: 0 0 8px rgba(0, 168, 232, 0.3);

  &:nth-of-type(1) {
    transform: ${props => props.$isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)'};
  }

  &:nth-of-type(2) {
    opacity: ${props => props.$isOpen ? '0' : '1'};
    transform: ${props => props.$isOpen ? 'translateX(-10px)' : 'translateX(0)'};
  }

  &:nth-of-type(3) {
    transform: ${props => props.$isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0)'};
  }
`;

const MenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 998;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MenuPanel = styled.nav<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: rgba(26, 26, 46, 0.98);
  backdrop-filter: blur(10px);
  z-index: 999;
  padding: 5rem 1.5rem 2rem;
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;

  @media (min-width: 769px) {
    display: none;
  }
`;

const StyledLink = styled.a<{ active: boolean }>`
  color: ${props => props.active ? '#00ff9d' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  background: ${props => props.active ? 'rgba(0, 255, 157, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'rgba(0, 255, 157, 0.2)' : 'transparent'};
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #00ff9d;
    padding-left: 1.5rem;
    border-color: rgba(0, 255, 157, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 20px;
    height: 20px;
    opacity: ${props => props.active ? '1' : '0.7'};
    transition: all 0.3s ease;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const MenuTitle = styled.div`
  color: #00a8e8;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.5rem 0;
`;

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon: JSX.Element;
}

const MenuItem = ({ href, children, active, onClick, icon }: MenuItemProps) => (
  <Link href={href} passHref legacyBehavior>
    <StyledLink active={active} onClick={onClick}>
      {icon}
      {children}
    </StyledLink>
  </Link>
);

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
        <MenuBar $isOpen={isOpen} />
        <MenuBar $isOpen={isOpen} />
        <MenuBar $isOpen={isOpen} />
      </MenuButton>

      <MenuOverlay $isOpen={isOpen} onClick={closeMenu} />

      <MenuPanel $isOpen={isOpen}>
        <MenuTitle>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          SEO Tools
        </MenuTitle>
        
        <MenuItem 
          href="/" 
          active={pathname === '/'} 
          onClick={closeMenu}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>}
        >
          Home
        </MenuItem>

        <MenuDivider />
        
        <MenuItem 
          href="/sitemap-generator" 
          active={pathname === '/sitemap-generator'} 
          onClick={closeMenu}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>}
        >
          XML Sitemap Generator
        </MenuItem>

        <MenuItem 
          href="/rss-parser" 
          active={pathname === '/rss-parser'} 
          onClick={closeMenu}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 110-2 1 1 0 010 2z" />
          </svg>}
        >
          RSS Feed Parser
        </MenuItem>

        <MenuItem 
          href="/robots-tester" 
          active={pathname === '/robots-tester'} 
          onClick={closeMenu}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>}
        >
          Robots.txt Tester
        </MenuItem>

        <MenuItem 
          href="/percentage-calculator" 
          active={pathname === '/percentage-calculator'} 
          onClick={closeMenu}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>}
        >
          Percentage Calculator
        </MenuItem>

        <MenuItem 
          href="/entity-analyzer" 
          active={pathname === '/entity-analyzer'} 
          onClick={closeMenu}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>}
        >
          Entity Analyzer
        </MenuItem>
      </MenuPanel>
    </>
  );
}
