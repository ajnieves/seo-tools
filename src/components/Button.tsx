'use client';
import styled from '@emotion/styled';

const StyledButton = styled.button`
  background: linear-gradient(135deg, #00a8e8, #00ff9d);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
