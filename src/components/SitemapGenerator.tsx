import { useState } from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import {
  Container,
  Card,
  Grid,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  ErrorMessage
} from './shared/StyledComponents';

interface URLEntry {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const URLCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  background: var(--surface-color);
  
  &:hover {
    border-color: var(--primary-color);
  }
`;

const URLTitle = styled.div`
  color: var(--primary-color);
  font-size: 1rem;
  word-break: break-all;
`;

const URLMeta = styled.div`
  color: var(--text-secondary);
  font-size: 0.875rem;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
`;

const MetaTag = styled.span`
  background: var(--surface-hover);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  color: var(--text-color);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-top: var(--space-6);
`;

const XMLPreview = styled.pre`
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  color: var(--text-color);
  font-family: monospace;
  font-size: 0.875rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: var(--space-6);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: var(--surface-hover);
    border-radius: var(--radius-full);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: var(--radius-full);
  }
`;

export default function SitemapGenerator() {
  const [urls, setUrls] = useState<URLEntry[]>([]);
  const [currentURL, setCurrentURL] = useState('');
  const [changefreq, setChangefreq] = useState('monthly');
  const [priority, setPriority] = useState('0.5');
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleAddURL = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      new URL(currentURL);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setUrls([...urls, {
      url: currentURL,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq,
      priority
    }]);
    setCurrentURL('');
  };

  const generateSitemap = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    const blob = new Blob([xml], { type: 'text/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Card>
        <Form onSubmit={handleAddURL}>
          <FormGroup>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={currentURL}
              onChange={(e) => setCurrentURL(e.target.value)}
              placeholder="https://example.com/page"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="changefreq">Change Frequency</Label>
            <Select
              id="changefreq"
              value={changefreq}
              onChange={(e) => setChangefreq(e.target.value)}
            >
              <option value="always">Always</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="never">Never</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="priority">Priority</Label>
            <Select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="1.0">1.0</option>
              <option value="0.9">0.9</option>
              <option value="0.8">0.8</option>
              <option value="0.7">0.7</option>
              <option value="0.6">0.6</option>
              <option value="0.5">0.5</option>
              <option value="0.4">0.4</option>
              <option value="0.3">0.3</option>
              <option value="0.2">0.2</option>
              <option value="0.1">0.1</option>
            </Select>
          </FormGroup>

          <Button type="submit">Add URL</Button>
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {urls.length > 0 && (
          <>
            <Grid columns={2}>
              {urls.map((entry, index) => (
                <URLCard key={index}>
                  <URLTitle>{entry.url}</URLTitle>
                  <URLMeta>
                    <MetaTag>Last Modified: {entry.lastmod}</MetaTag>
                    <MetaTag>Change Frequency: {entry.changefreq}</MetaTag>
                    <MetaTag>Priority: {entry.priority}</MetaTag>
                  </URLMeta>
                </URLCard>
              ))}
            </Grid>

            <ButtonGroup>
              <Button onClick={generateSitemap}>Download Sitemap</Button>
              <Button onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </ButtonGroup>

            {showPreview && (
              <XMLPreview>
                {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`}
              </XMLPreview>
            )}
          </>
        )}
      </Card>
    </Container>
  );
}
