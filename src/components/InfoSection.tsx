import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  background: rgba(26, 26, 46, 0.6);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  color: #00ff9d;
  margin-bottom: 15px;
`;

const Section = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  color: #00a8e8;
  margin-bottom: 10px;
`;

const Text = styled.p`
  color: #fff;
  margin-bottom: 10px;
`;

const List = styled.ul`
  color: #fff;
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 5px;

  strong {
    color: #00ff9d;
  }
`;

export default function InfoSection() {
  return (
    <Container>
      <Title>About the Analysis</Title>
      
      <Section>
        <SectionTitle>Entity Types</SectionTitle>
        <Text>
          Entities are categorized into the following types:
        </Text>
        <List>
          <ListItem><strong>PERSON</strong>: Names of individuals (e.g., authors, historical figures)</ListItem>
          <ListItem><strong>ORGANIZATION</strong>: Companies, institutions, or groups</ListItem>
          <ListItem><strong>LOCATION</strong>: Geographic locations, places, or landmarks</ListItem>
          <ListItem><strong>UNKNOWN</strong>: Entities that don't clearly fit into other categories</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Salience Score</SectionTitle>
        <Text>
          The salience score (0-100%) indicates how important or central an entity is to the overall content:
        </Text>
        <List>
          <ListItem>Higher percentages (e.g., 80-100%) suggest the entity is a primary subject</ListItem>
          <ListItem>Medium percentages (e.g., 30-79%) indicate significant but not dominant entities</ListItem>
          <ListItem>Lower percentages (e.g., 1-29%) represent less prominent mentions</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Sentiment Analysis</SectionTitle>
        <Text>
          The overall sentiment of the content is described using one of these terms:
        </Text>
        <List>
          <ListItem><strong>Positive</strong>: Strongly favorable or optimistic content</ListItem>
          <ListItem><strong>Optimistic</strong>: Moderately positive outlook</ListItem>
          <ListItem><strong>Balanced</strong>: Neutral or mixed sentiment</ListItem>
          <ListItem><strong>Critical</strong>: Moderately negative perspective</ListItem>
          <ListItem><strong>Negative</strong>: Strongly unfavorable or pessimistic content</ListItem>
        </List>
      </Section>
    </Container>
  );
}
