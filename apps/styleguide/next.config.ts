import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@moderno/theme", "@moderno/ui", "@moderno/config", "@moderno/types"]
};

export default nextConfig;
