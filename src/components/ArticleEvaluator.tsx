import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import styles from '../styles/ArticleEvaluator.module.css';

interface EvaluationResult {
  currentH1: string;
  currentMetaTitle: string;
  currentMetaDescription: string;
  recommendedH1: string;
  recommendedMetaTitle: string;
  recommendedMetaDescription: string;
  sentiment?: {
    type: 'positive' | 'neutral' | 'negative';
    explanation: string;
  };
}

type TabType = 'seo' | 'sentiment';

const ArticleEvaluator: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState('');
  const [includeSentiment, setIncludeSentiment] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('seo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('Submitting request:', { url, includeSentiment });
      const response = await fetch('/api/evaluate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, includeSentiment }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to evaluate article');
      }

      setResult(data);
    } catch (err: any) {
      console.error('Error in handleSubmit:', err);
      setError(err.message || 'Failed to evaluate article. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (text: string, min: number, max: number) => {
    const count = text.length;
    if (count < min) return 'warning';
    if (count > max) return 'error';
    return 'success';
  };

  const getStatusText = (text: string, min: number, max: number) => {
    const count = text.length;
    return `${count}/${max}`;
  };

  const getSentimentColor = (type: string) => {
    switch (type) {
      case 'positive':
        return styles.positive;
      case 'negative':
        return styles.negative;
      default:
        return styles.neutral;
    }
  };

  return (
    <main className={styles.container} role="main">
      <div className={styles.searchSection}>
        <form onSubmit={handleSubmit} aria-label="URL evaluation form">
          <div className={styles.searchBar}>
            <div className={styles.inputGroup}>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter article URL"
                required
                className={styles.input}
                aria-label="Article URL"
              />
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={includeSentiment}
                  onChange={(e) => setIncludeSentiment(e.target.checked)}
                  className={styles.toggleInput}
                />
                <span className={styles.toggleLabel}>Include Sentiment Analysis</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className={styles.button}
              aria-busy={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="16px" inline hideText />
                  <span>Analyzing</span>
                </span>
              ) : (
                'Analyze'
              )}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className={styles.loadingState} role="status">
          <LoadingSpinner text="Analyzing article metadata..." size="32px" />
        </div>
      )}

      {error && (
        <div className={styles.error} role="alert">
          <span aria-hidden="true">⚠</span>
          {error}
        </div>
      )}

      {result && (
        <div className={styles.results} role="region" aria-label="Analysis Results">
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'seo' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('seo')}
              aria-selected={activeTab === 'seo'}
              role="tab"
            >
              SEO Analysis
            </button>
            {includeSentiment && result.sentiment && (
              <button
                className={`${styles.tab} ${activeTab === 'sentiment' ? styles.activeTab : ''}`}
                onClick={() => setActiveTab('sentiment')}
                aria-selected={activeTab === 'sentiment'}
                role="tab"
              >
                Sentiment Analysis
              </button>
            )}
          </div>

          {activeTab === 'seo' && (
            <div className={styles.section} role="tabpanel">
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Element</th>
                    <th scope="col">Current</th>
                    <th scope="col">Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  {/* H1 Row */}
                  <tr>
                    <th scope="row">H1</th>
                    <td className={styles.current}>
                      <div className={styles.content}>
                        {result.currentH1 || 'Not found'}
                      </div>
                    </td>
                    <td className={styles.recommended}>
                      <div className={styles.content}>
                        {result.recommendedH1}
                      </div>
                    </td>
                  </tr>

                  {/* Meta Title Row */}
                  <tr>
                    <th scope="row">Meta Title</th>
                    <td className={styles.current}>
                      <div className={styles.content}>
                        {result.currentMetaTitle || 'Not found'}
                      </div>
                      <div className={`${styles.metaInfo} ${styles[getStatus(result.currentMetaTitle, 50, 60)]}`}>
                        {getStatusText(result.currentMetaTitle, 50, 60)}
                      </div>
                    </td>
                    <td className={styles.recommended}>
                      <div className={styles.content}>
                        {result.recommendedMetaTitle}
                      </div>
                      <div className={`${styles.metaInfo} ${styles[getStatus(result.recommendedMetaTitle, 50, 60)]}`}>
                        {getStatusText(result.recommendedMetaTitle, 50, 60)}
                      </div>
                    </td>
                  </tr>

                  {/* Meta Description Row */}
                  <tr>
                    <th scope="row">Meta Description</th>
                    <td className={styles.current}>
                      <div className={styles.content}>
                        {result.currentMetaDescription || 'Not found'}
                      </div>
                      <div className={`${styles.metaInfo} ${styles[getStatus(result.currentMetaDescription, 150, 160)]}`}>
                        {getStatusText(result.currentMetaDescription, 150, 160)}
                      </div>
                    </td>
                    <td className={styles.recommended}>
                      <div className={styles.content}>
                        {result.recommendedMetaDescription}
                      </div>
                      <div className={`${styles.metaInfo} ${styles[getStatus(result.recommendedMetaDescription, 150, 160)]}`}>
                        {getStatusText(result.recommendedMetaDescription, 150, 160)}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'sentiment' && result.sentiment && (
            <div className={styles.section} role="tabpanel">
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Sentiment</th>
                    <th scope="col">Explanation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={`${styles.sentiment} ${getSentimentColor(result.sentiment.type)}`}>
                      {result.sentiment.type}
                    </td>
                    <td className={styles.explanation}>
                      {result.sentiment.explanation}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ArticleEvaluator;
