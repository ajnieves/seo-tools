import type { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import Sidebar from '@/components/Sidebar';
import MobileMenu from '@/components/MobileMenu';
import Footer from '@/components/Footer';

const globalStyles = css`
  :root {
    --primary-color: #00ff9d;
    --text-color: #333;
    --text-secondary: #666;
    --background-color: #121212;
    --surface-color: #1e1e1e;
    --border-color: #2d2d2d;
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
