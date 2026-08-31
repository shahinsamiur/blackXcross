// src/components/Header.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const navLinks = [
  { name: "About", href: "/about-us" },
  { name: "Platform", href: "https://console.auxia.app/" },
  { name: "Documentation", href: "https://docs.auxia.io/" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f0efe3]/80 backdrop-blur-md border-b border-[#e2e1d3]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0b4fff] rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold tracking-tight">SardarIT</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#232323]/70 hover:text-[#232323] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/demo"
              className="px-6 py-3 bg-[#0b4fff] text-[#f0efe3] text-sm font-bold rounded-xl hover:bg-[#0b4fff] transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-[#232323]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#f0efe3] border-t border-[#e2e1d3] p-6"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-[#232323]/70 hover:text-[#232323]"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/demo"
              className="mt-4 px-5 py-2.5 bg-[#232323] text-[#f0efe3] text-sm font-medium rounded-full text-center hover:bg-[#0b4fff] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Request a demo
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
