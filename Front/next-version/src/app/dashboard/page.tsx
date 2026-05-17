"use client";

import { useState } from "react";
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
    <div className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-br from-[#0A0E27] via-[#1a2f6f] to-[#001F5C]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-2 text-center"
        >
          My Certificates
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-center mb-12"
        >
          View and manage your blockchain credentials
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <input
            type="text"
            placeholder="Enter your SAP ID..."
            value={sap}
            onChange={(e) => setSap(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLoad()}
            className="flex-1 px-6 py-4 rounded-xl bg-white/95 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLoad}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load"}
          </button>
        </motion.div>

        {error && userData?.length === 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-2xl bg-red-500/20 border-2 border-red-400/50 text-center"
          >
            <div className="text-4xl mb-2">❌</div>
            <p className="text-red-200 text-lg font-medium">{error}</p>
          </motion.div>
        )}

        {userData === null && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-center"
          >
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-300 text-lg">Enter your SAP ID to load your certificate</p>
          </motion.div>
        )}

        {userData && userData.length > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">✅ Certificate Details</h2>

            <div className="space-y-6">
              <CertificateRow icon="👤" label="Name" value={userData[0].name} />
              <CertificateRow icon="🔑" label="SAP ID" value={userData[0].sap} />
              <CertificateRow icon="📧" label="Email" value={userData[0].email} />
              <CertificateRow
                icon="📅"
                label="Issued On"
                value={new Date(userData[0].issuedAt).toLocaleString()}
              />
              {userData[0].issuer && (
                <CertificateRow icon="🏛️" label="Issuer" value={userData[0].issuer} />
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 rounded-lg bg-blue-500/20 border border-blue-400/50 text-center"
            >
              <p className="text-blue-200 text-sm">💾 Your credential is securely stored on the blockchain</p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function CertificateRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl bg-white/10 border border-white/15 hover:border-white/30 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-400 uppercase">{label}</p>
          <p className="text-xl font-bold text-white mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
