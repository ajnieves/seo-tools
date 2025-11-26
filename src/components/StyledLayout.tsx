
import styled from '@emotion/styled';

export const MainContent = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    margin-left: 280px;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem 1rem;

  @media (min-width: 769px) {
    padding: 2rem;
  }
`;
