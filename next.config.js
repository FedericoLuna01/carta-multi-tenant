/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
