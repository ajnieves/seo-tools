import styled from '@emotion/styled';

const Container = styled.div`
  margin: 3rem 0;
`;

const Title = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  background: var(--surface-color);
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

  tr:last-child {
    td {
      border-bottom: none;
    }
  }
`;

export default function InfoSection() {
  return (
    <Container>
      <Title>Entity Types Reference</Title>
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
    </Container>
  );
}
