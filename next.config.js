/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.delivery",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
