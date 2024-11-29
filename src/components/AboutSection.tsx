import styled from '@emotion/styled';

const Container = styled.div`
  margin: 3rem 0;
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
`;

export default function AboutSection() {
  return (
    <Container>
      <Title>About Entity Analysis</Title>
      <Text>
        The Entity Analyzer tool uses advanced natural language processing to identify and extract named entities from web content. It helps you understand the key subjects, organizations, locations, and other important elements mentioned in any webpage.
      </Text>
      <Text>
        Our tool not only identifies entities but also determines their relevance and the overall sentiment of the content, providing valuable insights for content analysis and SEO optimization.
      </Text>
    </Container>
  );
}
