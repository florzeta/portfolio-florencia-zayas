import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingRoot: path.resolve(__dirname),
  webpack: (config, { dev }) => {
    if (dev) {
      // Nota: en dev usamos cache en memoria para evitar ENOSPC en discos sincronizados (p.ej. OneDrive).
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
