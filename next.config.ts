import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow GSAP's use of eval for complex animations
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  // Disable deprecated warnings for certain features
  reactStrictMode: true,
  experimental: {
    // Disable deprecated features
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react"],
  },
};

export default nextConfig;
