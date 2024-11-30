import Link from 'next/link';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  margin-top: 4rem;
  padding: 4rem 0;
  background: var(--surface-color);
  border-top: 1px solid var(--border-color);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

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
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const StyledLink = styled.span`
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    color: var(--primary-color);
  }
`;

const ExternalLink = styled.a`
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    color: var(--primary-color);
  }
`;

const FooterText = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const BottomBar = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
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
          <SocialLinks>
            <ExternalLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </ExternalLink>
            <ExternalLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </ExternalLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Tools</SectionTitle>
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} passHref legacyBehavior>
              <StyledLink>{tool.name}</StyledLink>
            </Link>
          ))}
        </FooterSection>

        <FooterSection>
          <SectionTitle>Resources</SectionTitle>
          <Link href="/blog" passHref legacyBehavior>
            <StyledLink>Blog</StyledLink>
          </Link>
          <Link href="/guides" passHref legacyBehavior>
            <StyledLink>SEO Guides</StyledLink>
          </Link>
          <Link href="/tutorials" passHref legacyBehavior>
            <StyledLink>Tutorials</StyledLink>
          </Link>
          <Link href="/documentation" passHref legacyBehavior>
            <StyledLink>Documentation</StyledLink>
          </Link>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Legal</SectionTitle>
          <Link href="/privacy" passHref legacyBehavior>
            <StyledLink>Privacy Policy</StyledLink>
          </Link>
          <Link href="/terms" passHref legacyBehavior>
            <StyledLink>Terms of Service</StyledLink>
          </Link>
          <Link href="/cookies" passHref legacyBehavior>
            <StyledLink>Cookie Policy</StyledLink>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <StyledLink>Contact Us</StyledLink>
          </Link>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <FooterText>
          © {new Date().getFullYear()} SEO Tools. All rights reserved.
        </FooterText>
      </BottomBar>
    </FooterContainer>
  );
}
