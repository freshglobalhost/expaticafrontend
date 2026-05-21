/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "grandwellsbank.com",
        pathname: "/dash2/**",
      },
    ],
  },
};

export default nextConfig;
