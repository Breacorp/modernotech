import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@moderno/auth-helpers", "@moderno/config", "@moderno/types"]
};

export default nextConfig;
