import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    includePaths: ['./src/components', './src/app'],
    prependData: `@import "@/styles/theme/main.scss";`,
  },
};

export default nextConfig;
