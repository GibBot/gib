/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@bot/backend", '@bot/model', '@bot/shared'],
}

module.exports = nextConfig
