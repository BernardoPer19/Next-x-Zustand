import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.dummyjson.com'], // 👈 Agrega este dominio
  },
};

export default nextConfig;
