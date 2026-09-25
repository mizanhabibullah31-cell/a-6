"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Hero from "@/app/components/Hero";
import WorkoutCard from "@/app/components/WorkoutCard";
import { Workout } from "@/app/context/PlanContext";

type SortOption = "duration" | "calories" | "rating";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        const data = await res.json();
        setWorkouts(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Failed to fetch workouts", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  const filteredWorkouts = workouts
    .filter((w) => {
      const name = w.name || w.title || "";
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "duration") {
        return (b.duration || 0) - (a.duration || 0);
      }
      if (sortBy === "calories") {
        const calA = a.calories ?? a.caloriesBurned ?? 0;
        const calB = b.calories ?? b.caloriesBurned ?? 0;
        return calB - calA;
      }
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

  return (
    <div>
      <Hero />

      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight">
              THE LIBRARY
            </h2>
            <p className="text-zinc-400 mt-1">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search workouts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#18181b] border border-zinc-800 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-[#ccff00]"
            />

            {/* Sort Control */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-sm font-medium text-zinc-400 whitespace-nowrap">
                Sort By:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="bg-[#18181b] border border-zinc-800 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-[#ccff00] cursor-pointer"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Animation & Skeleton Cards */}
        {loading ? (
          <div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-zinc-700 border-t-[#ccff00]"></div>
              <span className="text-sm text-zinc-400 font-semibold tracking-wider uppercase">
                Fetching Workouts...
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#12141a] border border-zinc-800/80 rounded-2xl p-4 animate-pulse"
                >
                  <div className="w-full h-48 bg-zinc-800/70 rounded-xl mb-4" />
                  <div className="h-5 bg-zinc-800/70 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-zinc-800/50 rounded w-1/2 mb-4" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-4 bg-zinc-800/50 rounded w-1/3" />
                    <div className="h-8 bg-zinc-800/70 rounded-full w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}