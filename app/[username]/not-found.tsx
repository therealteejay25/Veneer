import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9F9F9] p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-black/70 mb-8">Profile not found</p>
        <Link
          href="/"
          className="px-8 py-3 rounded-xl bg-black text-white hover:bg-black/90 transition-all font-medium inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
