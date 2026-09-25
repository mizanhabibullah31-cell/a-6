"use client";

import { usePlan } from "@/app/context/PlanContext";

export default function Toast() {
  const { toastMessage } = usePlan();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#18181b] border border-[#ccff00] text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-2xl transition-all transform animate-bounce">
      <svg
        className="w-5 h-5 text-[#ccff00]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <span>{toastMessage}</span>
    </div>
  );
}