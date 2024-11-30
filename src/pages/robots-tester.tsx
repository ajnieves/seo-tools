import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';
import RobotsTester from '@/components/RobotsTester';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

export default function RobotsTesterPage() {
  return (
    <>
      <PageHead page="robotsTester" />
      
      <Container>
        <Title>Robots.txt Tester</Title>
        <RobotsTester />
        <AboutSection />
        <FAQSection />
      </Container>
    </>
  );
}
