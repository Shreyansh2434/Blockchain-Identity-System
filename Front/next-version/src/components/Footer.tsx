"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="
        mt-32 py-8 px-6
        bg-gradient-to-t from-[#0A0E27]/90 to-transparent
        backdrop-blur-lg
        border-t border-white/10
        text-center
      "
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-300 font-medium tracking-wide">
          © {currentYear} <span className="bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] bg-clip-text text-transparent font-bold">
            Blockchain
          </span> Identity System
        </p>
        <p className="text-gray-400 text-sm mt-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
          Secure, Transparent, and Decentralized Credential Verification
        </p>
      </motion.div>
    </motion.footer>
  );
}
