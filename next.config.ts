import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'family-phys-ed-s3.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
