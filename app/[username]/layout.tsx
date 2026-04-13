import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    return {
      title: "Profile Not Found | Veneer",
      description: "This profile does not exist on Veneer.",
    };
  }

  const title = `${profile.name} (@${profile.username}) | Veneer Bio Card`;
  const description = profile.bio 
    ? `${profile.bio} - Connect with ${profile.name} on Veneer. ${profile.role ? `${profile.role} based in ${profile.location || 'the world'}` : ''}`
    : `Connect with ${profile.name} (@${profile.username}) on Veneer. View their bio card and social links.`;
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://veneer.vercel.app';
  const profileUrl = `${siteUrl}/${username}`;
  const imageUrl = profile.profile_image || profile.cover_image || `${siteUrl}/image.png`;

  return {
    title,
    description,
    keywords: [
      profile.name,
      `@${profile.username}`,
      profile.role,
      "bio card",
      "contact card",
      "social links",
      "veneer",
      profile.location,
    ].filter(Boolean),
    authors: [{ name: profile.name }],
    creator: profile.name,
    openGraph: {
      type: "profile",
      url: profileUrl,
      title,
      description,
      siteName: "Veneer",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${profile.name}'s Bio Card`,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: profile.twitter ? `@${profile.twitter.replace('@', '')}` : undefined,
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
    alternates: {
      canonical: profileUrl,
    },
  };
}

export default function UsernameLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
