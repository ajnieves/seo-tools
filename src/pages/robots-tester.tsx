'use client';
import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';
import RobotsTester from '@/components/RobotsTester';
import RobotsHowItWorks from '@/components/RobotsHowItWorks';
import RobotsFAQ from '@/components/RobotsFAQ';
import { Container } from '@/components/shared/StyledComponents';

const Title = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: var(--space-6);
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContentContainer = styled(Container)`
  max-width: 1200px;
`;

export default function RobotsTesterPage() {
  return (
    <>
      <PageHead />
      <ContentContainer>
        <Title>Robots.txt Tester</Title>
        <RobotsTester />
        <RobotsHowItWorks />
        <RobotsFAQ />
      </ContentContainer>
    </>
  );
}
