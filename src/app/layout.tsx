import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/app/context/PlanContext";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Toast from "@/app/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "A dark, no-nonsense gym companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme ="dark">
      <body className={`${inter.className} bg-[#09090b] text-white min-h-screen flex flex-col justify-between`}>
        <PlanProvider>
          <div>
            <Navbar />
            <main>{children}</main>
          </div>
          <Footer />
          <Toast />
        </PlanProvider>
      </body>
    </html>
  );
}