import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cryptologos.cc",
      },
      {
        protocol: "https",
        hostname: "assets.trustwalletapp.com",
      },
    ],
  },
};

export default nextConfig;
