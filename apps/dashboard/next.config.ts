import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@moderno/auth-helpers", "@moderno/config", "@moderno/types", "@moderno/billing-helpers", "@moderno/dashboard-helpers"]
};

export default nextConfig;
