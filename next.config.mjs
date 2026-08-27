/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Esto le dice a Vercel que ignore las advertencias de código
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Esto le dice que ignore el uso de <any>
    ignoreBuildErrors: true,
  },
};

export default nextConfig;