"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/app/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="bg-[#0b0c0e] border-b border-zinc-800/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-black tracking-wider text-white uppercase font-sans">
            FITLOG
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === "/"
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-medium transition-colors ${
              pathname === "/my-plan"
                ? "text-white font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Side: Badges */}
        <div className="flex items-center gap-3">
          {/* Plan Badge (Filled) */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-opacity"
          >
            <span>Plan</span>
            <span className="bg-[#d0ff00] text-black w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
              {plan.length}
            </span>
          </Link>

          {/* Saved Badge (Outlined) */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-opacity ml-2"
          >
            <span>Saved</span>
            <span className="border border-zinc-700 bg-zinc-900/60 text-zinc-300 w-6 h-6 rounded-full flex items-center justify-center font-medium text-xs">
              {saved.length}
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}