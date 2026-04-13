import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9F9F9] p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-4">Veneer</h1>
        <p className="text-xl text-black/70 mb-8">
          Create your beautiful bio card and share it with the world
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth"
            className="px-8 py-3 rounded-xl bg-black text-white hover:bg-black/90 transition-all font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/auth"
            className="px-8 py-3 rounded-xl bg-white border border-black/10 text-black hover:bg-black/5 transition-all font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
