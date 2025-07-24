/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "rueynivjoyctbowy.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "7mcoofq3ojzokjqj.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
