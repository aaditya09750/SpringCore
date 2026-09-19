/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
      {
        source: '/actuator/:path*',
        destination: 'http://localhost:8080/actuator/:path*',
      },
      {
        source: '/hello',
        destination: 'http://localhost:8080/hello',
      },
    ];
  },
};

export default nextConfig;
