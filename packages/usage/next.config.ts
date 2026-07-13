import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    'markdown-latex-renderer',
  ],
  productionBrowserSourceMaps: true,
};

export default nextConfig;
