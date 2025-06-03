import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Any request starting with /api/ will be forwarded to C# backend
        destination: "http://localhost:5119/api/:path*",
      },
    ];
  },
};

export default nextConfig;
