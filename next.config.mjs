/** @type {import('next').NextConfig} */

export async function headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: 'upgrade-insecure-requests',
        },
      ],
    },
  ];
}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ['error', 'warn'],
  //   },
  // },
  images: {
    imageSizes: [300, 700, 400],
    deviceSizes: [640, 768, 1024],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_HOST_NAME,
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
