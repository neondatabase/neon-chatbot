/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "assets.aceternity.com" }],
  },
};

export default nextConfig;
