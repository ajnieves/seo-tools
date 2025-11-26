import styled from '@emotion/styled';
import PageHead from '@/components/PageHead';

const Main = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-6);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: var(--space-8);
`;

const Title = styled.h1`
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
`;

const Section = styled.section`
  margin-bottom: var(--space-8);
  background: var(--surface-color);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
`;

const SectionTitle = styled.h2`
  color: var(--text-color);
  font-size: 1.75rem;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--border-color);
`;

const Paragraph = styled.p`
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--space-4);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const List = styled.ul`
  color: var(--text-secondary);
  line-height: 1.8;
  margin-left: var(--space-6);
  margin-bottom: var(--space-4);
`;

const ListItem = styled.li`
  margin-bottom: var(--space-2);
`;

const CodeBlock = styled.code`
  display: block;
  background: var(--background-color);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  font-family: 'Courier New', monospace;
  color: var(--primary-color);
  overflow-x: auto;
  margin: var(--space-4) 0;
`;

const ContactLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function AboutPage() {
  return (
    <>
      <PageHead />
      <Main>
        <Header>
          <Title>About SEO Tools</Title>
        </Header>

        <Section>
          <SectionTitle>Our Mission</SectionTitle>
          <Paragraph>
            Technical SEO Tools provides free, open-source tools to help website owners, 
            developers, and SEO professionals analyze and optimize their web presence. 
            We believe in transparency, ethical practices, and respecting the web ecosystem.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Our Bot: SEOToolsBot</SectionTitle>
          <Paragraph>
            When our tools analyze websites on your behalf, we use an automated bot that 
            identifies itself honestly and transparently:
          </Paragraph>
          
          <CodeBlock>
            User-Agent: SEOToolsBot/1.0 (+https://technicalseotools.io/about; contact@technicalseotools.io)
          </CodeBlock>

          <Paragraph>
            <strong>Why we identify as a bot:</strong>
          </Paragraph>
          <List>
            <ListItem>
              <strong>Honesty:</strong> We don&apos;t pretend to be a browser or hide our identity
            </ListItem>
            <ListItem>
              <strong>Respect:</strong> Website owners have the right to control bot access
            </ListItem>
            <ListItem>
              <strong>Compliance:</strong> We follow web scraping best practices and standards
            </ListItem>
            <ListItem>
              <strong>Transparency:</strong> Site owners can easily identify and contact us
            </ListItem>
          </List>
        </Section>

        <Section>
          <SectionTitle>Ethical Principles</SectionTitle>
          
          <Paragraph>
            <strong>1. We Respect Access Controls</strong>
          </Paragraph>
          <Paragraph>
            If a website blocks bot access (401/403 responses), our tools will inform you 
            that the site doesn&apos;t allow automated access. We don&apos;t attempt to 
            circumvent these protections.
          </Paragraph>

          <Paragraph>
            <strong>2. We Honor robots.txt</strong>
          </Paragraph>
          <Paragraph>
            While our tools fetch single pages on-demand (not crawling), we respect websites 
            that block automated access and provide clear feedback when this occurs.
          </Paragraph>

          <Paragraph>
            <strong>3. User-Initiated Requests Only</strong>
          </Paragraph>
          <Paragraph>
            We only analyze websites when users explicitly request it. We don&apos;t 
            automatically crawl or index the web.
          </Paragraph>

          <Paragraph>
            <strong>4. Rate Limiting & Courtesy</strong>
          </Paragraph>
          <Paragraph>
            Our tools include request timeouts and don&apos;t overwhelm target servers. 
            Each analysis is a single request initiated by a user.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>For Website Owners</SectionTitle>
          <Paragraph>
            If you&apos;re a website owner and have questions or concerns about SEOToolsBot:
          </Paragraph>
          
          <List>
            <ListItem>
              <strong>Contact us:</strong> <ContactLink href="mailto:contact@technicalseotools.io">
                contact@technicalseotools.io
              </ContactLink>
            </ListItem>
            <ListItem>
              <strong>Block our bot:</strong> Add to your robots.txt or return 403 status codes
            </ListItem>
            <ListItem>
              <strong>Report issues:</strong> We&apos;re committed to being good web citizens
            </ListItem>
          </List>

          <Paragraph>
            To block SEOToolsBot in robots.txt:
          </Paragraph>
          
          <CodeBlock>
            User-agent: SEOToolsBot{'\n'}
            Disallow: /
          </CodeBlock>
        </Section>

        <Section>
          <SectionTitle>Open Source</SectionTitle>
          <Paragraph>
            This project is open source and available on GitHub. We believe in transparency 
            not just in our bot behavior, but in our code as well.
          </Paragraph>
          <Paragraph>
            <ContactLink href="https://github.com/ajnieves/seo-tools" target="_blank" rel="noopener noreferrer">
              View on GitHub →
            </ContactLink>
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <Paragraph>
            Have questions, feedback, or concerns? We&apos;d love to hear from you:
          </Paragraph>
          <List>
            <ListItem>
              <strong>Email:</strong> <ContactLink href="mailto:contact@technicalseotools.io">
                contact@technicalseotools.io
              </ContactLink>
            </ListItem>
            <ListItem>
              <strong>GitHub:</strong> <ContactLink 
                href="https://github.com/ajnieves/seo-tools" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                github.com/ajnieves/seo-tools
              </ContactLink>
            </ListItem>
          </List>
        </Section>
      </Main>
    </>
  );
}

