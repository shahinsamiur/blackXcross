// src/components/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const LightningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="w-3 h-3"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.86228 0.822223C6.21043 0.317344 7.00192 0.563411 7.00193 1.17672V3.99898H9.90036C10.4039 3.99898 10.7007 4.56388 10.415 4.97847L6.1406 11.1757C5.7924 11.6804 5.00212 11.4343 5.00193 10.8212V7.99898H2.10251C1.59908 7.99891 1.3024 7.43403 1.58786 7.01949L5.86228 0.822223Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    className="w-7 h-7 shrink-0"
  >
    <rect width="28" height="28" rx="6" fill="#0B4FFF" />
    <path
      d="M9.83594 12.6667L14.0026 8.5L18.1693 12.6667M14.0026 9V19.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PersonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="w-3 h-3 shrink-0"
  >
    <path
      d="M7.80078 6.17773C9.10527 6.83667 10 8.18868 10 9.75V10.5H2V9.75C2 8.18875 2.89481 6.83668 4.19922 6.17773C4.70832 6.53748 5.32925 6.75 6 6.75C6.67065 6.75 7.29173 6.53733 7.80078 6.17773ZM6 1.25C7.3117 1.25 8.375 2.31333 8.375 3.625C8.375 4.93668 7.3117 6 6 6C4.68832 6 3.625 4.93668 3.625 3.625C3.625 2.31333 4.68832 1.25 6 1.25Z"
      fill="currentColor"
    />
  </svg>
);

const SpinnerIcon = () => (
  <img
    src="https://cdn.prod.website-files.com/6998a7a4efcd66d9f2857e79/6a5422f4c0f23b51aca8c01e_spinner.png"
    alt="spinner"
    className="w-3 h-3 animate-spin shrink-0"
  />
);

const Badge = ({ label }: { label: string }) => (
  <div className="flex items-center gap-0 border-2 border-[#d8dade] bg-[#d8dade] text-[#0b4fff] rounded-full px-[0.75em] py-[0.4em] w-fit">
    <LightningIcon />
    <div className="overflow-hidden">
      <div className="uppercase font-mono text-[0.75em] leading-[1.2] whitespace-nowrap pl-[0.5em] pt-[1px]">
        {label}
      </div>
    </div>
  </div>
);

// ---- Desktop yoyo timeline config ----
// Every animated piece shares this duration + repeat settings so they
// stay perfectly in sync across loops. repeatType "mirror" = plays
// forward then backward (yoyo), then pauses `PAUSE` seconds, then repeats.
const CYCLE = 5.5; // seconds, forward-direction length
const PAUSE = 0; // seconds pause held at each end before reversing/restarting

const makeReveal = (revealAt: number, riseFrom = 16) => ({
  initial: { opacity: 0, y: riseFrom },
  animate: { opacity: [0, 0, 1, 1], y: [riseFrom, riseFrom, 0, 0] },
  transition: {
    duration: CYCLE,
    times: [0, revealAt, Math.min(revealAt + 0.1, 1), 1],
    repeat: Infinity,
    repeatType: "mirror" as const,
    repeatDelay: PAUSE,
    ease: "easeInOut",
  },
});

