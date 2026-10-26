import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { BRAND, THEME_STORAGE_KEY } from "@/app/lib/constants";
import { siteUrl } from "@/app/lib/siteUrl";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";
import IntroOverlay from "@/app/components/IntroOverlay";

// One voice for everything: Plus Jakarta Sans's rounded geometry suits the
// soft glass theme, and hierarchy comes from weight and size. IBM Plex Mono is
// kept for code samples only.
const sans = Plus_Jakarta_Sans({
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
    description: BRAND.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BRAND.colors.bg },
    { media: "(prefers-color-scheme: dark)", color: BRAND.colors.bgDark },
  ],
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint so a saved dark preference never flashes light first.
// Static string, no user input — safe to inline (the CSP allows inline scripts).
const THEME_SCRIPT = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the theme script below sets data-theme before React hydrates.
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen font-sans">
        <IntroOverlay />
        <Sidebar />
        {/* Content shell — offset by the fixed sidebar on desktop */}
        <div className="flex min-h-screen flex-col lg:pl-[17rem]">
          <main className="flex-1 pb-16 pt-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
