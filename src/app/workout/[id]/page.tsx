"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePlan, Workout } from "@/app/context/PlanContext";
import Image from "next/image";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { plan, addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        const data = await res.json();
        setWorkout(data.data || data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0e11] flex items-center justify-center text-[#d0ff00]">
        Loading details...
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0d0e11] flex items-center justify-center text-white">
        Workout not found.
      </div>
    );
  }

  const displayName = workout.name || workout.title || "BARBELL BENCH PRESS";
  const steps = workout.steps || [
    "Lie on the bench with eyes under the bar and feet planted.",
    "Unrack with locked elbows and lower the bar to mid-chest.",
    "Press up in a slight arc until elbows lock without bouncing.",
    "Keep shoulder blades pinched and a natural arch in the back."
  ];

  const categories = Array.isArray(workout.category)
    ? workout.category
    : typeof workout.category === "string"
    ? [workout.category]
    : [];

  const equipmentText = Array.isArray(workout.equipment)
    ? workout.equipment.join(", ")
    : workout.equipment || "Barbell, Bench";

  const isPlanFull = plan.length >= 5;

  return (
    <div className="min-h-screen bg-[#0d0e11] text-zinc-100 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column - Large Image Card */}
          <div className="lg:col-span-6 relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80">
            <Image
              src={workout.image || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"}
              alt={displayName}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-3">
                {displayName}
              </h1>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                {workout.description || "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
              </p>

              {/* Category Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="bg-[#d0ff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Specs List Table */}
              <div className="bg-[#121316] border border-zinc-800/80 rounded-xl overflow-hidden mb-8 text-xs sm:text-sm">
                <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/60">
                  <span className="text-zinc-400 uppercase tracking-wider font-medium">Equipment</span>
                  <span className="text-white font-medium">{equipmentText}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/60">
                  <span className="text-zinc-400 uppercase tracking-wider font-medium">Difficulty</span>
                  <span className="text-white font-medium">{workout.difficulty || "Intermediate"}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/60">
                  <span className="text-zinc-400 uppercase tracking-wider font-medium">Sets</span>
                  <span className="text-white font-medium">{workout.sets || 4}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/60">
                  <span className="text-zinc-400 uppercase tracking-wider font-medium">Reps</span>
                  <span className="text-white font-medium">{workout.reps || "6-8"}</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/60">
                  <span className="text-zinc-400 uppercase tracking-wider font-medium">Duration</span>
                  <span className="text-white font-medium">{workout.duration || 25} min</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/60">
                  <span className="text-zinc-400 uppercase tracking-wider font-medium">Calories</span>
                  <span className="text-white font-medium">{workout.calories || workout.caloriesBurned || 180} kcal</span>
                </div>
                <div className="flex justify-between items-center px-5 py-3">
                  <span className="text-zinc-400 uppercase tracking-wider font-medium">Rating</span>
                  <span className="text-white font-medium">{workout.rating || 4.8}</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-8">
                <h2 className="text-base font-bold text-white uppercase tracking-wider mb-3">
                  Instructions
                </h2>
                <ol className="space-y-2 text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {steps.map((step, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-zinc-400 select-none">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3">
                <button
                  disabled={isPlanFull}
                  onClick={() => addToPlan(workout)}
                  className="bg-[#d0ff00] hover:bg-[#b8e600] disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed text-black font-extrabold text-xs uppercase px-5 py-3.5 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {isPlanFull ? "Plan Limit Reached (5/5)" : "Add to today's plan"}
                  </span>
                </button>

                <button
                  onClick={() => addToSaved(workout)}
                  className="bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-800 font-bold text-xs uppercase px-5 py-3.5 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <svg className="w-4 h-4 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Save for later</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}