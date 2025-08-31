import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // si usás otras, dejalas aquí también:
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
