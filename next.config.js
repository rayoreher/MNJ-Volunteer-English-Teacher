/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/MNJ-Volunteer-English-Teacher",
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable image optimization for static exports
  },
};

module.exports = nextConfig;
