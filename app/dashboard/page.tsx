"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01FreeIcons,
  Location01FreeIcons,
  PhoneCall,
  Share08FreeIcons,
  Logout03Icon,
  Settings02Icon,
  InstagramIcon,
  WhatsappIcon,
  NewTwitterIcon,
  Linkedin02Icon,
  Upload04Icon,
  Download01Icon,
} from "@hugeicons/core-free-icons";
import Toast from "@/components/Toast";

export const dynamic = 'force-dynamic';

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

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    phone: "",
    bio: "",
    coverImage: "/image.png",
    profileImage: "/pfp.png",
    instagram: "",
    whatsapp: "",
    twitter: "",
    linkedin: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/auth");
        return;
      }

      setUser(user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        setFormData({
          name: profileData.name || "",
          role: profileData.role || "",
          location: profileData.location || "",
          phone: profileData.phone || "",
          bio: profileData.bio || "",
          coverImage: profileData.cover_image || "/image.png",
          profileImage: profileData.profile_image || "/pfp.png",
          instagram: profileData.instagram || "",
          whatsapp: profileData.whatsapp || "",
          twitter: profileData.twitter || "",
          linkedin: profileData.linkedin || "",
        });
      } else {
        router.push("/onboarding");
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          name: formData.name,
          role: formData.role,
          location: formData.location,
          phone: formData.phone,
          bio: formData.bio,
          cover_image: formData.coverImage,
          profile_image: formData.profileImage,
          instagram: formData.instagram,
          whatsapp: formData.whatsapp,
          twitter: formData.twitter,
          linkedin: formData.linkedin,
        })
        .eq("id", user.id);

      if (error) throw error;
      setToast({ message: "Profile updated successfully!", type: "success" });
    } catch (error: any) {
      setToast({ message: "Error updating profile: " + error.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file: File, type: 'cover' | 'profile') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${type}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      setToast({ message: "Error uploading image: " + error.message, type: "error" });
      return null;
    }
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setToast({ message: "Please upload an image file", type: "error" });
      return;
    }

    setUploadingCover(true);
    const url = await uploadImage(file, 'cover');
    if (url) {
      setFormData({ ...formData, coverImage: url });
      
      // Save to database immediately
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ cover_image: url })
          .eq("id", user.id);
        
        if (error) throw error;
        setToast({ message: "Cover image uploaded!", type: "success" });
      } catch (error: any) {
        setToast({ message: "Error saving cover image: " + error.message, type: "error" });
      }
    }
    setUploadingCover(false);
  };

  const handleProfileImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setToast({ message: "Please upload an image file", type: "error" });
      return;
    }

    setUploadingProfile(true);
    const url = await uploadImage(file, 'profile');
    if (url) {
      setFormData({ ...formData, profileImage: url });
      
      // Save to database immediately
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ profile_image: url })
          .eq("id", user.id);
        
        if (error) throw error;
        setToast({ message: "Profile image uploaded!", type: "success" });
      } catch (error: any) {
        setToast({ message: "Error saving profile image: " + error.message, type: "error" });
      }
    }
    setUploadingProfile(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
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
  };

  const copyProfileLink = () => {
    if (typeof window === 'undefined') return;
    const link = `${window.location.origin}/${profile?.username}`;
    navigator.clipboard.writeText(link);
    setToast({ message: "Profile link copied!", type: "success" });
  };

  const exportCardAsPNG = async () => {
    if (!cardRef.current) return;
    
    setExporting(true);
    try {
      // Dynamic import to avoid SSR issues
      const domtoimage = (await import('dom-to-image-more')).default;
      
      const dataUrl = await domtoimage.toPng(cardRef.current, {
        quality: 1,
        bgcolor: '#F9F9F9',
        width: cardRef.current.offsetWidth * 2,
        height: cardRef.current.offsetHeight * 2
      });
      
      const link = document.createElement('a');
      link.download = `${profile?.username || 'bio-card'}.png`;
      link.href = dataUrl;
      link.click();
      
      setToast({ message: "Card exported successfully!", type: "success" });
    } catch (error) {
      console.error('Export failed:', error);
      setToast({ message: "Failed to export card", type: "error" });
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9F9F9]">
        <p className="text-black/50">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex flex-col lg:flex-row bg-[#F9F9F9] min-h-screen lg:h-screen overflow-x-hidden">
      <div className="w-full lg:h-screen lg:w-1/2 bg-white flex justify-center overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-xl flex flex-col gap-6 p-4 md:p-6 lg:p-12 py-6 md:py-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl md:text-3xl font-bold">Edit Profile</h2>
              <p className="text-black/50 text-xs md:text-sm">@{profile?.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 md:p-2.5 rounded-full bg-black/5 hover:bg-black/10 transition-all"
            >
              <HugeiconsIcon icon={Logout03Icon} size={18} color="currentColor" strokeWidth={1.8} className="md:w-5 md:h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-black/70">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2.5 rounded-full bg-black/3 border border-black/5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="role" className="text-sm font-medium text-black/70">
                Role
              </label>
              <input
                id="role"
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="px-4 py-2.5 rounded-full bg-black/3 border border-black/5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                placeholder="Your role"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="location" className="text-sm font-medium text-black/70">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="px-4 py-2.5 rounded-full bg-black/3 border border-black/5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                  placeholder="City, Country"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-medium text-black/70">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-4 py-2.5 rounded-full bg-black/3 border border-black/5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                  placeholder="+234..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="bio" className="text-sm font-medium text-black/70">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="px-4 py-2.5 rounded-xl bg-black/3 border border-black/5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-black/70">Images</label>
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="cover-upload" className="text-xs text-black/50">Cover Image</label>
                {formData.coverImage && formData.coverImage !== "/image.png" ? (
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-black/3">
                    <Image
                      src={formData.coverImage}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                    >
                      <div className="text-white text-sm font-medium flex items-center gap-2">
                        <HugeiconsIcon icon={Upload04Icon} size={16} color="white" strokeWidth={1.8} />
                        Change Image
                      </div>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="cover-upload"
                    className="w-full h-32 rounded-full bg-black/3 border-2 border-dashed border-black/10 hover:border-black/20 hover:bg-black/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <HugeiconsIcon icon={Upload04Icon} size={24} color="currentColor" strokeWidth={1.8} />
                    <span className="text-sm text-black/50">{uploadingCover ? "Uploading..." : "Upload Cover Image"}</span>
                  </label>
                )}
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="hidden"
                  disabled={uploadingCover}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="profile-upload" className="text-xs text-black/50">Profile Image</label>
                {formData.profileImage && formData.profileImage !== "/pfp.png" ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-black/3 mx-auto">
                    <Image
                      src={formData.profileImage}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center"
                    >
                      <div className="text-white text-sm font-medium flex items-center gap-2">
                        <HugeiconsIcon icon={Upload04Icon} size={16} color="white" strokeWidth={1.8} />
                        Change
                      </div>
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="profile-upload"
                    className="w-32 h-32 mx-auto rounded-full bg-black/3 border-2 border-dashed border-black/10 hover:border-black/20 hover:bg-black/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <HugeiconsIcon icon={Upload04Icon} size={24} color="currentColor" strokeWidth={1.8} />
                    <span className="text-xs text-black/50">{uploadingProfile ? "Uploading..." : "Upload"}</span>
                  </label>
                )}
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                  disabled={uploadingProfile}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-black/70">Social Links</label>
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="instagram" className="text-xs text-black/50">Instagram</label>
                <input
                  id="instagram"
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="px-3 py-2 rounded-full bg-black/3 border border-black/5 text-black text-sm placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                  placeholder="@username"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="whatsapp" className="text-xs text-black/50">WhatsApp</label>
                <input
                  id="whatsapp"
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="px-3 py-2 rounded-full bg-black/3 border border-black/5 text-black text-sm placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                  placeholder="+234..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="twitter" className="text-xs text-black/50">X (Twitter)</label>
                <input
                  id="twitter"
                  type="text"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="px-3 py-2 rounded-full bg-black/3 border border-black/5 text-black text-sm placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                  placeholder="@username"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="linkedin" className="text-xs text-black/50">LinkedIn</label>
                <input
                  id="linkedin"
                  type="text"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="px-3 py-2 rounded-full bg-black/3 border border-black/5 text-black text-sm placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                  placeholder="username"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full mb-6 lg:mb-10 px-4 py-2.5 rounded-full bg-black text-white hover:bg-black/90 transition-all font-medium disabled:opacity-50 mt-2"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:h-screen lg:w-1/2 flex justify-center p-4 md:p-6 lg:p-8 bg-[#F9F9F9] overflow-y-auto lg:overflow-y-auto custom-scrollbar">
        <div ref={cardRef} className="pb-5 w-full max-w-md lg:w-120 rounded-4xl p-2.5 shadow-2xl shadow-black/4 overflow-hidden bg-white self-start my-4 md:my-8">
          <div className="relative mb-10">
            {formData.coverImage && formData.coverImage !== "/image.png" ? (
              <div className="relative w-full aspect-[3/1] rounded-3xl overflow-hidden bg-black/3">
                <Image
                  src={formData.coverImage}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-[3/1] rounded-3xl bg-black/3 flex flex-col items-center justify-center gap-2">
                <HugeiconsIcon icon={Upload04Icon} size={32} color="currentColor" strokeWidth={1.5} className="text-black/20" />
                <p className="text-black/30 text-sm">Upload cover image</p>
              </div>
            )}
            {formData.profileImage && formData.profileImage !== "/pfp.png" ? (
              <Image
                src={formData.profileImage}
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
                  <h1 className="font-bold text-lg sm:text-xl">{formData.name || "Your Name"}</h1>
                  <p className="text-black/50 text-xs sm:text-sm">@{profile?.username}</p>
                  <p className="text-black/50 text-sm font-medium mt-2">{formData.role || "Your Role"}</p>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 sm:items-end flex-wrap">
                  {formData.location && (
                    <div className="bg-black/3 w-fit flex gap-2 items-center text-sm font-medium pr-3 rounded-full p-1">
                      <div className="bg-black/3 p-1.75 rounded-full">
                        <HugeiconsIcon
                          icon={Location01FreeIcons}
                          size={17}
                          color="currentColor"
                          strokeWidth={1.8}
                        />
                      </div>
                      {formData.location}
                    </div>
                  )}
                  {formData.phone && (
                    <div className="bg-black/3 w-fit flex gap-2 items-center text-sm font-medium pr-3 rounded-full p-1">
                      <div className="bg-black/3 p-1.75 rounded-full">
                        <HugeiconsIcon icon={PhoneCall} size={17} color="currentColor" strokeWidth={1.8} />
                      </div>
                      {formData.phone}
                    </div>
                  )}
                </div>
              </div>
              {formData.bio && (
                <div className="bg-black/3 rounded-2xl w-full p-3">
                  <p className="text-black/75 text-sm font-medium">{formData.bio}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col mt-3 gap-2">
              {formData.instagram && (
                <div className="bg-black/3 items-center hover:scale-102 transition-all duration-300 p-1 cursor-pointer rounded-full w-full flex justify-between">
                  <div className="bg-black/3 p-1.5 rounded-full">
                    <HugeiconsIcon icon={InstagramIcon} size={17} color="currentColor" strokeWidth={1.8} />
                  </div>
                  <p className="text-sm font-medium">{formData.instagram}</p>
                  <button
                    onClick={() => copyToClipboard(formData.instagram, 'instagram')}
                    className="bg-black p-1.5 rounded-full hover:bg-black/90 transition-all"
                  >
                    <HugeiconsIcon icon={Copy01FreeIcons} size={17} color="white" strokeWidth={1.8} />
                  </button>
                </div>
              )}
              {formData.whatsapp && (
                <div className="bg-black/3 items-center hover:scale-102 transition-all duration-300 p-1 cursor-pointer rounded-full w-full flex justify-between">
                  <div className="bg-black/3 p-1.5 rounded-full">
                    <HugeiconsIcon icon={WhatsappIcon} size={17} color="currentColor" strokeWidth={1.8} />
                  </div>
                  <p className="text-sm font-medium">{formData.whatsapp}</p>
                  <button
                    onClick={() => copyToClipboard(formData.whatsapp, 'whatsapp')}
                    className="bg-black p-1.5 rounded-full hover:bg-black/90 transition-all"
                  >
                    <HugeiconsIcon icon={Copy01FreeIcons} size={17} color="white" strokeWidth={1.8} />
                  </button>
                </div>
              )}
              {formData.twitter && (
                <div className="bg-black/3 items-center hover:scale-102 transition-all duration-300 p-1 cursor-pointer rounded-full w-full flex justify-between">
                  <div className="bg-black/3 p-1.5 rounded-full">
                    <HugeiconsIcon icon={NewTwitterIcon} size={17} color="currentColor" strokeWidth={1.8} />
                  </div>
                  <p className="text-sm font-medium">{formData.twitter}</p>
                  <button
                    onClick={() => copyToClipboard(formData.twitter, 'twitter')}
                    className="bg-black p-1.5 rounded-full hover:bg-black/90 transition-all"
                  >
                    <HugeiconsIcon icon={Copy01FreeIcons} size={17} color="white" strokeWidth={1.8} />
                  </button>
                </div>
              )}
              {formData.linkedin && (
                <div className="bg-black/3 items-center hover:scale-102 transition-all duration-300 p-1 cursor-pointer rounded-full w-full flex justify-between">
                  <div className="bg-black/3 p-1.5 rounded-full">
                    <HugeiconsIcon icon={Linkedin02Icon} size={17} color="currentColor" strokeWidth={1.8} />
                  </div>
                  <p className="text-sm font-medium">{formData.linkedin}</p>
                  <button
                    onClick={() => copyToClipboard(formData.linkedin, 'linkedin')}
                    className="bg-black p-1.5 rounded-full hover:bg-black/90 transition-all"
                  >
                    <HugeiconsIcon icon={Copy01FreeIcons} size={17} color="white" strokeWidth={1.8} />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                {/* <button
                  onClick={exportCardAsPNG}
                  disabled={exporting}
                  className="bg-black/5 border border-black/10 flex-1 items-center hover:scale-102 transition-all duration-300 p-2 cursor-pointer rounded-full flex justify-center disabled:opacity-50"
                >
                  <p className="text-black flex items-center gap-2 font-medium text-sm">
                    <HugeiconsIcon icon={Download01Icon} size={17} color="currentColor" strokeWidth={1.8} />
                    {exporting ? 'Exporting...' : 'Export PNG'}
                  </p>
                </button> */}
                <button
                  onClick={copyProfileLink}
                  className="bg-black flex-1 items-center hover:scale-102 transition-all duration-300 p-2 cursor-pointer rounded-full flex justify-center"
                >
                  <p className="text-white flex items-center gap-2 font-medium text-sm">
                    <HugeiconsIcon icon={Share08FreeIcons} size={17} color="white" strokeWidth={1.8} />
                    Share Bio
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
