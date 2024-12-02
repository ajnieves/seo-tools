import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';

const globalStyles = css`
  :root {
    /* Modern Color Palette */
    --primary-color: #00E5B0;
    --primary-dark: #00B38D;
    --primary-light: #7AFFDB;
    --text-color: #E4E4E7;
    --text-secondary: #A1A1AA;
    --background-color: #09090B;
    --surface-color: #18181B;
    --surface-hover: #27272A;
    --border-color: #3F3F46;
    --error-color: #EF4444;
    --success-color: #10B981;
    --warning-color: #F59E0B;
    --info-color: #3B82F6;

    /* Spacing Scale */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.5rem;
    --space-6: 2rem;
    --space-8: 3rem;
    --space-10: 4rem;

    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    --shadow-glow: 0 0 15px var(--primary-color);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
    background: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-color);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: var(--space-6);
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: var(--space-5);
    color: var(--primary-color);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: var(--space-4);
  }

  p {
    margin-bottom: var(--space-4);
    color: var(--text-color);
    font-size: 1.1rem;
  }

  input, textarea, select {
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    font-size: 1rem;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 229, 176, 0.1);
    }

    &::placeholder {
      color: var(--text-secondary);
    }
  }

  button {
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: var(--space-3) var(--space-5);
    border-radius: var(--radius-md);
    border: none;
    transition: all 0.2s ease;
    background: var(--primary-color);
    color: var(--background-color);

    &:hover:not(:disabled) {
      background: var(--primary-dark);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:active {
      transform: translateY(0);
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: var(--space-4) 0;
    background: var(--surface-color);
    border-radius: var(--radius-lg);
    overflow: hidden;

    th {
      background: var(--surface-hover);
      color: var(--primary-color);
      font-weight: 600;
      text-align: left;
      padding: var(--space-4);
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    td {
      padding: var(--space-4);
      border-top: 1px solid var(--border-color);
      color: var(--text-color);
    }

    tr:hover td {
      background: var(--surface-hover);
    }
  }

  /* Modern Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--surface-color);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: var(--radius-lg);
    border: 2px solid var(--surface-color);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
  }
`;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: var(--space-6);
  position: relative;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: var(--space-4);
    padding-top: var(--space-10);
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
