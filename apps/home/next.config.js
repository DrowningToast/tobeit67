/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // output: "standalone",
  images: {
    domains: [
      "localhost",
      "apitobeit.it.kmitl.ac.th",
      "cmstobeit.polalab.space",
      "apitobeit.polalab.space",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: [{}],
};

module.exports = nextConfig;
