"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);
  const [isLg, setIsLg] = useState(false);
  const reduceMotion = useReducedMotion();
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const onChange = () => {
      setIsLg(mediaQuery.matches);
    };

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute("data-index"));
          if (!Number.isNaN(index)) setActive(index);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [steps.length]);

  const goTo = (index: number) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-20">
      {/* Sticky index */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#38bdf8] mb-4">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
            How We Create <span className="gradient-text">Success</span>
          </h2>
          <p className="text-slate-600 max-w-md">
            A streamlined process designed to deliver exceptional results on
            time and within budget. Engineered for excellence. Designed for
            results.
          </p>

          <ul className="mt-10 border-l border-slate-200 hidden lg:block">
            {steps.map((step, index) => (
              <li key={step.step}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  className="group relative flex w-full items-center gap-4 py-3 pl-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#38bdf8]"
                  aria-current={active === index ? "step" : undefined}
                >
                  <span
                    className={`absolute -left-px top-2 bottom-2 w-0.5 rounded-full transition-all duration-300 ${
                      active === index ? "bg-[#38bdf8]" : "bg-transparent"
                    }`}
                  />
                  <span
                    className={`text-xs font-mono tabular-nums transition-colors duration-300 ${
                      active === index ? "text-[#38bdf8]" : "text-slate-500"
                    }`}
                  >
                    {step.step}
                  </span>
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      active === index
                        ? "text-[#0f172a] font-semibold"
                        : "text-slate-500 group-hover:text-slate-700"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Revealing steps */}
      <div className="border-t border-slate-200">
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            data-index={index}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            animate={
              reduceMotion || !isLg
                ? { scale: 1 }
                : {
                    scale: active === index ? 1.03 : 1,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className={`group border-b border-slate-200 py-8 md:py-10 transition-opacity duration-500 ${
              active === index ? "opacity-100" : "lg:opacity-55"
            }`}
          >
            <div className="flex items-start gap-6">
              <span
                className={`text-2xl md:text-3xl font-bold tabular-nums transition-colors duration-300 ${
                  active === index ? "text-[#38bdf8]" : "text-slate-300"
                }`}
              >
                {step.step}
              </span>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
