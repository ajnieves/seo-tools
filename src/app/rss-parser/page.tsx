import { Metadata } from 'next';
import RSSParser from '@/components/RSSParser';
import './styles.css';

export const metadata: Metadata = {
  title: 'RSS Feed Parser - SEO Tools',
  description: 'Parse and analyze RSS feeds with our easy-to-use tool. View feed content, validate structure, and extract useful information.',
  keywords: 'RSS parser, feed parser, RSS feed analyzer, RSS validation, feed reader',
};

export default function RSSParserPage() {
  return (
    <main className="rss-parser-container">
      <h1 className="page-title">RSS Feed Parser</h1>
      <div className="parser-grid">
        <RSSParser />
      </div>

      <section className="about-section">
        <h2 className="section-title">About Our RSS Feed Parser</h2>
        <p className="section-text">
          Our RSS Feed Parser is a powerful tool designed to help you analyze and extract content from any RSS feed. Whether you're monitoring blogs, news sites, or podcasts, our parser makes it easy to access and understand the content structure.
        </p>
        <p className="section-text">
          With real-time validation and error handling, you can quickly identify and resolve any issues with your RSS feeds. The clean, modern interface presents feed content in an organized and readable format, perfect for content creators and developers alike.
        </p>
        <p className="section-text">
          Built with modern web technologies and optimized for all devices, our parser ensures a smooth experience whether you're working on desktop or mobile. The responsive design adapts to your screen size while maintaining functionality and ease of use.
        </p>
      </section>

      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="faq-item">
          <h3 className="faq-question">What is an RSS feed?</h3>
          <p className="faq-answer">
            RSS (Really Simple Syndication) is a web feed format that allows users and applications to access updates from websites in a standardized way. RSS feeds contain article summaries, blog posts, or other web content along with metadata like publication date and author information.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">How do I use the RSS Feed Parser?</h3>
          <p className="faq-answer">
            Simply enter the URL of any RSS feed into the input field and click "Parse Feed". Our tool will fetch the feed content and display it in an organized format, showing titles, descriptions, and publication dates for each item.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">What types of RSS feeds can I parse?</h3>
          <p className="faq-answer">
            Our parser supports all standard RSS feed formats including RSS 2.0, RSS 1.0, and Atom feeds. It can handle feeds from blogs, news sites, podcasts, and any other source that provides RSS syndication.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Why isn't my feed loading?</h3>
          <p className="faq-answer">
            If your feed isn't loading, check that the URL is correct and the feed is publicly accessible. Some common issues include CORS restrictions, invalid feed formats, or server connectivity problems. Our tool provides clear error messages to help you identify and resolve any issues.
          </p>
        </div>
      </section>
    </main>
  );
}
