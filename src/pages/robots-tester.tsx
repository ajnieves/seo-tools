import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import RobotsTester from '@/components/RobotsTester';
import RobotsHowItWorks from '@/components/RobotsHowItWorks';
import RobotsFAQ from '@/components/RobotsFAQ';

const Main = styled.main`
  max-width: 1200px;
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

export default function RobotsTesterPage() {
  return (
    <>
      <PageHead />
      <Main>
        <article>
          <Header>
            <Title>Robots.txt Tester</Title>
          </Header>
          
          <ToolSection aria-label="Robots.txt Tester Tool">
            <RobotsTester />
          </ToolSection>
          
          <RobotsHowItWorks />
          <RobotsFAQ />
        </article>
      </Main>
    </>
  );
}
