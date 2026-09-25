"use client";

import Image from "next/image";

export default function Hero() {
  const scrollToLibrary = () => {
    const el = document.getElementById("library");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-[#121316] border border-zinc-800/80 rounded-2xl p-8 sm:p-12 lg:p-14 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Content */}
        <div className="max-w-xl z-10">
          <span className="text-[#d0ff00] text-xs font-bold tracking-widest uppercase mb-4 block">
            WORKOUT LIBRARY
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05] mb-4 font-sans">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button
            onClick={scrollToLibrary}
            className="bg-[#d0ff00] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 rounded-lg hover:bg-[#bce600] transition-colors shadow-sm inline-flex items-center justify-center"
          >
            BROWSE WORKOUTS
          </button>
        </div>

        {/* Right Banner Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
          <div className="relative w-full max-w-95 h-70 sm:h-85">
            <Image
              src="/banner.png"
              alt="Gym Workout Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}