import { Metadata } from 'next';
import RobotsTester from '@/components/RobotsTester';
import './styles.css';

export const metadata: Metadata = {
  title: 'Robots.txt Tester - SEO Tools',
  description: 'Test and validate your robots.txt file with our easy-to-use tool. Check URL patterns, analyze directives, and ensure proper search engine crawling.',
  keywords: 'robots.txt tester, robots.txt validator, SEO tools, search engine optimization, web crawler',
};

export default function RobotsTesterPage() {
  return (
    <main className="robots-tester-container">
      <h1 className="page-title">Robots.txt Tester</h1>
      <div className="tester-grid">
        <RobotsTester />
      </div>

      <section className="about-section">
        <h2 className="section-title">About Our Robots.txt Tester</h2>
        <p className="section-text">
          Our Robots.txt Tester is a powerful tool designed to help you validate and test your robots.txt file configurations. Whether you're managing a small website or a large web application, ensuring proper crawler access is crucial for SEO success.
        </p>
        <p className="section-text">
          With real-time validation and pattern matching, you can quickly verify if search engine crawlers have the correct access to your web pages. The intuitive interface makes it easy to test different user-agents and URL patterns, helping you optimize your site's crawlability.
        </p>
        <p className="section-text">
          Built with modern web technologies and optimized for all devices, our tester provides instant feedback and clear explanations of robots.txt directives, making it an essential tool for webmasters and SEO professionals.
        </p>
      </section>

      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="faq-item">
          <h3 className="faq-question">What is a robots.txt file?</h3>
          <p className="faq-answer">
            A robots.txt file is a text file that tells search engine crawlers which pages or files they can or can't request from your site. It's used to manage crawler traffic and specify which parts of your site should be accessible to search engines.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">How do I use the Robots.txt Tester?</h3>
          <p className="faq-answer">
            Simply paste your robots.txt content into the input field and enter the URL you want to test. Select a user-agent from the dropdown menu or enter a custom one, then click "Test Access" to see if the URL would be allowed or blocked based on your robots.txt rules.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">What do the test results mean?</h3>
          <p className="faq-answer">
            The tester will show whether a URL is "Allowed" or "Blocked" based on your robots.txt rules. It also provides detailed explanations of which specific directive in your robots.txt file led to that result, helping you understand and debug your configuration.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Why is my robots.txt important for SEO?</h3>
          <p className="faq-answer">
            Your robots.txt file helps search engines understand which parts of your site they should crawl and index. Proper configuration ensures that search engines focus on your important content while avoiding unnecessary pages, helping optimize your crawl budget and SEO performance.
          </p>
        </div>
      </section>
    </main>
  );
}
