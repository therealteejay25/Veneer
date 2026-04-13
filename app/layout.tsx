import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://veneer01.vercel.app'),
  title: {
    default: "Veneer - Create Your Beautiful Bio Card",
    template: "%s | Veneer"
  },
  description: "Create stunning, shareable bio cards in minutes. Showcase your social links, contact info, and professional presence with Veneer - the modern alternative to Linktree.",
  keywords: [
    "bio card",
    "link in bio",
    "social links",
    "linktree alternative",
    "bio link",
    "digital business card",
    "social media links",
    "personal branding",
    "portfolio card",
    "contact card"
  ],
  authors: [{ name: "tayo.", url: "https://x.com/_that_creative_" }],
  creator: "tayo.",
  publisher: "Veneer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Veneer",
    title: "Veneer - Create Your Beautiful Bio Card",
    description: "Create stunning, shareable bio cards in minutes. Showcase your social links, contact info, and professional presence with Veneer.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Veneer Bio Card Preview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Veneer - Create Your Beautiful Bio Card",
    description: "Create stunning, shareable bio cards in minutes. Showcase your social links, contact info, and professional presence.",
    creator: "@_that_creative_",
    images: ["/banner.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
