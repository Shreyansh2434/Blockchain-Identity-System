"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-luxury" />
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#00D9FF] to-[#0F7FFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000" />

      {/* 3D Animated Background */}
      <Canvas className="absolute inset-0 z-0 opacity-30">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <Sphere args={[1.6, 128, 128]} scale={2.4}>
          <MeshDistortMaterial
            distort={0.35}
            speed={2}
            color="#0F7FFF"
          />
        </Sphere>
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>

      {/* MAIN CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-6 pt-40 pb-20"
      >
        {/* HERO TEXT */}
        <motion.div variants={itemVariants} className="max-w-4xl">
          <motion.h1
            className="text-6xl sm:text-7xl font-extrabold leading-tight tracking-tight"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span className="block mb-2">Seamless &</span>
            <span className="block">
              <span className="bg-gradient-to-r from-[#0F7FFF] via-[#00D9FF] to-[#0F7FFF] bg-clip-text text-transparent animate-shimmer">
                Secure Digital Credentials
              </span>
            </span>
          </motion.h1>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.p
          variants={itemVariants}
          className="max-w-3xl mt-8 text-xl text-gray-200 leading-relaxed font-light"
        >
          A blockchain-powered identity verification system to validate academic & professional records — 
          <span className="block mt-2">
            <span className="text-[#00D9FF]">eliminating fraud</span> and ensuring 
            <span className="text-[#0F7FFF]"> complete transparency</span>.
          </span>
        </motion.p>

        {/* ACTION BUTTONS */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 mt-12"
        >
          <PremiumButton
            href="/verify"
            variant="primary"
            delay={0.6}
          >
            Verify Certificate
          </PremiumButton>
          <PremiumButton
            href="/issue"
            variant="secondary"
            delay={0.8}
          >
            Issue New
          </PremiumButton>
        </motion.div>

        {/* FEATURES SECTION */}
        <motion.div
          variants={itemVariants}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
        >
          {[
            { icon: "🔐", title: "Blockchain Secure", desc: "Immutable & transparent credentials" },
            { icon: "⚡", title: "Instant Verification", desc: "Real-time certificate validation" },
            { icon: "🌍", title: "Globally Trusted", desc: "Decentralized verification system" },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="
                group p-8 rounded-2xl
                bg-gradient-to-br from-white/10 to-white/5
                backdrop-blur-xl
                border border-white/20
                hover:border-white/40
                transition-all duration-500
                cursor-pointer
              "
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function PremiumButton({
  href,
  variant = "primary",
  children,
  delay = 0,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  delay?: number;
}) {
  const isPrimary = variant === "primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={`
          relative px-10 py-4 rounded-xl font-bold text-lg
          transition-all duration-300
          overflow-hidden group
          ${
            isPrimary
              ? "bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] text-white shadow-lg hover:shadow-2xl"
              : "bg-white/15 text-white border border-white/30 hover:bg-white/25 backdrop-blur-md"
          }
        `}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
          {isPrimary && (
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          )}
        </span>

        {/* Shine effect */}
        <div
          className={`
            absolute inset-0 opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            ${isPrimary ? "bg-gradient-to-r from-transparent via-white/20 to-transparent" : ""}
          `}
          style={{
            animation: "shimmer 2s infinite",
          }}
        />
      </Link>
    </motion.div>
  );
}
