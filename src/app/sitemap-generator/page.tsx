import { Metadata } from 'next';
import SitemapGenerator from '@/components/SitemapGenerator';
import './styles.css';

export const metadata: Metadata = {
  title: 'XML Sitemap Generator - SEO Tools',
  description: 'Generate XML sitemaps for your website with our easy-to-use tool. Optimize your site structure and improve search engine crawling.',
  keywords: 'XML sitemap generator, sitemap creator, SEO tools, website optimization, search engine optimization',
};

export default function SitemapGeneratorPage() {
  return (
    <main className="sitemap-generator-container">
      <h1 className="page-title">XML Sitemap Generator</h1>
      <div className="generator-grid">
        <SitemapGenerator />
      </div>

      <section className="about-section">
        <h2 className="section-title">About Our XML Sitemap Generator</h2>
        <p className="section-text">
          Our XML Sitemap Generator is a powerful tool designed to help you create and manage sitemaps for your website. Whether you have a small blog or a large e-commerce site, having a properly structured sitemap is crucial for search engine optimization.
        </p>
        <p className="section-text">
          With support for multiple URL formats, custom priorities, and change frequencies, our generator helps you create comprehensive sitemaps that meet search engine requirements. The intuitive interface makes it easy to add, edit, and organize your URLs.
        </p>
        <p className="section-text">
          Built with modern web technologies and optimized for all devices, our generator ensures a smooth experience whether you're working on desktop or mobile. The responsive design adapts to your screen size while maintaining functionality and ease of use.
        </p>
      </section>

      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="faq-item">
          <h3 className="faq-question">What is an XML sitemap?</h3>
          <p className="faq-answer">
            An XML sitemap is a file that lists all the important URLs on your website, along with metadata about each URL such as when it was last updated, how often it changes, and its relative importance. This helps search engines better understand and crawl your website's structure.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">How do I use the XML Sitemap Generator?</h3>
          <p className="faq-answer">
            Simply enter your website's URLs into the generator, along with optional metadata like change frequency and priority. You can add URLs manually or import them from a file. Once you've added all your URLs, click "Generate Sitemap" to create your XML sitemap file.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">What information should I include in my sitemap?</h3>
          <p className="faq-answer">
            Your sitemap should include all important pages on your website that you want search engines to index. For each URL, you can specify the last modification date, change frequency (how often the page is updated), and priority (relative importance of the page on your site).
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">How do I submit my sitemap to search engines?</h3>
          <p className="faq-answer">
            After generating your sitemap, you can submit it to search engines through their respective webmaster tools (like Google Search Console or Bing Webmaster Tools). You can also add a reference to your sitemap in your robots.txt file to help search engines discover it automatically.
          </p>
        </div>
      </section>
    </main>
  );
}
