"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface VerificationResult {
  success: boolean;
  message?: string;
  data?: {
    name: string;
    sap: string;
    email: string;
    issueDate: string;
  };
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://blockchain-identity-system.onrender.com";

export default function VerifyPage() {
  const [sap, setSap] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = async (retry = false) => {
    if (!sap.trim()) {
      setResult({
        success: false,
        message: "Please enter a SAP ID.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${BACKEND_URL}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sap }),
      });

      if (!res.ok && !retry) {
        await new Promise((r) => setTimeout(r, 2000));
        return handleVerify(true);
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Verify error:", err);
      setResult({
        success: false,
        message: "Cannot connect to backend. Please try again later.",
      });
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
        className="max-w-2xl mx-auto"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-2 text-center"
        >
          Verify Your Certificate
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-center mb-12"
        >
          Enter your SAP ID to verify your credential
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Enter your SAP ID..."
            value={sap}
            onChange={(e) => setSap(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleVerify()}
            className="flex-1 px-6 py-4 rounded-xl bg-white/95 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleVerify()}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </motion.div>

        {result && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-2xl backdrop-blur-xl border-2 ${
              result.success
                ? "bg-green-500/20 border-green-400/50"
                : "bg-red-500/20 border-red-400/50"
            }`}
          >
            <h2 className={`text-3xl font-bold mb-6 text-center ${result.success ? "text-green-300" : "text-red-300"}`}>
              {result.success ? "✅ Verified" : "❌ Invalid"}
            </h2>

            {result.success && result.data ? (
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white font-bold">{result.data.name}</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white font-bold">{result.data.email}</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-gray-400 text-sm">SAP ID</p>
                  <p className="text-white font-bold">{result.data.sap}</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-gray-400 text-sm">Issued On</p>
                  <p className="text-white font-bold">{new Date(result.data.issueDate).toLocaleDateString()}</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-red-200">{result.message}</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
