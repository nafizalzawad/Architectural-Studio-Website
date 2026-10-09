/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remote Image Optimization for Vercel Edge Global Image Optimization Network
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      // Production cPanel API & media subdomains (e.g. api.clientdomain.com or any client domain)
      {
        protocol: 'https',
        hostname: '**',
      },
      // Local development PHP servers
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
};

export default nextConfig;
