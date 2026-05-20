/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a fully-static `./out/` directory that any CDN — Cloudflare Pages
  // included — can serve directly. The app has no SSR, no API routes, no
  // server actions, so this is the cheapest and fastest deploy target.
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // Required for `output: 'export'` because the Next image optimizer needs
    // a server. We don't currently use <Image/>, but this keeps the option
    // open without breaking the build.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "tile.openstreetmap.org" },
      { protocol: "https", hostname: "*.basemaps.cartocdn.com" }
    ]
  }
};

export default nextConfig;
