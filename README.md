# FitLog — Gym Companion & Workout Library

FitLog is a responsive, dark-themed gym companion built with **Next.js (App Router)** and **Tailwind CSS**. It allows athletes to explore exercises, plan up to 5 daily lifts, save workouts for later, track calories/time, and mark completed exercises.

---

## Key Features

1. **Live API Integration & Sorting:** Fetches lifts dynamically from the FitLog Worker API with sorting capabilities (Duration, Calories, Rating).
2. **Cap-Enforced Daily Plan (Max 5):** Interactive daily planner that limits users to a maximum of 5 lifts per day with dynamic stat counters (Minutes, Calories, Exercises).
3. **Persisted Local State:** Keeps your selected plan, saved lifts, and completed statuses synchronized across page refreshes via `localStorage`.
4. **Interactive Action Feedback:** Instant visual feedback using responsive toast notifications for adding, removing, saving, and marking items done.
5. **Responsive Two-Column Detail View:** Full breakdown with exercise specs, instructions, and actions adapted to mobile, tablet, and desktop screens.

---

## Technologies Used

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API + LocalStorage
- **Deployment Platform:** Vercel