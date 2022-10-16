/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ["@svgr/webpack"],
  //   });
  //   return config;
  // },
  output: "standalone",
  images: {
    domains: [
      'localhost',
      'apitobeit.it.kmitl.ac.th'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  rewrites: [
    {
      
    }
  ]
};

module.exports = nextConfig;
