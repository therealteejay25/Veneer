"use client";

import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01FreeIcons,
  Location01FreeIcons,
  PhoneCall,
  InstagramIcon,
  WhatsappIcon,
  NewTwitterIcon,
  Linkedin02Icon,
  Upload04Icon,
} from "@hugeicons/core-free-icons";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import Head from "next/head";

interface Profile {
  id: string;
  username: string;
  name: string;
  role: string;
  location: string;
  phone: string;
  bio: string;
  cover_image: string;
  profile_image: string;
  instagram: string;
  whatsapp: string;
  twitter: string;
  linkedin: string;
}

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: PageProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { username } = await params;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    if (!data) {
      notFound();
    }

    setProfile(data);
    setLoading(false);
    
    // Update document title and meta tags dynamically
    if (typeof window !== 'undefined' && data) {
      document.title = `${data.name} (@${data.username}) - Veneer Bio Card`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 
          `${data.bio || `Connect with ${data.name}`} - View ${data.name}'s bio card on Veneer.`
        );
      }
      
      // Update OG tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${data.name} (@${data.username}) - Veneer Bio Card`);
      }
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', 
          `${data.bio || `Connect with ${data.name}`} - View ${data.name}'s bio card on Veneer.`
        );
      }
      
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && data.profile_image) {
        ogImage.setAttribute('content', data.profile_image);
      }
    }
  };

  const copyToClipboard = (text: string, platform: 'instagram' | 'whatsapp' | 'twitter' | 'linkedin') => {
    let url = '';
    
    switch(platform) {
      case 'instagram':
        url = `https://instagram.com/${text.replace('@', '')}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/${text.replace(/[^0-9]/g, '')}`;
        break;
      case 'twitter':
        url = `https://x.com/${text.replace('@', '')}`;
        break;
      case 'linkedin':
        url = `https://linkedin.com/in/${text}`;
        break;
    }
    
    navigator.clipboard.writeText(url);
    setToast({ message: "Link copied to clipboard!", type: "success" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9F9F9]">
        <p className="text-black/50">Loading...</p>
      </div>
    );
  }

  if (!profile) {
    notFound();
  }

  const socialLinks = [
    {
      platform: "Instagram" as const,
      handle: profile.instagram,
      icon: InstagramIcon,
    },
    {
      platform: "WhatsApp" as const,
      handle: profile.whatsapp,
      icon: WhatsappIcon,
    },
    {
      platform: "X" as const,
      handle: profile.twitter,
      icon: NewTwitterIcon,
    },
    {
      platform: "LinkedIn" as const,
      handle: profile.linkedin,
      icon: Linkedin02Icon,
    },
  ].filter((link) => link.handle);

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* JSON-LD Structured Data for Rich Search Results */}
      {profile && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: profile.name,
                alternateName: `@${profile.username}`,
                description: profile.bio,
                jobTitle: profile.role,
                address: profile.location ? {
                  "@type": "PostalAddress",
                  addressLocality: profile.location
                } : undefined,
                telephone: profile.phone,
                image: profile.profile_image || profile.cover_image,
                url: typeof window !== 'undefined' ? window.location.href : '',
                sameAs: [
                  profile.instagram ? `https://instagram.com/${profile.instagram.replace('@', '')}` : '',
                  profile.twitter ? `https://x.com/${profile.twitter.replace('@', '')}` : '',
                  profile.linkedin ? `https://linkedin.com/in/${profile.linkedin}` : '',
                ].filter(Boolean)
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                mainEntity: {
                  "@type": "Person",
                  name: profile.name,
                  identifier: profile.username,
                  description: profile.bio,
                  image: profile.profile_image || profile.cover_image,
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: profile.phone,
                    contactType: "Personal"
                  }
                }
              })
            }}
          />
        </>
      )}
      
      <div className="flex min-h-screen items-center justify-center bg-[#F9F9F9] p-4 lg:p-8">
        <div className="pb-5 w-full max-w-md lg:w-120 rounded-4xl p-2.5 shadow-2xl shadow-black/4 overflow-hidden bg-white">
          <div className="relative mb-10">
            {profile.cover_image ? (
              <Image
                src={profile.cover_image}
                alt="Cover"
                width={1000}
                height={1000}
                className="w-full h-auto rounded-3xl"
              />
            ) : (
              <div className="w-full h-48 rounded-3xl bg-black/3 flex flex-col items-center justify-center gap-2">
                <HugeiconsIcon icon={Upload04Icon} size={32} color="currentColor" strokeWidth={1.5} className="text-black/20" />
                <p className="text-black/30 text-sm">No cover image</p>
              </div>
            )}
            {profile.profile_image ? (
              <Image
                src={profile.profile_image}
                alt="Profile"
                width={1000}
                height={1000}
                className="w-24 border-6 border-white absolute left-3 -bottom-10 h-auto rounded-full"
              />
            ) : (
              <div className="w-24 h-24 border-6 border-white absolute left-3 -bottom-10 rounded-full bg-black/3 flex flex-col items-center justify-center">
                <HugeiconsIcon icon={Upload04Icon} size={20} color="currentColor" strokeWidth={1.5} className="text-black/20" />
              </div>
            )}
          </div>
          <div className="flex flex-col px-3">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <div className="flex flex-col">
                  <h1 className="font-bold text-lg sm:text-xl">{profile.name || "User"}</h1>
                  <p className="text-black/50 text-xs sm:text-sm">@{profile.username}</p>
                  {profile.role && (
                    <p className="text-black/50 font-medium mt-2 text-sm">{profile.role}</p>
                  )}
                </div>
                <div className="flex flex-row sm:flex-col gap-2 sm:items-end flex-wrap">
                  {profile.location && (
                    <div className="bg-black/3 w-fit flex gap-2 items-center text-sm font-medium pr-3 rounded-full p-1">
                      <div className="bg-black/3 p-1.75 rounded-full">
                        <HugeiconsIcon
                          icon={Location01FreeIcons}
                          size={17}
                          color="currentColor"
                          strokeWidth={1.8}
                        />
                      </div>
                      {profile.location}
                    </div>
                  )}
                  {profile.phone && (
                    <div className="bg-black/3 w-fit flex gap-2 items-center text-sm font-medium pr-3 rounded-full p-1">
                      <div className="bg-black/3 p-1.75 rounded-full">
                        <HugeiconsIcon icon={PhoneCall} size={17} color="currentColor" strokeWidth={1.8} />
                      </div>
                      {profile.phone}
                    </div>
                  )}
                </div>
              </div>
              {profile.bio && (
                <div className="bg-black/3 rounded-2xl w-full p-3">
                  <p className="text-black/75 text-sm font-medium">{profile.bio}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col mt-3 gap-2">
              {socialLinks.map((social, index) => (
                <div
                  key={index}
                  className="bg-black/3 items-center hover:scale-102 transition-all duration-300 p-1 cursor-pointer rounded-full w-full flex justify-between"
                >
                  <div className="bg-black/3 p-1.5 rounded-full">
                    <HugeiconsIcon icon={social.icon} size={17} color="currentColor" strokeWidth={1.8} />
                  </div>
                  <p className="text-sm font-medium">{social.handle}</p>
                  <button
                    onClick={() => copyToClipboard(social.handle || "", social.platform.toLowerCase() as any)}
                    className="bg-black p-1.5 rounded-full hover:bg-black/90 transition-all"
                  >
                    <HugeiconsIcon icon={Copy01FreeIcons} size={17} color="white" strokeWidth={1.8} />
                  </button>
                </div>
              ))}
              
              <div className="mt-2 pt-2 border-t border-black/5">
                <a
                  href="/auth"
                  className="bg-gradient-to-r from-black to-black/80 items-center hover:scale-102 transition-all duration-300 p-3 cursor-pointer rounded-full w-full flex justify-center"
                >
                  <p className="text-white font-medium">
                    Create Your Own Bio Card
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
