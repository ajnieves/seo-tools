/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  experimental: {
    appDir: false
  }
};

module.exports = nextConfig;
