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
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* HEADER */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            Verify Your
            <span className="block bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] bg-clip-text text-transparent">
              Certificate
            </span>
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
            Enter your SAP ID to authenticate your digital credential
          </p>
        </motion.div>

        {/* INPUT FORM */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 w-full max-w-2xl"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Enter your SAP ID..."
              value={sap}
              onChange={(e) => setSap(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleVerify()}
              className="
                flex-1 px-6 py-4 rounded-xl
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
              onClick={() => handleVerify()}
              disabled={loading}
              className={`
                px-8 py-4 rounded-xl font-bold text-lg
                transition-all duration-300
                ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] hover:shadow-2xl"
                }
                text-white shadow-lg
              `}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Verifying...
                </span>
              ) : (
                "Verify"
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* RESULT */}
        {result && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`
              mt-12 w-full max-w-2xl p-8 rounded-2xl
              backdrop-blur-xl border-2
              ${
                result.success
                  ? "bg-gradient-to-br from-green-500/20 to-green-400/10 border-green-400/50 shadow-2xl shadow-green-500/20"
                  : "bg-gradient-to-br from-red-500/20 to-red-400/10 border-red-400/50 shadow-2xl shadow-red-500/20"
              }
              transition-all duration-300
            `}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="text-5xl mb-4"
            >
              {result.success ? "✅" : "❌"}
            </motion.div>

            <h2
              className={`
                text-3xl font-bold mb-6
                ${result.success ? "text-green-300" : "text-red-300"}
              `}
            >
              {result.success ? "Certificate Verified" : "Verification Failed"}
            </h2>

            {result.success && result.data ? (
              <motion.div
                variants={{
                  container: { staggerChildren: 0.1 },
                  item: { opacity: 1, y: 0, initial: { opacity: 0, y: 10 } },
                }}
                initial="container"
                animate="container"
                className="space-y-4 text-left text-white"
              >
                <DetailRow label="Name" value={result.data.name} />
                <DetailRow label="Email" value={result.data.email} />
                <DetailRow label="SAP ID" value={result.data.sap} />
                <DetailRow
                  label="Issued On"
                  value={new Date(result.data.issueDate).toLocaleDateString()}
                />
              </motion.div>
            ) : (
              <p className="text-red-200 text-lg">{result.message}</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <span className="font-semibold text-gray-300">{label}:</span>
      <span className="text-white font-bold">{value}</span>
    </motion.div>
  );
}
