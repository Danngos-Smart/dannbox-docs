import { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  latex: true,
  defaultShowCopyCode: true,
  search: {
    codeblocks: true
  }
});

const nextConfig: NextConfig = withNextra({
  output: 'standalone',
  reactStrictMode: true,
});

export default nextConfig;
