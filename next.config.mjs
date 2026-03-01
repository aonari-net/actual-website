/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    serverExternalPackages: ["better-sqlite3"],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
