"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0b0c0e] border-t border-zinc-800/60 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-black tracking-wider text-white uppercase font-sans">
            FITLOG
          </span>
        </Link>

        {/* Right Side: Copyright Text */}
        <p className="text-zinc-400 text-xs sm:text-sm font-normal">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}