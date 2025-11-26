import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { footerNavigation } from '@/config/navigation';

const FooterContainer = styled.footer`
  margin-top: var(--space-10);
  padding: var(--space-10) 0;
  background: var(--surface-color);
  border-top: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--primary-color),
      transparent
    );
    opacity: 0.5;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const SectionTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--space-2);
  position: relative;
  padding-bottom: var(--space-2);

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: var(--primary-color);
    border-radius: var(--radius-full);
  }
`;

const StyledLink = styled.span`
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: var(--primary-color);
    transform: translateX(4px);

    svg {
      transform: translateX(2px);
    }
  }
`;

const FooterText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

const BottomBar = styled.div`
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  background: linear-gradient(
    180deg,
    var(--surface-color),
    rgba(24, 24, 27, 0.8)
  );
`;

const VersionInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-3);
  font-size: 0.75rem;
  color: var(--text-secondary);
  opacity: 0.7;
  font-family: 'Courier New', monospace;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: var(--space-2);
  }
`;

const VersionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  background: rgba(0, 229, 176, 0.1);
  border: 1px solid rgba(0, 229, 176, 0.2);
  border-radius: var(--radius-sm);
  color: var(--primary-color);
  font-weight: 500;

  &:hover {
    background: rgba(0, 229, 176, 0.15);
    border-color: rgba(0, 229, 176, 0.3);
  }
`;

const GitHash = styled.span`
  color: var(--text-secondary);
  
  &::before {
    content: '•';
    margin: 0 var(--space-2);
    color: var(--border-color);
  }
`;

const ArrowIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface VersionData {
  version: string;
  gitHash: string;
  gitBranch: string;
  buildTime: string;
}

export default function Footer() {
  const [versionData, setVersionData] = useState<VersionData | null>(null);

  useEffect(() => {
    // Fetch version info
    fetch('/version.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch version.json: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setVersionData(data))
      .catch(() => {
        // If version.json doesn't exist or fetch fails, use fallback version
        setVersionData({
          version: '0.1.0',
          gitHash: 'dev',
          gitBranch: 'main',
          buildTime: new Date().toISOString()
        });
      });
  }, []);

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>About SEO Tools</SectionTitle>
          <FooterText>
            A comprehensive suite of tools designed to help you optimize your website&apos;s SEO performance and improve your online visibility.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <SectionTitle>{footerNavigation.technicalSeo.name}</SectionTitle>
          {footerNavigation.technicalSeo.items.map((tool) => (
            <Link key={tool.href} href={tool.href} passHref legacyBehavior>
              <StyledLink>
                {tool.name}
                {ArrowIcon}
              </StyledLink>
            </Link>
          ))}
        </FooterSection>

        <FooterSection>
          <SectionTitle>{footerNavigation.utilities.name}</SectionTitle>
          {footerNavigation.utilities.items.map((tool) => (
            <Link key={tool.href} href={tool.href} passHref legacyBehavior>
              <StyledLink>
                {tool.name}
                {ArrowIcon}
              </StyledLink>
            </Link>
          ))}
        </FooterSection>

        <FooterSection>
          <SectionTitle>{footerNavigation.company.name}</SectionTitle>
          {footerNavigation.company.items.map((item) => (
            <Link key={item.href} href={item.href} passHref legacyBehavior>
              <StyledLink as={item.href.startsWith('http') ? 'a' : undefined} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {item.name}
                {ArrowIcon}
              </StyledLink>
            </Link>
          ))}
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <FooterText>
          © {new Date().getFullYear()} Technical SEO Tools. All rights reserved.
        </FooterText>
        
        {versionData && (
          <VersionInfo>
            <VersionBadge title={`Built: ${new Date(versionData.buildTime).toLocaleString()}`}>
              v{versionData.version}
            </VersionBadge>
            <GitHash title={`Branch: ${versionData.gitBranch}`}>
              {versionData.gitHash}
            </GitHash>
          </VersionInfo>
        )}
      </BottomBar>
    </FooterContainer>
  );
}
