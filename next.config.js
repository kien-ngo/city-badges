/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["gateway.ipfscdn.io", "cloudflare-ipfs.com"],
  },
  experimental: { images: { allowFutureImage: true } },
};

module.exports = nextConfig;
