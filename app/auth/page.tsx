"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import Toast from "@/components/Toast";

export const dynamic = 'force-dynamic';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      : `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/auth/callback`;

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
          },
        });
        if (error) throw error;
        setToast({ message: "Check your email for the confirmation link!", type: "success" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      : `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/auth/callback`;
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
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
      <div className="flex flex-col h-screen bg-[#F9F9F9] p-4">
        <h1 className="text-2xl  text-black font-extrabold">Veneer.</h1>
        <div className="w-full items-center h-full justify-center flex">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/4">
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-black/50 text-sm">
              {isSignUp
                ? "Sign up to create your bio card"
                : "Sign in to manage your bio card"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-full bg-red-50 border border-red-100">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex items-center cursor-pointer justify-center gap-3 px-4 py-3 rounded-full bg-black text-white hover:bg-black/90 transition-all font-medium mb-6 disabled:opacity-50"
          >
            <HugeiconsIcon icon={GoogleIcon} size={20} color="white" strokeWidth={1.8} />
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-black/50">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-black/70">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2.5 rounded-full bg-black/3 border border-black/5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-black/70">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="px-4 py-2.5 rounded-full bg-black/3 border border-black/5 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2.5 cursor-pointer rounded-full bg-black/5 border border-black/10 text-black hover:bg-black/10 transition-all font-medium disabled:opacity-50 mt-2"
            >
              {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-black/70 cursor-pointer hover:text-black transition-colors"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
        </div>
    </div>
    </>
  );
}
