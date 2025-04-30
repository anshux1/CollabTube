import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "todofy.blob.core.windows.net" }],
  },
}

export default nextConfig
