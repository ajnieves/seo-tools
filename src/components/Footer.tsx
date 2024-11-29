import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  margin-top: 4rem;
  padding: 2rem 0;
  border-top: 1px solid var(--border-color);
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-secondary);
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLink = styled.a`
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--primary-color);
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="/" target="_blank" rel="noopener noreferrer">
            About
          </FooterLink>
          <FooterLink href="/" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </FooterLink>
          <FooterLink href="/" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </FooterLink>
          <FooterLink href="/" target="_blank" rel="noopener noreferrer">
            Contact
          </FooterLink>
        </FooterLinks>
        <Copyright>
          © {new Date().getFullYear()} SEO Tools. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}
