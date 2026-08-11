import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pizza_house",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;