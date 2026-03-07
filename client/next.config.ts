import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    externalDir: true,
  },
  sassOptions: {
    includePaths: ['./src/components', './src/app'],
    prependData: `@import "@/styles/theme/main.scss";`,
  },
  webpack(config) {
    config.resolve.alias["@common"] = path.resolve(__dirname, "..");
    return config;
  },
};

export default nextConfig;
