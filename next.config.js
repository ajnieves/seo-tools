/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  // ESLint is now enabled during builds
  // Fix any linting errors before deploying
};

module.exports = nextConfig;
