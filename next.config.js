/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
