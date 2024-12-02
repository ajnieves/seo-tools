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

export default function CalculatorAboutSection() {
  return (
    <Section>
      <Title>About Percentage Calculator</Title>
      <Text>
        Our Percentage Calculator is a versatile tool designed to help you perform various percentage calculations quickly and accurately, particularly useful for SEO metrics and analytics.
      </Text>
      <List>
        <ListItem>
          Calculate what percentage one number is of another
        </ListItem>
        <ListItem>
          Find percentage increases and decreases between values
        </ListItem>
        <ListItem>
          Calculate percentage changes for conversion rates and metrics
        </ListItem>
        <ListItem>
          Compare before and after values with percentage differences
        </ListItem>
      </List>
      <Text>
        Whether you're analyzing conversion rates, bounce rates, or other SEO metrics, our calculator helps you understand the percentage relationships between your numbers and track performance changes over time.
      </Text>
    </Section>
  );
}
