import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@moderno/theme",
    "@moderno/ui",
    "@moderno/config",
    "@moderno/types",
    "@moderno/env",
    "@moderno/logger",
    "@moderno/monitoring",
    "@moderno/feature-flags",
    "@moderno/product-registry",
    "@moderno/api-client",
    "@moderno/security"
  ]
};

export default nextConfig;
