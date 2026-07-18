"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type NumeralItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function NumeralGrid({
  items,
  tone = "dark",
  columns = 4,
}: {
  items: NumeralItem[];
  tone?: "light" | "dark";
  columns?: 3 | 4;
}) {
  const isDark = tone === "dark";

  return (
    <div
      className={`grid sm:grid-cols-2 ${
        columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
      } gap-x-10 gap-y-14 pt-4`}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          variants={fadeInUp}
          className="group relative"
        >
          <span
            aria-hidden="true"
            className={`absolute -top-8 -left-3 text-7xl font-bold tabular-nums select-none pointer-events-none transition-colors duration-500 ${
              isDark
                ? "text-white/[0.07] group-hover:text-[#38bdf8]/15"
                : "text-slate-900/[0.06] group-hover:text-[#38bdf8]/25"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="relative">
            <item.icon className="w-6 h-6 text-[#38bdf8] mb-4" />
            <h3
              className={`text-base font-semibold leading-snug mb-2 ${
                isDark ? "text-white" : "text-[#0f172a]"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-white/65" : "text-slate-600"
              }`}
            >
              {item.description}
            </p>
            <span className="mt-5 block h-px w-10 bg-[#38bdf8]/60 transition-all duration-500 group-hover:w-20" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
