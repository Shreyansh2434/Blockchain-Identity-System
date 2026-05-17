"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Certificate {
  name: string;
  sap: string;
  email: string;
  issuedAt: string;
  issuer?: string;
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<Certificate[] | null>(null);
  const [sap, setSap] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoad = async () => {
    if (!sap.trim()) {
      setError("Please enter a SAP ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sap }),
      });

      const result = await res.json();
      if (result.success) {
        setUserData([result.data]);
      } else {
        setUserData([]);
        setError(result.message || "No certificates found");
      }
    } catch (err) {
      setError("Failed to load certificate");
      console.error(err);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-40 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-1/4 w-96 h-96 bg-gradient-to-r from-[#00D9FF] to-[#0F7FFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {/* HEADER */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            My
            <span className="block bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] bg-clip-text text-transparent">
              Certificates
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            View and manage your blockchain-verified credentials
          </p>
        </motion.div>

        {/* SEARCH SECTION */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12 justify-center"
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Enter your SAP ID..."
            value={sap}
            onChange={(e) => setSap(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLoad()}
            className="
              px-6 py-4 rounded-xl sm:w-96 w-full
              bg-white/95 text-gray-900
              border-2 border-transparent
              focus:border-[#0F7FFF]
              focus:outline-none focus:shadow-lg
              placeholder-gray-400
              font-medium
              transition-all duration-300
            "
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLoad}
            disabled={loading}
            className={`
              px-8 py-4 rounded-xl font-bold text-lg
              transition-all duration-300 text-white
              ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] hover:shadow-2xl shadow-lg"
              }
            `}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⚙️</span>
                Loading...
              </span>
            ) : (
              "Load"
            )}
          </motion.button>
        </motion.div>

        {/* ERROR STATE */}
        {error && userData?.length === 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto max-w-2xl"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-400/10 border-2 border-red-400/50 text-center">
              <div className="text-4xl mb-2">❌</div>
              <p className="text-red-200 text-lg font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* INITIAL STATE */}
        {userData === null && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto max-w-2xl"
          >
            <div
              className="
                p-12 rounded-2xl text-center
                bg-gradient-to-br from-white/15 to-white/5
                backdrop-blur-xl
                border border-white/20
              "
            >
              <div className="text-5xl mb-4">📋</div>
              <p className="text-gray-300 text-lg">
                Enter your SAP ID to load your certificate
              </p>
            </div>
          </motion.div>
        )}

        {/* CERTIFICATE DISPLAY */}
        {userData && userData.length > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto max-w-3xl"
          >
            <div
              className="
                p-10 rounded-3xl
                bg-gradient-to-br from-white/15 to-white/5
                backdrop-blur-2xl
                border border-white/25
                shadow-2xl
              "
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              >
                ✅ Certificate Details
              </motion.h2>

              <div className="space-y-6">
                <DetailCard
                  icon="👤"
                  label="Name"
                  value={userData[0].name}
                  delay={0.3}
                />
                <DetailCard
                  icon="🔑"
                  label="SAP ID"
                  value={userData[0].sap}
                  delay={0.4}
                />
                <DetailCard
                  icon="📧"
                  label="Email"
                  value={userData[0].email}
                  delay={0.5}
                />
                <DetailCard
                  icon="📅"
                  label="Issued On"
                  value={new Date(userData[0].issuedAt).toLocaleString()}
                  delay={0.6}
                />
                {userData[0].issuer && (
                  <DetailCard
                    icon="🏛️"
                    label="Issuer"
                    value={userData[0].issuer}
                    delay={0.7}
                  />
                )}
              </div>

              {/* Download hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-400/10 border border-blue-400/50 text-center"
              >
                <p className="text-blue-200 text-sm">
                  💾 Your credential is securely stored on the blockchain
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: string;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 4 }}
      className="
        p-6 rounded-2xl
        bg-gradient-to-r from-white/10 to-white/5
        border border-white/15
        hover:border-white/30
        transition-all duration-300
        cursor-pointer
        group
      "
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
          {icon}
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            {label}
          </p>
          <p className="text-xl font-bold text-white mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
