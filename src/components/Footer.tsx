import Link from 'next/link';
import styled from '@emotion/styled';

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

const tools = [
  {
    name: 'Entity Analyzer',
    href: '/entity-analyzer',
  },
  {
    name: 'XML Sitemap Generator',
    href: '/sitemap-generator',
  },
  {
    name: 'RSS Feed Parser',
    href: '/rss-parser',
  },
  {
    name: 'Robots.txt Tester',
    href: '/robots-tester',
  },
  {
    name: 'Percentage Calculator',
    href: '/percentage-calculator',
  },
];

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>About SEO Tools</SectionTitle>
          <FooterText>
            A comprehensive suite of tools designed to help you optimize your website's SEO performance and improve your online visibility.
          </FooterText>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Tools</SectionTitle>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} passHref legacyBehavior>
              <StyledLink>
                {tool.name}
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
              </StyledLink>
            </Link>
          ))}
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <FooterText>
          © {new Date().getFullYear()} Technical SEO Tools. All rights reserved.
        </FooterText>
      </BottomBar>
    </FooterContainer>
  );
}
