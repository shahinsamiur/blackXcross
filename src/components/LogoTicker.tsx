// src/components/LogoTicker.tsx
"use client";

import { motion } from "framer-motion";

const brands = [
  "Assurant",
  "Atlassian",
  "Comcast",
  "The Guardian",
  "Konami",
  "Mercari",
  "MUFG",
  "NTT Docomo",
];

const Row = ({
  direction,
  className = "",
}: {
  direction: "left" | "right";
  className?: string;
}) => (
  <motion.div
    className={`flex gap-8 sm:gap-12 lg:gap-16 items-center ${className}`}
    animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
    transition={{
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    {[...brands, ...brands].map((brand, index) => (
      <div
        key={index}
        className="shrink-0 text-base sm:text-xl lg:text-2xl font-bold text-[#232323]/30 hover:text-[#232323]/60 transition-colors whitespace-nowrap"
      >
        {brand}
      </div>
    ))}
  </motion.div>
);

export default function LogoTicker() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-8 mb-6 sm:mb-8 lg:mb-10">
        <p className="text-center text-xs sm:text-sm font-mono uppercase tracking-wider text-[#232323]/50">
          Leading brands grow with Auxia
        </p>
      </div>

      <div className="relative flex flex-col gap-6 sm:gap-8 lg:gap-10">
        <Row direction="left" />
        <Row direction="right" />
        <Row direction="left" className="hidden md:flex" />
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-linear-to-r from-[#f0efe3] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-32 bg-linear-to-l from-[#f0efe3] to-transparent z-10" />
    </section>
  );
}
