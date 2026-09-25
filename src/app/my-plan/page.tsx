"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan, Workout } from "@/app/context/PlanContext";

type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, showToast } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const handleMarkAsDone = (id: string | number) => {
    removeFromPlan(id);
    if (showToast) {
      showToast("Marked as done");
    }
  };

  // Switch list based on active tab
  const rawList = activeTab === "plan" ? plan : saved;

  // Dynamic calculations for the selected tab
  const totalExercises = rawList.length;
  const totalMinutes = rawList.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = rawList.reduce((acc, curr) => {
    const kcal = curr.calories ?? curr.caloriesBurned ?? 0;
    return acc + kcal;
  }, 0);

  // Sorting functionality
  const activeList = [...rawList].sort((a, b) => {
    if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
    if (sortBy === "calories") {
      const calA = a.calories ?? a.caloriesBurned ?? 0;
      const calB = b.calories ?? b.caloriesBurned ?? 0;
      return calB - calA;
    }
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen text-white">
      {/* Page Title Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight uppercase">MY PLAN</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Dynamic Stats Bar */}
      <div className="bg-[#12141a] border border-zinc-800/80 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80">
        <div className="pb-4 md:pb-0 md:pr-6">
          <span className="text-zinc-400 text-xs font-medium">
            {activeTab === "plan" ? "Exercises" : "Saved Lifts"}
          </span>
          <p className="text-4xl font-black text-[#d0ff00] mt-1">{totalExercises}</p>
        </div>

        <div className="py-4 md:py-0 md:px-6">
          <span className="text-zinc-400 text-xs font-medium">Minutes</span>
          <p className="text-4xl font-black text-white mt-1">{totalMinutes}</p>
        </div>

        <div className="pt-4 md:pt-0 md:pl-6">
          <span className="text-zinc-400 text-xs font-medium">Calories</span>
          <p className="text-4xl font-black text-white mt-1">{totalCalories}</p>
        </div>
      </div>

      {/* Controls Row: Tabs & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="bg-[#12141a] border border-zinc-800/80 p-1.5 rounded-xl flex items-center">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "plan"
                ? "bg-[#1c202a] text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "saved"
                ? "bg-[#1c202a] text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-dropdown" className="text-sm text-zinc-400 font-medium">
            Sort By
          </label>
          <div className="relative">
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSortBy(e.target.value as SortOption)
              }
              className="appearance-none bg-[#12141a] border border-zinc-800/80 text-white text-sm font-medium rounded-xl px-4 py-2 pr-8 focus:outline-none focus:border-[#d0ff00] cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-zinc-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {activeList.length === 0 ? (
        <div className="bg-[#12141a] border border-zinc-800/80 rounded-2xl p-12 text-center my-8">
          <h2 className="text-xl font-bold uppercase mb-2">NOTHING HERE YET</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#d0ff00] text-black font-extrabold text-sm px-6 py-2.5 rounded-xl hover:bg-[#bce600] transition-colors"
          >
            Go to Workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {activeList.map((item: Workout) => {
            const displayName = item.name || item.title || "WORKOUT";
            const kcal = item.calories ?? item.caloriesBurned ?? 0;
            const equipmentText = Array.isArray(item.equipment)
              ? item.equipment.join(", ")
              : item.equipment || "Bodyweight";

            return (
              <div
                key={item.id}
                className="bg-[#12141a] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-zinc-700/80 transition-all"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-28 h-20 sm:w-36 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-zinc-900">
                    <Image
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300"
                      }
                      alt={displayName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold uppercase tracking-tight text-white mb-1">
                      {displayName}
                    </h3>
                    <p className="text-xs text-zinc-400 mb-2">{equipmentText}</p>

                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-300">
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-[#d0ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{item.duration || 0} min</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-[#d0ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                        <span>{kcal} kcal</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-[#d0ff00] fill-[#d0ff00]" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span>{item.rating || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-zinc-800/60 pt-3 sm:pt-0">
                  <Link
                    href={`/workout/${item.id}`}
                    className="text-xs font-semibold text-zinc-300 border border-zinc-700/80 px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors"
                  >
                    View Details
                  </Link>

                  {/* Show "Mark as Done" only when viewing Today's Plan tab */}
                  {activeTab === "plan" && (
                    <button
                      onClick={() => handleMarkAsDone(item.id)}
                      className="flex items-center gap-1.5 bg-[#d0ff00] text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-[#bce600] transition-colors"
                    >
                      <svg
                        className="w-3.5 h-3.5 stroke-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Mark as Done</span>
                    </button>
                  )}

                  {/* Close / Remove button */}
                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    aria-label="Remove workout"
                    className="p-2 text-zinc-500 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}