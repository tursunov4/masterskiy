import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.marble-moscow.ru",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
