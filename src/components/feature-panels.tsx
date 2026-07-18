"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";

export type PanelItem = {
  icon: LucideIcon;
  name: string;
  description: string;
};

export function FeaturePanels({ items }: { items: PanelItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Desktop — expanding panels */}
      <div className="hidden lg:flex h-[26rem] border-y border-white/15 overflow-hidden">
        {items.map((item, index) => {
          const isActive = active === index;
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-expanded={isActive}
              className={`relative text-left cursor-pointer border-l border-white/15 first:border-l-0 overflow-hidden transition-[flex-grow] duration-500 ease-out focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#38bdf8] ${
                isActive ? "grow-[3.4]" : "grow"
              }`}
              style={{ flexBasis: 0 }}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background:
                    "radial-gradient(120% 90% at 20% 100%, rgba(56,189,248,0.22), transparent 65%)",
                }}
              />
              <div className="relative h-full p-7 flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-mono tabular-nums transition-colors duration-300 ${
                      isActive ? "text-[#38bdf8]" : "text-white/40"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-[#38bdf8]" : "text-white/40"
                    }`}
                  />
                </div>

                {isActive ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.12 }}
                    >
                      <h3 className="text-2xl xl:text-3xl font-bold text-white mb-3 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-white/70 text-sm xl:text-base leading-relaxed max-w-sm">
                        {item.description}
                      </p>
                      <span className="mt-6 block h-0.5 w-14 bg-[#38bdf8]" />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <span className="[writing-mode:vertical-rl] rotate-180 text-sm font-medium tracking-wide text-white/55 whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile — stacked, everything visible */}
      <div className="lg:hidden border-t border-white/15">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="relative border-b border-white/15 py-6 pl-4"
            >
              <span className="absolute left-0 top-6 bottom-6 w-0.5 bg-[#38bdf8]/50 rounded-full" />
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono tabular-nums text-[#38bdf8]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="w-5 h-5 text-[#38bdf8]" />
                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
