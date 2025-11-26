import styled from '@emotion/styled';

const Section = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: var(--surface-color);
  border-radius: 16px;
  border: 1px solid var(--border-color);
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Text = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
`;

const ListItem = styled.li`
  color: var(--text-color);
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;

  &:before {
    content: "•";
    color: var(--primary-color);
    position: absolute;
    left: 0;
    font-size: 1.2em;
  }
`;

export default function SitemapAboutSection() {
  return (
    <Section>
      <Title>About XML Sitemap Generator</Title>
      <Text>
        Our XML Sitemap Generator is a powerful tool designed to help website owners and SEO professionals create comprehensive XML sitemaps that improve search engine visibility and indexing.
      </Text>
      <List>
        <ListItem>
          Generate standards-compliant XML sitemaps that follow search engine guidelines
        </ListItem>
        <ListItem>
          Customize URL properties including change frequency and priority
        </ListItem>
        <ListItem>
          Support for all major search engines including Google, Bing, and Yahoo
        </ListItem>
        <ListItem>
          Easy-to-use interface with instant sitemap generation
        </ListItem>
      </List>
      <Text>
        A well-structured XML sitemap helps search engines understand your website&apos;s structure and ensures all your important pages are discovered and indexed properly.
      </Text>
    </Section>
  );
}
