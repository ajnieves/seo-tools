import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';

const globalStyles = css`
  :root {
    --primary-color: #00ff9d;
    --primary-dark: #00cc7d;
    --text-color: #e1e1e1;
    --text-secondary: #a1a1a1;
    --background-color: #0a0a0a;
    --surface-color: #1a1a1a;
    --surface-hover: #252525;
    --border-color: #333;
    --error-color: #ff4d4d;
    --success-color: #00cc7d;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
    line-height: 1.2;
  }

  p {
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  input, textarea {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    font-size: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 255, 157, 0.1);
    }

    &::placeholder {
      color: var(--text-secondary);
    }
  }

  button {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    border: none;
    transition: all 0.2s ease;
    background: var(--primary-color);
    color: var(--background-color);

    &:hover:not(:disabled) {
      background: var(--primary-dark);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;

    th {
      background: var(--surface-hover);
      color: var(--primary-color);
      font-weight: 600;
      text-align: left;
    }

    th, td {
      padding: 1rem;
      border: 1px solid var(--border-color);
    }

    td {
      color: var(--text-color);
    }

    tr:hover td {
      background: var(--surface-hover);
    }
  }
`;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Layout>
        <Sidebar />
        <MobileMenu />
        <MainContent>
          <Component {...pageProps} />
          <Footer />
        </MainContent>
      </Layout>
    </>
  );
}

export default MyApp;
