"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

export default function Onboarding() {
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/auth");
      return;
    }
    setUser(user);
  };

  const checkUsername = async (value: string) => {
    if (value.length < 3) {
      setAvailable(null);
      return;
    }

    setChecking(true);
    try {
      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", value)
        .single();

      setAvailable(!data);
    } catch (error) {
      setAvailable(true);
    } finally {
      setChecking(false);
    }
  };

  const handleUsernameChange = (value: string) => {
    const cleaned = value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(cleaned);
    if (cleaned.length >= 3) {
      checkUsername(cleaned);
    } else {
      setAvailable(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!available || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("profiles").insert({
        id: user.id,
        username,
        name: "",
        role: "",
        location: "",
        phone: "",
        bio: "",
        cover_image: "",
        profile_image: "",
        instagram: "",
        whatsapp: "",
        twitter: "",
        linkedin: "",
      });

      if (error) throw error;
      router.push("/dashboard");
    } catch (error: any) {
      setToast({ message: "Error creating profile: " + error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex min-h-screen items-center justify-center bg-[#F9F9F9] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">Choose Your Username</h1>
            <p className="text-black/50 text-sm">
              This will be your unique link. Choose wisely!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-sm font-medium text-black/70">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/50">
                  @
                </span>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  required
                  minLength={3}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black/3 border border-black/5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                  placeholder="username"
                />
              </div>
              {checking && (
                <p className="text-sm text-black/50">Checking availability...</p>
              )}
              {available === true && (
                <p className="text-sm text-green-600">✓ Username is available!</p>
              )}
              {available === false && (
                <p className="text-sm text-red-600">✗ Username is taken</p>
              )}
              <p className="text-xs text-black/50">
                Your profile will be available at: {window.location.origin}/{username || "username"}
              </p>
            </div>

            <button
              type="submit"
              disabled={!available || loading}
              className="w-full px-4 py-2.5 rounded-xl bg-black text-white hover:bg-black/90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Creating..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
