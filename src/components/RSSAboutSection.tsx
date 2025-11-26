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

export default function RSSAboutSection() {
  return (
    <Section>
      <Title>About RSS Feed Parser</Title>
      <Text>
        Our RSS Feed Parser is a comprehensive tool designed to help content creators, marketers, and developers analyze and validate RSS feeds for optimal content syndication.
      </Text>
      <List>
        <ListItem>
          Parse and validate RSS feeds from any public URL
        </ListItem>
        <ListItem>
          Support for RSS 2.0, RSS 1.0, and Atom feed formats
        </ListItem>
        <ListItem>
          Extract feed metadata, entries, and media content
        </ListItem>
        <ListItem>
          Identify common feed validation issues and errors
        </ListItem>
      </List>
      <Text>
        Whether you&apos;re managing content syndication, monitoring feeds, or developing RSS-enabled applications, our parser provides the insights you need to ensure your feeds are working correctly.
      </Text>
    </Section>
  );
}
