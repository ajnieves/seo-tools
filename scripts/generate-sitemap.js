const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://technicalseotools.io';

// All pages with accurate change frequencies and priorities
const pages = [
  {
    url: '/',
    priority: '1.0',
    changefreq: 'weekly'  // Home page updates when new tools are added
  },
  {
    url: '/sitemap-generator',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    url: '/rss-parser',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    url: '/robots-tester',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    url: '/percentage-calculator',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    url: '/article-evaluator',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    url: '/entity-analyzer',
    priority: '0.9',
    changefreq: 'monthly'
  }
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemap
  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    sitemap.trim()
  );

  // Update robots.txt with additional directives
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# API endpoints should not be crawled
Disallow: /api/

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay suggestion (optional, respected by some crawlers)
Crawl-delay: 1`;

  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'robots.txt'),
    robotsTxt.trim()
  );

  console.log('Sitemap and robots.txt generated successfully!');
  console.log(`- ${pages.length} pages in sitemap`);
  console.log(`- Sitemap: ${BASE_URL}/sitemap.xml`);
};

generateSitemap();
