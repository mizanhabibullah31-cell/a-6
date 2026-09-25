"use client";

import React, { createContext, useContext, useState, useSyncExternalStore, ReactNode } from "react";

export interface Workout {
  id: string | number;
  name?: string;
  title?: string;
  category?: string | string[];
  description?: string;
  difficulty?: string;
  sets?: number;
  reps?: string | number;
  steps?: string[];
  duration?: number;
  calories?: number;
  caloriesBurned?: number;
  rating?: number;
  equipment?: string | string[];
  image?: string;
}

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: string | number, message?: string | null) => void;
  removeFromSaved: (id: string | number, message?: string | null) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

// Custom event to notify all components on the same tab when storage updates
const STORAGE_CHANGE_EVENT = "fitlog_storage_change";

function notifyStorageChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
  }
}

function subscribeStorage(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  
  window.addEventListener("storage", callback);
  window.addEventListener(STORAGE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORAGE_CHANGE_EVENT, callback);
  };
}

// Hook that syncs state directly from localStorage without useState or useEffect
function useLocalStorageStore(key: string): [Workout[], (updater: Workout[] | ((prev: Workout[]) => Workout[])) => void] {
  const rawData = useSyncExternalStore(
    subscribeStorage,
    () => localStorage.getItem(key) ?? "[]",
    () => "[]" // SSR Fallback
  );

  let data: Workout[] = [];
  try {
    data = JSON.parse(rawData);
  } catch {
    data = [];
  }

  const setStore = (updater: Workout[] | ((prev: Workout[]) => Workout[])) => {
    const currentData = data;
    const nextData = typeof updater === "function" ? updater(currentData) : updater;
    
    try {
      localStorage.setItem(key, JSON.stringify(nextData));
      notifyStorageChange();
    } catch (err) {
      console.error(`Failed to save ${key} to localStorage:`, err);
    }
  };

  return [data, setStore];
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useLocalStorageStore("fitlog_plan");
  const [saved, setSaved] = useLocalStorageStore("fitlog_saved");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToPlan = (workout: Workout) => {
    setPlan((prev) => {
      if (prev.length >= 5) {
        showToast("Plan is full (maximum 5 workouts)");
        return prev;
      }
      if (prev.some((item) => item.id === workout.id)) {
        showToast("Already in today's plan");
        return prev;
      }
      showToast("Added to today's plan");
      return [...prev, workout];
    });
  };

  const addToSaved = (workout: Workout) => {
    setSaved((prev) => {
      if (prev.some((item) => item.id === workout.id)) {
        showToast("Already in saved lifts");
        return prev;
      }
      showToast("Saved for later");
      return [...prev, workout];
    });
  };

  const removeFromPlan = (id: string | number, customToast?: string | null) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    if (customToast !== null) {
      showToast(customToast ?? "Removed from plan");
    }
  };

  const removeFromSaved = (id: string | number, customToast?: string | null) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    if (customToast !== null) {
      showToast(customToast ?? "Removed from saved");
    }
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        toastMessage,
        showToast,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}