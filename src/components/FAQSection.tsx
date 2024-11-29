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

const FAQList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const FAQItem = styled.div`
  padding: 1.5rem;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-color);
  }
`;

const Question = styled.h3`
  color: var(--primary-color);
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Answer = styled.p`
  color: var(--text-color);
  line-height: 1.6;
  font-size: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: var(--background-color);
  border-radius: 8px;
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  th {
    background: rgba(0, 255, 157, 0.1);
    color: var(--primary-color);
    font-weight: 600;
  }

  td {
    color: var(--text-color);
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

export default function FAQSection() {
  return (
    <Container>
      <Title>Frequently Asked Questions</Title>
      <FAQList>
        <FAQItem>
          <Question>What are entity types?</Question>
          <Answer>
            Entity types categorize the identified entities into specific groups. Here are the main types our analyzer detects:
          </Answer>
          <Table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PERSON</td>
                <td>Individual names and personas</td>
                <td>Albert Einstein, Leonardo da Vinci</td>
              </tr>
              <tr>
                <td>ORGANIZATION</td>
                <td>Companies, institutions, and groups</td>
                <td>Google, United Nations, NASA</td>
              </tr>
              <tr>
                <td>LOCATION</td>
                <td>Places and geographical areas</td>
                <td>Paris, Mount Everest, Pacific Ocean</td>
              </tr>
              <tr>
                <td>EVENT</td>
                <td>Historical events and occurrences</td>
                <td>World War II, Olympics</td>
              </tr>
              <tr>
                <td>WORK</td>
                <td>Creative works and products</td>
                <td>Mona Lisa, iPhone, Harry Potter</td>
              </tr>
            </tbody>
          </Table>
        </FAQItem>

        <FAQItem>
          <Question>What is entity salience?</Question>
          <Answer>
            Salience is a percentage that indicates how important or central an entity is to the overall content. A higher percentage (e.g., 80%) means the entity is a major focus of the text, while a lower percentage suggests it plays a more minor role. This helps identify the most significant subjects in the content.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>How does sentiment analysis work?</Question>
          <Answer>
            Our sentiment analysis determines the emotional tone associated with each entity in the content. The sentiment can be Positive (expressing approval or favorable views), Negative (expressing criticism or unfavorable views), or Neutral (maintaining an objective perspective). This helps understand how the content portrays different subjects.
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>How can I use this for SEO?</Question>
          <Answer>
            Entity analysis provides valuable insights for SEO by helping you:
            - Understand the main topics and entities in your content
            - Ensure proper coverage of relevant subjects
            - Identify relationships between different entities
            - Optimize content sentiment for your target audience
            - Improve topical authority through comprehensive entity coverage
          </Answer>
        </FAQItem>

        <FAQItem>
          <Question>Are there any URL limitations?</Question>
          <Answer>
            The Entity Analyzer works with any publicly accessible webpage. The URL must start with http:// or https:// and be reachable from our servers. For best results, ensure the webpage contains meaningful text content rather than just images or media files.
          </Answer>
        </FAQItem>
      </FAQList>
    </Container>
  );
}
