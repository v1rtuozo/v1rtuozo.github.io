console.log("LOADING NEXT CONFIG");

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    rules: {
      '*.glsl': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
};

export default nextConfig;