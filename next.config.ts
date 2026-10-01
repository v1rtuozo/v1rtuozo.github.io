import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.{glsl, vs, fs, vert, frag}': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
};

export default nextConfig;
