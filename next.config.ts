
import type { NextConfig } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.blackcross.net/api";

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.blackcross.net",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "blackcross.net",
        pathname: "/uploads/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
