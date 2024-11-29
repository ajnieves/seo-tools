'use client';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  padding: 3rem 2rem;
  background: var(--surface-color);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const Section = styled.div`
  h3 {
    color: var(--primary-color);
    margin-bottom: 1.25rem;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  a {
    color: var(--text-color);
    text-decoration: none;
    opacity: 0.8;
    transition: all 0.2s ease;
    font-size: 0.95rem;
    display: inline-block;
    padding: 0.25rem 0;

    &:hover {
      color: var(--primary-color);
      opacity: 1;
      transform: translateX(4px);

      @media (max-width: 768px) {
        transform: none;
      }
    }
  }
`;

const footerSections = {
  tools: {
    title: 'SEO Tools',
    links: [
      { href: '/sitemap-generator', text: 'XML Sitemap Generator' },
      { href: '/robots-tester', text: 'Robots.txt Tester' },
      { href: '/entity-analyzer', text: 'Entity Analyzer' },
      { href: '/rss-parser', text: 'RSS Feed Parser' },
      { href: '/percentage-calculator', text: 'Percentage Calculator' }
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { 
        href: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap',
        text: 'Google Sitemap Guide',
        external: true
      },
      { 
        href: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro',
        text: 'Robots.txt Guide',
        external: true
      },
      { 
        href: 'https://www.rssboard.org/rss-specification',
        text: 'RSS Specification',
        external: true
      }
    ]
  }
};

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        {Object.entries(footerSections).map(([key, section]) => (
          <Section key={key}>
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    {...('external' in link ? {
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    } : {})}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        ))}
      </FooterContent>
    </FooterContainer>
  );
}
