const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://technicalseotools.io';

const pages = [
  {
    url: '/',
    priority: '1.0',
    changefreq: 'daily'
  },
  {
    url: '/sitemap-generator',
    priority: '0.8',
    changefreq: 'daily'
  },
  {
    url: '/rss-parser',
    priority: '0.8',
    changefreq: 'daily'
  },
  {
    url: '/robots-tester',
    priority: '0.8',
    changefreq: 'daily'
  },
  {
    url: '/percentage-calculator',
    priority: '0.8',
    changefreq: 'daily'
  }
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${BASE_URL}${page.url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  // Write sitemap
  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    sitemap.trim()
  );

  // Update robots.txt
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml`;

  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'robots.txt'),
    robotsTxt.trim()
  );

  console.log('Sitemap and robots.txt generated successfully!');
};

generateSitemap();
