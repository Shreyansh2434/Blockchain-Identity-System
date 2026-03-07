import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";

import { getAgent } from "../veramo/setup.js";
import usersRouter from "./routes/users.js";
import verifyRouter from "./routes/verify.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // for local development
      "https://blockchain-identity-system.vercel.app", // your Vercel production URL
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

/* Ensure SQLite exists (Render deploy fix) */
const dbPath = path.resolve("database.sqlite");
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "");
  console.log("📌 Created new database.sqlite (auto)");
}

/* API Routes */
app.use("/verify", verifyRouter);
app.use("/users", usersRouter);

/* Health check route for Render */
app.get("/health", (_, res) => res.json({ status: "ok" }));

app.get("/", (_, res) => res.send("Backend running 🚀"));

/* Dynamic PORT for Render */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Backend API running on port ${PORT}`));

app.post("/issue", async (req, res) => {
  try {
    const { name, sap, email } = req.body;

    const agent = await getAgent();

    let identifiers = await agent.didManagerFind();

    if (!identifiers || identifiers.length === 0) {
      const created = await agent.didManagerCreate({
        provider: "did:key",
        alias: "issuer",
      });
      identifiers = [created];
    }

    const issuerDid = identifiers[0].did;

    const credential = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential"],
      issuer: { id: issuerDid },
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: `did:student:${sap}`,
        name,
        email,
        sap,
      },
    };

    const vc = await agent.createVerifiableCredential({
      credential,
      proofFormat: "jwt",
    });

    res.json({
      success: true,
      credential: vc,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Credential creation failed",
    });
  }
});
