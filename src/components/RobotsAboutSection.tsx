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

export default function RobotsAboutSection() {
  return (
    <Section>
      <Title>About Robots.txt Tester</Title>
      <Text>
        Our Robots.txt Tester is a powerful tool designed to help webmasters and SEO professionals validate and test their robots.txt directives to ensure proper search engine crawler access control.
      </Text>
      <List>
        <ListItem>
          Test robots.txt rules against specific URLs and user agents
        </ListItem>
        <ListItem>
          Validate syntax and identify potential configuration errors
        </ListItem>
        <ListItem>
          Support for all major search engine crawlers including Googlebot, Bingbot, and more
        </ListItem>
        <ListItem>
          Real-time testing with detailed explanations of rule matches
        </ListItem>
      </List>
      <Text>
        Understanding and properly configuring your robots.txt file is crucial for SEO success. Our tester helps you ensure your crawl directives are working as intended and your important pages are accessible to search engines.
      </Text>
    </Section>
  );
}
