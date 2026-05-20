import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap"
});

/**
 * Public site URL for canonical / OpenGraph tags.
 *
 * Override per-deployment by setting `NEXT_PUBLIC_SITE_URL` in the Cloudflare
 * Pages project (Settings → Environment variables) — e.g.
 * `https://timmie.example.com`. The fallback keeps local dev working.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

const title = "Timmie · A life in the North Pacific";
const description =
  "Follow the full 22-year migration of Timmie the humpback whale, from a Maui calf to an old singer in Monterey Bay — an interactive, premium visualisation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Timmie"
  },
  description,
  applicationName: "Timmie",
  generator: "Next.js",
  keywords: [
    "humpback whale",
    "migration",
    "data visualisation",
    "interactive map",
    "marine biology",
    "storytelling",
    "Megaptera novaeangliae"
  ],
  authors: [{ name: "Timmie Project" }],
  creator: "Timmie Project",
  publisher: "Timmie Project",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Timmie",
    title,
    description,
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#05080f" },
    { media: "(prefers-color-scheme: light)", color: "#05080f" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
