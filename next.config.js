/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg')) ?? {};

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        // issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
      },
    ],
  },
  env: {
    NEXT_BASE_API_URL: process.env.NEXT_BASE_API_URL,
    NEXT_STATIC_SERVER_URL: process.env.NEXT_STATIC_SERVER_URL,
  },
};

module.exports = nextConfig;
