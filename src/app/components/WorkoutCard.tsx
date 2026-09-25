"use client";

import Link from "next/link";
import { Workout } from "@/app/context/PlanContext";
import Image from "next/image";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const { id, name, title, category, equipment, duration, calories, caloriesBurned, rating, image } = workout;

  // Title fallback
  const displayName = name || title || "WORKOUT";

  // Get actual calories from API payload (supports calories or caloriesBurned)
  const displayCalories = calories ?? caloriesBurned ?? 0;

  // Safe category array normalization
  const categories = Array.isArray(category)
    ? category
    : typeof category === "string"
    ? [category]
    : [];

  // Safe equipment string formatting
  const equipmentText = Array.isArray(equipment)
    ? equipment.join(", ")
    : equipment || "Bodyweight";

  return (
    <Link href={`/workout/${id}`} className="block h-full group">
      <div className="card bg-[#121316] border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-[#d0ff00]/40 transition-all duration-200 h-full flex flex-col justify-between">
        <div>
          {/* Workout Image */}
          <figure className="relative w-full aspect-video bg-zinc-900 m-0 overflow-hidden">
            <Image
              src={image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600"}
              alt={displayName}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </figure>

          {/* Card Body */}
          <div className="p-4 sm:p-5">
            {/* Category Badges */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {categories.map((cat: string, i: number) => (
                <span
                  key={i}
                  className="bg-[#d0ff00] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Workout Name */}
            <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-[#d0ff00] transition-colors line-clamp-1 mb-1">
              {displayName}
            </h3>

            {/* Equipment Line */}
            <p className="text-zinc-400 text-xs font-normal line-clamp-1">
              {equipmentText}
            </p>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-medium text-zinc-400">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{duration ?? 0} min</span>
          </div>

          {/* Calories from API */}
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
            <span>{displayCalories} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{rating ?? 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}