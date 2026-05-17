"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0E27] via-[#1a2f6f] to-[#001F5C]">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-20 left-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-blue-500"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 bg-cyan-400"
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-40 pb-20 max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl font-bold mb-6 text-white leading-tight">
            Seamless &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Secure Digital Credentials
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 max-w-3xl mb-12 leading-relaxed"
        >
          A blockchain-powered identity verification system to validate academic & professional records — 
          eliminating fraud and ensuring complete transparency.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 mb-20"
        >
          <Link
            href="/verify"
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Verify Certificate
          </Link>
          <Link
            href="/issue"
            className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-md"
          >
            Issue New
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {[
            { icon: "🔐", title: "Blockchain Secure", desc: "Immutable & transparent credentials" },
            { icon: "⚡", title: "Instant Verification", desc: "Real-time certificate validation" },
            { icon: "🌍", title: "Globally Trusted", desc: "Decentralized verification system" },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              className="p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300"
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
