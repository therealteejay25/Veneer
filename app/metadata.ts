import { Metadata } from 'next';

export const landingPageMetadata: Metadata = {
  title: "Veneer - Create Your Beautiful Bio Card & Share Your Links",
  description: "Create stunning, shareable bio cards in minutes. Showcase your Instagram, WhatsApp, Twitter, LinkedIn and more. The modern alternative to Linktree for professionals, creators, and businesses.",
  keywords: [
    "bio card creator",
    "link in bio tool",
    "social media links",
    "linktree alternative",
    "digital business card",
    "personal branding",
    "bio link page",
    "social links hub",
    "contact card maker",
    "portfolio card"
  ],
  openGraph: {
    title: "Veneer - Create Your Beautiful Bio Card",
    description: "Create stunning, shareable bio cards in minutes. Showcase your social links, contact info, and professional presence.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Veneer Bio Card Examples"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Veneer - Create Your Beautiful Bio Card",
    description: "Create stunning, shareable bio cards in minutes. Perfect for creators, professionals, and businesses.",
    images: ["/image.png"]
  }
};
