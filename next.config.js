/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["gateway.ipfscdn.io", "cloudflare-ipfs.com"],
  },
};

module.exports = nextConfig;