export default function Hero() {
  const workflowSteps = [
    "Analyze existing campaigns",
    "Build campaign brief",
    "Define goals, guardrails",
    "Pull content from CMS",
    "Route for approval",
    "Send via Auxia Decisioning",
  ];

  const personas = [
    { text: "Adventure Seeker\n2+ Friends Referred\nSorted by Lowest Price" },
    { text: "Luxury traveler\n3+ Bookings in 12M\nLogged into Loyalty" },
    { text: "Family Planner\nApp Installed\nReviewed Past Stay" },
  ];

  const variants = [
    {
      title: "Discover the Swiss Alps",
      desc: "Breathtaking peaks, cozy chalets, and world-class hiking await.",
      img: "https://cdn.prod.website-files.com/6998a7a4efcd66d9f2857e79/6a54243411d198283b162096_Frame%2084508608%20(1).png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // ---- Mobile carousel: one step visible at a time, auto-advances, loops forever ----
  const mobileSteps = [
    { label: "ask Agent", kind: "ask" as const },
    { label: "Agent workflow", kind: "workflow" as const },
    { label: "AI Decisioning", kind: "personas" as const },
    { label: "personalized variant", kind: "variant" as const },
  ];
  const STEP_DURATION = 3200; // ms per step
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % mobileSteps.length);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, [mobileSteps.length]);

  return (
    <section className="relative pt-18 bg-[#f0efe3] text-[#232323] overflow-hidden w-full!">
      <div className="w-full mx-auto px-5 md:px-10">
        <div className="relative pt-16 pb-14 lg:pt-40 lg:pb-14">
          {/* ============== DESKTOP VISUAL — yoyo timeline ============== */}
          <div className="hidden lg:flex flex-col justify-between items-start w-full absolute top-20 pointer-events-none text-[clamp(8px,1vw,1rem)]">
            {/* Lines */}
            <div className="relative w-full flex justify-start items-start mt-[1em] mb-[-5.6em] z-0">
              <div className="absolute right-full w-full h-0.5 bg-[#e2e1d3] overflow-hidden">
                <motion.div
                  className="w-full h-full bg-[#0b4fff]"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 1231 71"
                fill="none"
                className="block w-full"
              >
                <path
                  d="M0 1H248.5C261.755 1 272.5 11.7452 272.5 25V45.416C272.5 58.6708 283.245 69.416 296.5 69.416H1230.5"
                  stroke="#E2E1D3"
                  strokeWidth="2"
                />
                <motion.path
                  d="M0 1H248.5C261.755 1 272.5 11.7452 272.5 25V45.416C272.5 58.6708 283.245 69.416 296.5 69.416H1230.5"
                  stroke="#0B4FFF"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              <div className="absolute bottom-[-1em] right-0 w-[12em] h-[2em] bg-[#f0efe3]" />
              <div className="absolute bottom-[0.5px] left-[calc(100%-12em)] w-full h-0.5 bg-[#e2e1d3]">
                <motion.div
                  className="w-full h-full bg-[#0b4fff]"
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </div>
            </div>

            {/* Step 1: Ask Agent */}
            <motion.div
              className="absolute top-0 left-0 z-10 flex flex-col justify-start items-start w-[15em] pointer-events-auto gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Badge label="ask Agent" />
              <div className="flex flex-col gap-3 bg-[#fefdf5] border border-[#2323231a] rounded-xl p-4 shadow-[0_198px_79px_#00000008,0_111px_67px_#0000001a,0_49px_49px_#00000024,0_12px_27px_#0000002e]">
                <p className="text-[1rem]">
                  Diagnose the leaks in our repeat purchase funnel and initiate
                  new campaigns to close them
                </p>
                <div className="ml-auto">
                  <ArrowIcon />
                </div>
              </div>
            </motion.div>

            {/* Right Side Steps */}
            <div className="relative z-20 flex justify-start items-start gap-[4.5em] mt-[4.5em] self-end">
              {/* Step 2: Agent Workflow */}
              <motion.div
                className="flex flex-col justify-start items-start gap-6 w-[18.4em] pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Badge label="Agent workflow" />
                <div className="flex flex-col gap-2 w-full">
                  {workflowSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-1 border-2 border-[#d8dade] rounded-[100rem] px-[0.25rem] py-[0.125rem] pr-[0.5rem] text-[0.8125rem] justify-between"
                      initial={{
                        opacity: 0,
                        y: "1em",
                        color: "#c3c2b2",
                        borderColor: "#e2e1d3",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        color: "#232323",
                        borderColor: "#d8dade",
                      }}
                      transition={{ duration: 0.8, delay: 1.4 + i * 0.35 }}
                    >
                      <div className="flex items-center gap-1">
                        <SpinnerIcon />
                      </div>
                      <p className="uppercase font-mono text-[0.7rem] tracking-wide opacity-70">
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Step 3: AI Decisioning */}
              <motion.div
                className="flex flex-col justify-start items-start gap-6 w-[18.5em] pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.0 }}
              >
                <Badge label="AI Decisioning" />
                <div className="flex flex-col gap-4 max-w-[14rem]">
                  {personas.map((persona, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-4 uppercase font-mono text-[clamp(8px,1vw,1rem)]"
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 2.2 + i * 0.35 }}
                    >
                      <motion.div
                        initial={{ color: "#c3c2b2" }}
                        animate={{ color: "#0b4fff" }}
                        transition={{ duration: 0.8, delay: 2.2 + i * 0.35 }}
                      >
                        <PersonIcon />
                      </motion.div>
                      <motion.div
                        className="text-[0.75rem]"
                        initial={{ color: "#c3c2b2" }}
                        animate={{ color: "#232323" }}
                        transition={{ duration: 0.8, delay: 2.2 + i * 0.35 }}
                      >
                        {persona.text}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Step 4: Personalized Variant */}
              <motion.div
                className="flex flex-col justify-start items-start gap-6 w-[18em] pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 3.0 }}
              >
                <Badge label="personalized variant" />
                <div className="snap-center shrink-0 w-[85vw] max-w-[20rem] rounded-2xl overflow-hidden shadow-4xl!">
                  <div className="relative aspect-[2.9/3.7] overflow-hidden">
                    <img
                      src={variants[0].img}
                      alt="variant"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 z-10 flex flex-col justify-end items-start p-5 text-white">
                      <div className="text-xl font-semibold mb-2">
                        {variants[0].title}
                      </div>
                      <div className="text-sm opacity-80 mb-4 leading-snug">
                        {variants[0].desc}
                      </div>
                      <div className="bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium">
                        Book now
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hero copy */}
          <motion.div
            className="flex flex-col gap-6 md:gap-10 max-w-5xl lg:pt-[clamp(20rem,30vw,10rem)] "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(2.25rem,8vw,4.3rem)] font-bold  leading-[1.15] text-[#232323]"
            >
              Leading Digital <br />
              Services Worldwide
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-[1rem] md:text-[1.25rem] leading-[1.4] max-w-126.25 text-[#232323]"
            >
              Auxia is the agentic marketing platform that runs the work across
              your stack and delivers 1:1, personalized experiences to each
              customer.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 bg-[#0b4fff] text-white rounded-xl px-6 py-3.5 text-base font-medium transition-all hover:bg-[#232323] hover:rounded-lg"
              >
                Request a Demo
              </Link>
              <Link
                href="#home-marketer"
                className="flex items-center justify-center gap-2 border-2 border-[#c3c2b2] bg-[#f0efe3] text-[#232323b3] rounded-xl px-6 py-3.5 text-base font-medium transition-all hover:bg-[#232323] hover:text-white hover:border-[#232323] hover:rounded-lg"
              >
                See how it works
              </Link>
            </motion.div>
          </motion.div>

          {/* ============== MOBILE / TABLET — auto-advancing single-step carousel ============== */}
          <div className="flex lg:hidden flex-col gap-5 w-full mt-12">
            {/* progress dots */}
            <div className="flex items-center gap-2">
              {mobileSteps.map((step, i) => (
                <button
                  key={step.kind}
                  onClick={() => setActiveStep(i)}
                  aria-label={step.label}
                  className="relative flex-1 h-1 rounded-full bg-[#e2e1d3] overflow-hidden"
                >
                  {activeStep === i && (
                    <motion.div
                      key={activeStep}
                      className="absolute inset-y-0 left-0 bg-[#0b4fff] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: STEP_DURATION / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                  {activeStep > i && (
                    <div className="absolute inset-0 bg-[#0b4fff] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                <div className="flex flex-col gap-4">
                  <Badge label={mobileSteps[activeStep].label} />

                  {mobileSteps[activeStep].kind === "ask" && (
                    <div className="flex flex-col gap-3 bg-[#fefdf5] border border-[#2323231a] rounded-xl p-4 shadow-[0_24px_40px_-12px_#00000024]">
                      <p className="text-sm">
                        Diagnose the leaks in our repeat purchase funnel and
                        initiate new campaigns to close them
                      </p>
                      <div className="ml-auto">
                        <ArrowIcon />
                      </div>
                    </div>
                  )}

                  {mobileSteps[activeStep].kind === "workflow" && (
                    <div className="flex flex-col gap-2 bg-[#fefdf5] border border-[#2323231a] rounded-xl p-4">
                      {workflowSteps.map((step, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 border-2 border-[#d8dade] rounded-full px-3 py-1.5 text-[0.8125rem]"
                        >
                          <SpinnerIcon />
                          <p className="uppercase font-mono text-[0.7rem] tracking-wide opacity-70">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {mobileSteps[activeStep].kind === "personas" && (
                    <div className="flex flex-col gap-3 bg-[#fefdf5] border border-[#2323231a] rounded-xl p-4">
                      {personas.map((persona, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 uppercase font-mono"
                        >
                          <div className="text-[#0b4fff] mt-0.5">
                            <PersonIcon />
                          </div>
                          <div className="text-[0.7rem] leading-snug whitespace-pre-line">
                            {persona.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {mobileSteps[activeStep].kind === "variant" && (
                    <div className="w-full rounded-2xl overflow-hidden shadow-lg">
                      <div className="relative aspect-[2.9/3.7] overflow-hidden">
                        <img
                          src={variants[0].img}
                          alt="variant"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 z-10 flex flex-col justify-end items-start p-5 text-white">
                          <div className="text-lg font-semibold mb-2">
                            {variants[0].title}
                          </div>
                          <div className="text-sm opacity-80 mb-4 leading-snug">
                            {variants[0].desc}
                          </div>
                          <div className="bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium">
                            Book now
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
