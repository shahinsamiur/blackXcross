"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiHome,
  FiDatabase,
  FiWifi,
  FiActivity,
  FiSmartphone,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";
gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    icon: FiHome,
    name: "Residential Proxies",
    price: "Starting from 4.5$/GB",
    badge: "Guaranteed High Speeds",
    heading: "High-Speed, Reliable\nResidential Proxies",
    desc: "Efficient, affordable, and built to deliver fast, secure connections.",
    bullets: [
      "Multiple global locations with guaranteed high performance.",
      "Flexible plans starting from just $4.5/GB, catering to various use cases.",
    ],
    flags: ["🇺🇸", "🇬🇧", "🇩🇪"],
  },
  {
    icon: FiDatabase,
    name: "Datacenter Proxies",
    price: "Starting from 10$/Day",
    badge: "Unmetered Bandwidth",
    heading: "Fast, Stable\nDatacenter Proxies",
    desc: "Raw speed and consistency for high-volume scraping workloads.",
    bullets: [
      "Dedicated IPs with near-zero latency across major regions.",
      "Flat daily pricing from $10/day, no surprise overages.",
    ],
    flags: ["🇺🇸", "🇳🇱", "🇸🇬"],
  },
  {
    icon: FiWifi,
    name: "ISP Proxies",
    price: "Starting from 4$/IP",
    badge: "Static & Residential-Grade",
    heading: "The Best of Both:\nISP Proxies",
    desc: "Datacenter speed with residential-grade trust and stability.",
    bullets: [
      "Static IPs registered to real ISPs for maximum trust scores.",
      "Starting at just $4/IP with unlimited bandwidth options.",
    ],
    flags: ["🇺🇸", "🇨🇦", "🇬🇧"],
  },
  {
    icon: FiActivity,
    name: "IPv6 Proxies",
    price: "Starting from 10$/Day",
    badge: "Massive IP Pool",
    heading: "Scale Without Limits:\nIPv6 Proxies",
    desc: "An enormous address space for large-scale, parallel scraping.",
    bullets: [
      "Access billions of unique IPv6 addresses on demand.",
      "Cost-efficient scaling from $10/day per subnet.",
    ],
    flags: ["🇺🇸", "🇩🇪", "🇯🇵"],
  },
  {
    icon: FiSmartphone,
    name: "Mobile Proxies",
    price: "Starting from 5$/GB",
    badge: "Real Carrier IPs",
    heading: "Highest Trust:\nMobile Proxies",
    desc: "Genuine 4G/5G carrier IPs for the toughest anti-bot targets.",
    bullets: [
      "Real device IPs rotating across major mobile carriers.",
      "Plans from $5/GB with automatic IP rotation included.",
    ],
    flags: ["🇺🇸", "🇧🇷", "🇮🇳"],
  },
];
// Reusable browser-mockup visual on the right of each panel
function PanelMockup({ flags }: { flags: string[] }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-4 right-6 w-14 h-14 rounded-2xl bg-white/90 shadow-lg flex items-center justify-center rotate-6">
        <FiHome className="w-6 h-6 text-[#0b4fff]" />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-white/40 bg-gradient-to-br from-[#e8eeff] to-[#c7d6ff] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/40">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="p-5 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 rounded-lg bg-white/70 flex items-center px-3">
              <div className="w-4 h-4 rounded bg-[#0b4fff]" />
            </div>
            <div className="h-10 rounded-lg bg-white/70 flex items-center px-3">
              <div className="w-4 h-4 rounded bg-[#0b4fff]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 rounded-lg bg-white/70 flex items-center gap-1.5 px-3 text-base">
              {flags.map((f, i) => (
                <span key={i}>{f}</span>
              ))}
            </div>
            <div className="h-10 rounded-lg bg-white/50" />
          </div>
          <button className="mt-1 h-10 rounded-lg bg-[#0b4fff] text-white text-sm font-medium">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProxyProductsTabs() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollDriven, setScrollDriven] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Scroll-driven pin + scrub only on desktop
        "(min-width: 1024px)": function () {
          setScrollDriven(true);
          const st = ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top",
            end: () => `+=${(tabs.length - 1) * 700}`,
            pin: pinRef.current,
            scrub: 0.5,
            onUpdate: (self) => {
              const idx = Math.min(
                tabs.length - 1,
                Math.floor(self.progress * tabs.length),
              );
              setActiveIndex(idx);
            },
          });
          return () => st.kill();
        },
        // Below lg: no scroll-jacking, normal tap-to-switch tabs
        "(max-width: 1023px)": function () {
          setScrollDriven(false);
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const active = tabs[activeIndex];
  const Icon = active.icon;

  return (
    <section
      ref={wrapperRef}
      className="relative bg-[#f0efe3]"
      style={{ height: scrollDriven ? `${tabs.length * 700 + 700}px` : "auto" }}
    >
      <div
        ref={pinRef}
        className="lg:h-screen lg:flex lg:flex-col lg:justify-center px-5 md:px-10 py-16 lg:py-0"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-xs font-mono uppercase tracking-wider text-[#0b4fff] font-semibold">
              Products
            </span>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-[#232323] leading-tight">
              Proxy products to power
              <br />
              your web scraping projects
            </h2>
          </div>

          {/* Card */}
          <div className="border border-[#d8dade] bg-[#fefdf5] rounded-2xl overflow-hidden">
            {/* Tab bar */}
            <div className="flex flex-wrap md:flex-nowrap items-stretch border-b border-[#d8dade] overflow-x-auto">
              {tabs.map((tab, i) => {
                const TabIcon = tab.icon;
                const isActive = i === activeIndex;
                return (
                  <button
                    key={tab.name}
                    onClick={() => !scrollDriven && setActiveIndex(i)}
                    className={`flex-1 min-w-[140px] flex flex-col items-center gap-2 px-4 py-5 transition-colors relative ${
                      scrollDriven ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? "bg-[#0b4fff]" : "bg-[#232323]"
                      }`}
                    >
                      <TabIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-sm font-semibold ${
                          isActive ? "text-[#232323]" : "text-[#232323]/60"
                        }`}
                      >
                        {tab.name}
                      </div>
                      <div className="text-xs text-[#232323]/40 mt-0.5">
                        {tab.price}
                      </div>
                    </div>
                    {isActive && <motionUnderline key={activeIndex} />}
                  </button>
                );
              })}
            </div>

            {/* Panel */}
            <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-10 items-center">
              <div
                key={activeIndex}
                className="flex flex-col gap-5 animate-[fadeIn_0.4s_ease]"
              >
                <div className="w-fit flex items-center gap-1.5 bg-[#e8eeff] text-[#0b4fff] text-xs font-medium px-3 py-1.5 rounded-full">
                  <FiZap className="w-3 h-3" />
                  {active.badge}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#232323] whitespace-pre-line leading-tight">
                  {active.heading}
                </h3>
                <p className="text-sm text-[#232323]/60 leading-relaxed max-w-sm">
                  {active.desc}
                </p>
                <ul className="flex flex-col gap-3">
                  {active.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[#232323]/80"
                    >
                      <Icon className="w-4 h-4 text-[#0b4fff] mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-fit flex items-center gap-2 bg-[#0b4fff] text-white rounded-xl px-5 py-3 text-sm font-medium mt-2 hover:bg-[#232323] transition-colors">
                  Get Started <FiArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="h-64 md:h-80 rounded-xl bg-gradient-to-br from-[#7c93ff] to-[#3d5cff] overflow-hidden">
                <PanelMockup flags={active.flags} />
              </div>
            </div>

            {/* Progress dots (mobile/tablet only, since there's no scroll cue there) */}
            {!scrollDriven && (
              <div className="flex justify-center gap-2 pb-6">
                {tabs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeIndex
                        ? "w-6 bg-[#0b4fff]"
                        : "w-1.5 bg-[#d8dade]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Small animated underline shown beneath the active tab
function motionUnderline() {
  return (
    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0b4fff] rounded-full" />
  );
}
