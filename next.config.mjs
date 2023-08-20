import nextra from "nextra";

// /** @type {import('next').NextConfig} */
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
      {
        protocol: "https",
        hostname: "vmtqbrqycbywyeaocjan.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/overview",
        permanent: false,
      },
    ];
  },
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
  defaultShowCopyCode: true,
  flexsearch: {
    codeblocks: true,
  },
  codeHighlight: true,
});

export default withNextra(nextConfig);
// module.exports = nextConfig;
