'use client';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Entity, AnalysisResult } from '@/types/analysis';
import { Container, Card } from '@/components/shared/StyledComponents';

const TestContainer = styled(Container)`
  padding: 2rem;
`;

const TestCase = styled(Card)`
  margin-bottom: 2rem;
  padding: 1.5rem;
`;

const TestInput = styled.textarea`
  width: 100%;
  min-height: 150px;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-family: monospace;
`;

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background: var(--primary-dark);
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const EntityCard = styled(Card)`
  padding: 1rem;
`;

const EntityType = styled.span<{ type: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 0.5rem;
  background: ${props => {
    switch (props.type) {
      case 'PERSON': return 'var(--primary-light)';
      case 'ORGANIZATION': return 'var(--info-light)';
      case 'LOCATION': return 'var(--warning-light)';
      default: return 'var(--surface-hover)';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'PERSON': return 'var(--primary-color)';
      case 'ORGANIZATION': return 'var(--info-color)';
      case 'LOCATION': return 'var(--warning-color)';
      default: return 'var(--text-secondary)';
    }
  }};
`;

const testCases = [
  {
    name: 'News Article',
    content: `
      Apple CEO Tim Cook announced today at their headquarters in Cupertino, California 
      that the tech giant is partnering with Microsoft and Google on a new AI initiative. 
      The project, which will be led by Dr. Sarah Johnson from Stanford University, 
      aims to revolutionize how artificial intelligence is used in consumer products.
      
      Meanwhile, in New York, Tesla's Elon Musk commented on the collaboration, 
      suggesting that SpaceX might also join the initiative. The announcement caused 
      shares of NVIDIA and AMD to rise sharply on Wall Street.
    `.trim()
  },
  {
    name: 'Company Press Release',
    content: `
      ACME Corporation (NYSE: ACME) today announced the acquisition of TechStart Inc., 
      a leading provider of cloud computing solutions based in Seattle, Washington. 
      The deal, valued at $500 million, was negotiated by CEO Jane Smith and CFO 
      Robert Johnson. The combined company will maintain offices in both Silicon Valley 
      and the Pacific Northwest.
      
      "This strategic acquisition positions us well in the competitive cloud computing 
      market," said Chairman William Brown at the company's headquarters in San Francisco.
    `.trim()
  },
  {
    name: 'Product Launch',
    content: `
      Samsung Electronics unveiled its latest flagship smartphone, the Galaxy S24 Ultra, 
      at their Unpacked event in Seoul, South Korea. The device features technology 
      from Qualcomm and partnerships with Meta and Amazon for enhanced social media 
      and shopping experiences.
      
      The launch event was attended by executives from major carriers including 
      AT&T and Verizon, as well as representatives from Deutsche Telekom and 
      Vodafone Group.
    `.trim()
  }
];

export default function EntityTest() {
  const [results, setResults] = useState<Record<string, AnalysisResult>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const analyzeContent = async (content: string, caseName: string) => {
    setLoading(prev => ({ ...prev, [caseName]: true }));
    
    try {
      const response = await fetch('/api/entity-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: 'data:text/html,' + encodeURIComponent(content) 
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const result = await response.json();
      setResults(prev => ({ ...prev, [caseName]: result }));
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setLoading(prev => ({ ...prev, [caseName]: false }));
    }
  };

  return (
    <TestContainer>
      <h1>Entity Analysis Test</h1>
      {testCases.map(testCase => (
        <TestCase key={testCase.name}>
          <h2>{testCase.name}</h2>
          <TestInput 
            defaultValue={testCase.content}
            onChange={(e) => {
              testCase.content = e.target.value;
            }}
          />
          <Button
            onClick={() => analyzeContent(testCase.content, testCase.name)}
            disabled={loading[testCase.name]}
          >
            {loading[testCase.name] ? 'Analyzing...' : 'Analyze'}
          </Button>

          {results[testCase.name] && (
            <>
              <h3>Sentiment</h3>
              <p>
                {results[testCase.name].sentiment} 
                ({(results[testCase.name].sentimentConfidence * 100).toFixed(1)}% confidence)
              </p>
              <p>{results[testCase.name].sentimentExplanation}</p>

              <h3>Entities</h3>
              <ResultsGrid>
                {results[testCase.name].entities.map((entity: Entity, index: number) => (
                  <EntityCard key={index}>
                    <div>
                      <strong>{entity.name}</strong>
                      <EntityType type={entity.type}>{entity.type}</EntityType>
                    </div>
                    <div>Confidence: {(entity.confidence * 100).toFixed(1)}%</div>
                    <div>Mentions: {entity.mentions}×</div>
                    <div>Salience: {(entity.salience * 100).toFixed(1)}%</div>
                    {entity.category && <div>Category: {entity.category}</div>}
                    {entity.context && (
                      <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                        Context: "{entity.context}"
                      </div>
                    )}
                  </EntityCard>
                ))}
              </ResultsGrid>

              <h3>Metadata</h3>
              <pre style={{ overflow: 'auto', padding: '1rem', background: 'var(--surface-color)' }}>
                {JSON.stringify(results[testCase.name].metadata, null, 2)}
              </pre>
            </>
          )}
        </TestCase>
      ))}
    </TestContainer>
  );
}
