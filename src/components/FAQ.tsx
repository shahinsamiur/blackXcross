"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { faqItems, FaqCategory } from "../lib/data";

const categories: FaqCategory[] = ["General", "Billing", "Security"];

export default function FAQ() {
  const [category, setCategory] = useState<FaqCategory>("General");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = faqItems.filter((item) => item.category === category);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <h2 className="text-center font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Questions, answered
      </h2>

      <div className="mt-8 flex justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              setOpenId(null);
            }}
            aria-pressed={cat === category}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              cat === category
                ? "bg-ink text-ivory"
                : "border border-paper text-ink/60 hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-8 divide-y divide-paper border-y border-paper">
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="font-medium text-ink">{item.question}</span>
                <HiChevronDown
                  className={`shrink-0 text-ink/50 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-ink/60">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
