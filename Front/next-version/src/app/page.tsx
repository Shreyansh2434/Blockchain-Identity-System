"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-gradient-to-br from-[#0F1E66] via-[#13206E] to-[#0A1442] pt-32">

      {/* 🔥 3D Animated Background */}
      <Canvas className="absolute inset-0 z-0">
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Sphere args={[1.6, 128, 128]} scale={2.4}>
          <MeshDistortMaterial distort={0.35} speed={2} color="#3949FF" />
        </Sphere>
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-28">

        {/* HERO TEXT */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-extrabold leading-tight"
        >
          Seamless & Secure <span className="text-[#7AA7FF]">Digital Credentials</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-3xl mt-6 text-lg text-gray-200"
        >
          A blockchain-powered identity verification system to validate academic & professional records —
          eliminating fraud and ensuring complete transparency.
        </motion.p>

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex gap-6 mt-10"
        >
          <Link
            href="/verify"
            className="px-8 py-4 text-lg bg-blue-500 hover:bg-blue-600 rounded-xl shadow-md transition transform hover:scale-105"
          >
            Verify Certificate
          </Link>
          <Link
            href="/issue"
            className="px-8 py-4 text-lg bg-gray-200 text-blue-900 font-semibold hover:bg-white rounded-xl shadow-md transition transform hover:scale-105"
          >
            Issue New
          </Link>
        </motion.div>

        {/* TEAM / PARTNERS
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="mt-32 w-full max-w-4xl bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-8">Team / Partners</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-lg font-semibold">
            <div className="p-4 bg-white/10 rounded-xl">Shreyansh Rathaur</div>
            <div className="p-4 bg-white/10 rounded-xl">Aakash Yadav</div>
            <div className="p-4 bg-white/10 rounded-xl">Rudraksh Rohilla</div>
            <div className="p-4 bg-white/10 rounded-xl">Aakarshan Tyagi</div>
            <div className="p-4 bg-white/10 rounded-xl">Shreya Sengar</div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
