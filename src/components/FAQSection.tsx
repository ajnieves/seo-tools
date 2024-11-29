'use client';
import styled from '@emotion/styled';

const Section = styled.section`
  margin-top: 2rem;
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

const QuestionWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Question = styled.h3`
  color: #00ff9d;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const Answer = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

export default function FAQSection() {
  return (
    <Section>
      <Title>Frequently Asked Questions</Title>
      
      <QuestionWrapper>
        <Question>How do I calculate what percentage one number is of another?</Question>
        <Answer>
          To find what percentage A is of B, divide A by B and multiply by 100. For example, to find what percentage 25 is of 100, calculate: (25 ÷ 100) × 100 = 25%. Our calculator automates this process - simply enter your numbers in the "X is what % of Y?" section.
        </Answer>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>How do I calculate a percentage increase or decrease?</Question>
        <Answer>
          To calculate a percentage change, subtract the original value from the new value, divide by the original value, and multiply by 100. Our calculator handles this automatically in the "What is the percentage increase/decrease?" section, showing results in green for increases and red for decreases.
        </Answer>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>Why can't I use zero as an initial value when calculating percentage changes?</Question>
        <Answer>
          You cannot calculate a percentage change from zero because any number divided by zero is undefined. When calculating percentage changes, the initial value serves as the base for the calculation, so it must be a non-zero number.
        </Answer>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>How accurate are the calculations?</Question>
        <Answer>
          Our calculator provides results with two decimal places of precision, which is suitable for most practical applications. All calculations are performed using JavaScript's native number handling, ensuring reliable and accurate results for typical percentage calculations.
        </Answer>
      </QuestionWrapper>

      <QuestionWrapper>
        <Question>Can I calculate complex percentage changes?</Question>
        <Answer>
          Yes! Our calculator can handle any percentage calculation, including compound changes. For sequential percentage changes, you can use the "Calculate Value After Percentage Change" calculator multiple times, using each result as the starting value for the next calculation.
        </Answer>
      </QuestionWrapper>
    </Section>
  );
}
