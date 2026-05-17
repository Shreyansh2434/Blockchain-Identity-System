"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const navItems = ["Home", "Verify", "My Certificates"];
  const navLinks = ["/", "/verify", "/dashboard"];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-xl bg-gradient-to-r from-[#0A0E27]/80 via-[#1a2f6f]/70 to-[#001F5C]/80
        border-b border-white/20
        shadow-2xl
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6">
        {/* LOGO / TITLE */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="cursor-pointer"
        >
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] bg-clip-text text-transparent">
              Digital
            </span>
            <span className="ml-2 text-white">Identity</span>
          </h1>
        </motion.div>

        {/* NAV LINKS */}
        <div className="flex gap-12 text-lg">
          {navItems.map((item, index) => (
            <NavItem
              key={item}
              href={navLinks[index]}
              text={item}
            />
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

function NavItem({ href, text }: { href: string; text: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        className="
          relative group
          text-white font-medium
          transition-all duration-300
          text-base tracking-wide
          py-2
        "
      >
        <span className="relative z-10">{text}</span>
        
        {/* Animated underline */}
        <span
          className="
            absolute left-0 -bottom-1 w-0 h-1
            bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF]
            group-hover:w-full
            transition-all duration-500 ease-out
            rounded-full
          "
        />
        
        {/* Glow effect on hover */}
        <span
          className="
            absolute inset-0 opacity-0 group-hover:opacity-100
            rounded-lg transition-all duration-300
            bg-gradient-to-r from-[#0F7FFF]/0 to-[#00D9FF]/0
            group-hover:from-[#0F7FFF]/10 group-hover:to-[#00D9FF]/10
          "
        />
      </Link>
    </motion.div>
  );
}
