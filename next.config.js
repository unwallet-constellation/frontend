/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // https://jotai.org/docs/tools/swc
    swcPlugins: [
      ['@swc-jotai/react-refresh', {}],
      ['@swc-jotai/debug-label', {}],
    ],
  },
}

module.exports = nextConfig
