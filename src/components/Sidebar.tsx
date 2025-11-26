import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { navigationItems, LogoIcon } from '@/config/navigation';

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

export default function Sidebar() {
  const router = useRouter();

  return (
    <SidebarContainer>
      <Logo>
        <Link href="/">
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
