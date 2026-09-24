import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      // Add this for production if your backend serves images over HTTPS
      {
        protocol: "https",
        hostname: "api.sardarit.cloud",
        pathname: "/uploads/**",
      },
    ],
  },
  // FIX: Add rewrites to proxy API requests
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.sardarit.cloud/api/:path*",
      },
    ];
  },
};

export default nextConfig;