"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { featureTabs } from "../lib/data";

export default function FeatureTabs() {
  const [activeId, setActiveId] = useState(featureTabs[0].id);
  const active =
    featureTabs.find((tab) => tab.id === activeId) ?? featureTabs[0];

  return (
    <section className="border-y border-paper bg-white/50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap gap-2">
          {featureTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveId(tab.id)}
              aria-pressed={tab.id === activeId}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab.id === activeId
                  ? "border-ink bg-ink text-ivory"
                  : "border-paper text-ink/60 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">
                {active.heading}
              </h3>
              <p className="mt-4 max-w-lg text-ink/70">{active.body}</p>
            </div>
            <div className="torn-edge-top rounded-b-lg border border-paper bg-ivory px-6 pb-8 pt-6">
              <p className="font-mono text-3xl font-semibold text-ledger tabular-nums">
                {active.stat.value}
              </p>
              <p className="mt-1 text-sm text-ink/60">{active.stat.label}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
