import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/app/lib/constants";
import { siteUrl } from "@/app/lib/siteUrl";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";

// Two voices, not three. Inter carries headwords, definitions, and chrome —
// hierarchy comes from weight and tracking rather than a second family. IBM Plex
// Mono is the contrast voice, reserved for metadata and annotation.
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  // Without this, every OpenGraph/canonical URL resolves relative and social
  // cards break on share.
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${BRAND.name}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "A public reference for AI, automation, and the tools that power them — a searchable tech dictionary, acronym decoder, tools comparison, and practical guides for Claude, GoHighLevel, and automation platforms.",
  keywords: [
    "AI",
    "automation",
    "Claude",
    "GoHighLevel",
    "n8n",
    "learning hub",
    "dev tools",
  ],
  authors: [{ name: BRAND.owner }],
  openGraph: {
    title: BRAND.name,
    description: BRAND.statement,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: BRAND.colors.bg,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        <Sidebar />
        {/* Content shell — offset by the fixed sidebar on desktop */}
        <div className="flex min-h-screen flex-col lg:pl-64">
          <main className="flex-1 pb-16 pt-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
