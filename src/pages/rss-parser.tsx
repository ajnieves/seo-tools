import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import RSSParser from '@/components/RSSParser';
import RSSHowItWorks from '@/components/RSSHowItWorks';
import RSSFAQ from '@/components/RSSFAQ';

const Main = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-4);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: var(--space-6);
`;

const Title = styled.h1`
  color: var(--primary-color);
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ToolSection = styled.section`
  margin-bottom: var(--space-8);
`;

export default function RSSParserPage() {
  return (
    <>
      <PageHead />
      <Main>
        <article>
          <Header>
            <Title>RSS Feed Parser</Title>
          </Header>
          
          <ToolSection aria-label="RSS Parser Tool">
            <RSSParser />
          </ToolSection>
          
          <RSSHowItWorks />
          <RSSFAQ />
        </article>
      </Main>
    </>
  );
}
