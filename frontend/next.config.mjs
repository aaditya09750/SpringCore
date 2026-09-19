const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: '/actuator/:path*',
        destination: `${BACKEND_URL}/actuator/:path*`,
      },
      {
        source: '/hello',
        destination: `${BACKEND_URL}/hello`,
      },
    ];
  },
};

export default nextConfig;
