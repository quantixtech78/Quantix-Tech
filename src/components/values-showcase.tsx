"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";

export type ShowcaseItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const RADIUS = 108;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ValuesShowcase({
  items,
  tone = "light",
  label = "Core Value",
}: {
  items: ShowcaseItem[];
  tone?: "light" | "dark";
  label?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDark = tone === "dark";

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !isInView) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, isInView, items.length]);

  const item = items[active];
  const ActiveIcon = item.icon;
  const progress = (active + 1) / items.length;

  const go = (direction: number) =>
    setActive((current) => (current + direction + items.length) % items.length);

  return (
    <div
      ref={sectionRef}
      className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-14 lg:gap-24 items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Dial */}
      <div className="relative mx-auto w-65 h-65 shrink-0">
        <div className="absolute inset-6 rounded-full bg-[#38bdf8]/20 blur-3xl" />
        <svg
          viewBox="0 0 260 260"
          className="absolute inset-0 w-full h-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="130"
            cy="130"
            r={RADIUS}
            fill="none"
            strokeWidth="1.5"
            className={isDark ? "stroke-white/15" : "stroke-slate-200"}
          />
          <motion.circle
            cx="130"
            cy="130"
            r={RADIUS}
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            stroke="#38bdf8"
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - progress) }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        <div className="absolute inset-0 grid place-items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <ActiveIcon className="w-7 h-7 text-[#38bdf8] mb-2" />
              <span
                className={`text-6xl font-light tabular-nums leading-none ${
                  isDark ? "text-white" : "text-[#0f172a]"
                }`}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Detail */}
      <div className="text-center lg:text-left">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <span className="text-xs font-mono tracking-[0.24em] uppercase text-[#38bdf8]">
                {label}
              </span>
              <span className="h-px w-10 bg-[#38bdf8]/50" />
            </div>
            <h3
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? "text-white" : "text-[#0f172a]"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${
                isDark ? "text-white/70" : "text-slate-600"
              }`}
            >
              {item.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous value"
              className={`w-10 h-10 rounded-full border grid place-items-center cursor-pointer transition-colors duration-300 hover:border-[#38bdf8] hover:text-[#38bdf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] ${
                isDark
                  ? "border-white/20 text-white/60"
                  : "border-slate-200 text-slate-500"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next value"
              className={`w-10 h-10 rounded-full border grid place-items-center cursor-pointer transition-colors duration-300 hover:border-[#38bdf8] hover:text-[#38bdf8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] ${
                isDark
                  ? "border-white/20 text-white/60"
                  : "border-slate-200 text-slate-500"
              }`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {items.map((entry, index) => (
              <button
                key={entry.title}
                type="button"
                onClick={() => setActive(index)}
                aria-label={entry.title}
                aria-current={active === index}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#38bdf8] ${
                  active === index
                    ? "w-8 bg-[#38bdf8]"
                    : isDark
                      ? "w-1.5 bg-white/25 hover:bg-white/45"
                      : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
