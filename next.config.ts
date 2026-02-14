import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/pages/scorpiblog.html',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
