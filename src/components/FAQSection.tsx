import styled from '@emotion/styled';

const Container = styled.div`
  margin: 3rem 0;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const FAQList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const FAQItem = styled.div`
  h3 {
    color: var(--primary-color);
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
    font-weight: 600;
  }

  p {
    color: var(--text-color);
    line-height: 1.6;
    font-size: 1rem;
  }
`;

export default function FAQSection() {
  return (
    <Container>
      <Title>Frequently Asked Questions</Title>
      <FAQList>
        <FAQItem>
          <h3>What are entity types?</h3>
          <p>
            Entity types categorize the identified entities into groups such as PERSON (individuals), ORGANIZATION (companies, institutions), LOCATION (places, geographical areas), and others. This classification helps understand the nature of each entity mentioned in the content.
          </p>
        </FAQItem>

        <FAQItem>
          <h3>What is entity salience?</h3>
          <p>
            Salience is a percentage that indicates how important or central an entity is to the overall content. A higher percentage (e.g., 80%) means the entity is a major focus of the text, while a lower percentage suggests it plays a more minor role.
          </p>
        </FAQItem>

        <FAQItem>
          <h3>What is sentiment analysis?</h3>
          <p>
            Sentiment analysis determines the overall emotional tone of the content regarding each entity. It can be Positive, Negative, or Neutral, helping you understand how the content portrays different subjects and what emotional impact it might have on readers.
          </p>
        </FAQItem>

        <FAQItem>
          <h3>How can I use this for SEO?</h3>
          <p>
            Entity analysis helps optimize content by identifying key topics and their relationships, ensuring proper coverage of relevant subjects, and understanding content sentiment. This information can guide content strategy and help improve topical authority.
          </p>
        </FAQItem>
      </FAQList>
    </Container>
  );
}
