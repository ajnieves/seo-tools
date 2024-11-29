'use client';
import styled from '@emotion/styled';

const Section = styled.section`
  margin-top: 4rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Title = styled.h2`
  color: #00a8e8;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Paragraph = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export default function AboutSection() {
  return (
    <Section>
      <Title>About Our Percentage Calculator</Title>
      <Paragraph>
        Our comprehensive percentage calculator is a powerful tool designed to handle all your percentage-related calculations. Whether you need to calculate what percentage one number is of another, find a percentage of a number, determine value changes after percentage adjustments, or calculate percentage increases and decreases, our calculator has you covered.
      </Paragraph>
      <Paragraph>
        Each calculator is optimized for accuracy and ease of use, featuring real-time validation, clear error messages, and instant results. The color-coded output system helps you quickly understand whether values have increased (green) or decreased (red), making it perfect for financial calculations, academic work, or business analytics.
      </Paragraph>
      <Paragraph>
        Built with modern web technologies and optimized for all devices, our calculator ensures a smooth user experience whether you're on desktop or mobile. The intuitive interface and helpful tooltips make complex percentage calculations accessible to everyone, from students to professionals.
      </Paragraph>
    </Section>
  );
}
