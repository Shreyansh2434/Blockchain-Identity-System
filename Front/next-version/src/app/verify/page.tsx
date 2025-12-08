"use client";
import { useState } from "react";

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

// ✅ Backend URL: env first, then hard-coded Render URL
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

      // If backend just woke up, retry once after 2s
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
    <div className="text-center text-white">
      <h1 className="text-4xl font-bold mt-10 mb-10">
        Verify Your Certificate
      </h1>

      <div className="flex justify-center gap-3 mb-10">
        <input
          type="text"
          placeholder="SAP ID"
          value={sap}
          onChange={(e) => setSap(e.target.value)}
          className="p-4 w-96 rounded text-black"
        />

        <button
          onClick={() => handleVerify()}
          className="bg-blue-600 hover:bg-blue-700 px-6 rounded text-white font-semibold"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {result && (
        <div
          className={`mx-auto max-w-xl p-6 rounded-xl ${
            result.success
              ? "bg-green-300 text-green-900"
              : "bg-red-300 text-red-900"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">
            {result.success ? "✔ VERIFIED" : "✖ INVALID"}
          </h2>

          {result.success ? (
            <>
              <p>
                <b>Name:</b> {result.data?.name}
              </p>
              <p>
                <b>Email:</b> {result.data?.email}
              </p>
              <p>
                <b>SAP:</b> {result.data?.sap}
              </p>
              <p>
                <b>Issued On:</b> {result.data?.issueDate}
              </p>
            </>
          ) : (
            <p>{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}
