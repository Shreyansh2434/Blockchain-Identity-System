"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function IssuePage() {
  const [name, setName] = useState("");
  const [sap, setSap] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !sap || !email) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:5000/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, sap, email }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setName("");
        setSap("");
        setEmail("");
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || "Failed to issue credential");
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error(err);
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
        className="max-w-md mx-auto"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-2 text-center"
        >
          Issue New Credential
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-center mb-12"
        >
          Create and verify new digital credentials
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/95 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">SAP ID</label>
              <input
                type="text"
                placeholder="Enter SAP ID"
                value={sap}
                onChange={(e) => setSap(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/95 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-xl bg-white/95 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Processing..." : "✨ Generate Credential"}
          </button>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-lg bg-red-500/20 border border-red-400/50 text-red-200 text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 p-6 rounded-lg bg-green-500/20 border border-green-400/50 text-center"
            >
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-green-200 font-bold">Credential issued successfully!</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
