'use client';
import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarContainer = styled.aside`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background: rgba(26, 26, 46, 0.98);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  overflow-y: auto;

  @media (min-width: 769px) {
    display: flex;
    flex-direction: column;
  }
`;

const SidebarTitle = styled.div`
  color: #00a8e8;
  font-size: 1.4rem;
  margin: 1rem 1.5rem 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 0.8rem;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const NavLink = styled.a<{ active: boolean }>`
  color: ${props => props.active ? '#00ff9d' : 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: ${props => props.active ? 'rgba(0, 255, 157, 0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.active ? '#00ff9d' : 'transparent'};

  svg {
    width: 20px;
    height: 20px;
    opacity: ${props => props.active ? '1' : '0.7'};
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #00ff9d;
    border-left-color: #00ff9d;
    padding-left: 2rem;

    svg {
      opacity: 1;
    }
  }
`;

const NavDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.5rem 1.5rem;
`;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarContainer>
      <SidebarTitle>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        SEO Tools
      </SidebarTitle>

      <Link href="/" passHref legacyBehavior>
        <NavLink active={pathname === '/'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </NavLink>
      </Link>

      <NavDivider />

      <Link href="/sitemap-generator" passHref legacyBehavior>
        <NavLink active={pathname === '/sitemap-generator'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          XML Sitemap Generator
        </NavLink>
      </Link>

      <Link href="/rss-parser" passHref legacyBehavior>
        <NavLink active={pathname === '/rss-parser'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
          RSS Feed Parser
        </NavLink>
      </Link>

      <Link href="/robots-tester" passHref legacyBehavior>
        <NavLink active={pathname === '/robots-tester'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
          Robots.txt Tester
        </NavLink>
      </Link>

      <Link href="/percentage-calculator" passHref legacyBehavior>
        <NavLink active={pathname === '/percentage-calculator'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Percentage Calculator
        </NavLink>
      </Link>

      <Link href="/entity-analyzer" passHref legacyBehavior>
        <NavLink active={pathname === '/entity-analyzer'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Entity Analyzer
        </NavLink>
      </Link>
    </SidebarContainer>
  );
}
