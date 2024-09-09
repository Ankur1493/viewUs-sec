/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui.aceternity.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
