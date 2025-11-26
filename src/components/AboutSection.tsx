import styled from '@emotion/styled';

const Container = styled.section`
  margin: 4rem 0;
  padding: 2rem;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Text = styled.p`
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 1rem;
  font-size: 1.05rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const ListItem = styled.li`
  color: var(--text-color);
  line-height: 1.7;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function AboutSection() {
  return (
    <Container>
      <Title>About Entity Analysis</Title>
      <Text>
        The Entity Analyzer is a powerful tool that uses advanced natural language processing to identify and extract named entities from web content. This tool helps you understand the key subjects, organizations, locations, and other important elements mentioned in any webpage.
      </Text>
      <Text>
        Key features of our Entity Analyzer include:
      </Text>
      <List>
        <ListItem>
          <strong>Entity Extraction:</strong> Automatically identifies and categorizes named entities such as people, organizations, locations, and more.
        </ListItem>
        <ListItem>
          <strong>Salience Analysis:</strong> Determines how important or central each entity is to the overall content.
        </ListItem>
        <ListItem>
          <strong>Sentiment Analysis:</strong> Analyzes the emotional tone associated with each entity in the content.
        </ListItem>
        <ListItem>
          <strong>SEO Insights:</strong> Helps optimize content by identifying key topics and their relationships.
        </ListItem>
      </List>
      <Text>
        Whether you&apos;re a content creator, SEO specialist, or digital marketer, our Entity Analyzer provides valuable insights to help you understand and optimize your content for better search engine visibility and user engagement.
      </Text>
    </Container>
  );
}
