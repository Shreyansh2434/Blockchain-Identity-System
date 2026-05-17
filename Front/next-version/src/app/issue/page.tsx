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
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-r from-[#00D9FF] to-[#0F7FFF] rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* HEADER */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            Issue New
            <span className="block bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] bg-clip-text text-transparent">
              Credential
            </span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Create and issue a new blockchain-verified digital credential
          </p>
        </motion.div>

        {/* FORM CARD */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-md"
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
            {/* INPUT FIELDS */}
            <div className="space-y-6">
              <FormInput
                label="Full Name"
                placeholder="Enter full name"
                value={name}
                onChange={setName}
                delay={0.3}
              />
              <FormInput
                label="SAP ID"
                placeholder="Enter SAP ID"
                value={sap}
                onChange={setSap}
                delay={0.4}
              />
              <FormInput
                label="Email Address"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={setEmail}
                delay={0.5}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className={`
                w-full mt-8 py-4 rounded-xl font-bold text-lg
                transition-all duration-300
                text-white
                ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#0F7FFF] to-[#00D9FF] hover:shadow-2xl shadow-lg"
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Processing...
                </span>
              ) : (
                <>
                  <span>✨ Generate Credential</span>
                </>
              )}
            </motion.button>

            {/* ERROR MESSAGE */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-lg bg-red-500/20 border border-red-400/50 text-red-200 text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="mt-6 p-6 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl mb-2"
                  >
                    🎉
                  </motion.div>
                  <p className="text-green-200 font-bold">
                    Credential issued successfully!
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  delay = 0,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <label className="block text-sm font-semibold text-gray-200 mb-2">
        {label}
      </label>
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-5 py-3 rounded-xl
          bg-white/95 text-gray-900
          border-2 border-transparent
          focus:border-[#0F7FFF]
          focus:outline-none focus:shadow-lg
          placeholder-gray-400
          font-medium
          transition-all duration-300
        "
      />
    </motion.div>
  );
}
