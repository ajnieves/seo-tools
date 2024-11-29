'use client';
import { useState } from 'react';
import styled from '@emotion/styled';
import Button from './Button';

interface URLEntry {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const GeneratorSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  grid-column: 1 / -1;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  min-width: 120px;
  flex-shrink: 0;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a8e8;
    box-shadow: 0 0 0 2px rgba(0, 168, 232, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a8e8;
    box-shadow: 0 0 0 2px rgba(0, 168, 232, 0.2);
  }

  option {
    background: #1a1a2e;
    color: white;
  }
`;

const URLList = styled.div`
  margin-top: 2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const URLCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const URLTitle = styled.div`
  color: #00a8e8;
  font-size: 1rem;
  word-break: break-all;
`;

const URLMeta = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const MetaTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const XMLPreview = styled.pre`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: monospace;
  font-size: 0.875rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  padding: 1rem;
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 12px;
  background: rgba(255, 77, 77, 0.1);
  margin-top: 1rem;
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
    <GeneratorSection>
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

      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      {urls.length > 0 && (
        <>
          <URLList>
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
          </URLList>

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
    </GeneratorSection>
  );
}
