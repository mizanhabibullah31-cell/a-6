import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-[#ccff00] mb-4">404</h1>
      <h2 className="text-3xl font-extrabold uppercase text-white mb-2">
        Lift Not Found
      </h2>
      <p className="text-zinc-400 mb-8 max-w-md">
        The route you are trying to reach doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#ccff00] text-black font-extrabold px-6 py-3 rounded-xl hover:bg-yellow-400 transition"
      >
        Back to Safety
      </Link>
    </div>
  );
}