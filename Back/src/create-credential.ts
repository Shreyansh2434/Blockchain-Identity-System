import fs from "fs/promises";
import path from "path";
import { getAgent } from "./veramo/setup.js";

async function main() {
  try {
    const agent = await getAgent();

    // Get existing DID or create one
    let identifiers = await agent.didManagerFind();

    if (!identifiers || identifiers.length === 0) {
      const created = await agent.didManagerCreate({ alias: "default" });
      identifiers = [created];
    }

    const issuerDid = process.env.ISSUER_DID || identifiers[0].did;
    console.log("Using issuer DID:", issuerDid);

    // Subject configuration
    const subjectId = process.env.SUBJECT_DID || "did:web:example.com";
    const subjectName = process.env.SUBJECT_NAME || "Demo User";
    const proofFormat = (process.env.PROOF_FORMAT as "jwt" | "lds") || "jwt";

    const rawCredential = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential"],
      issuer: { id: issuerDid },
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: subjectId,
        name: subjectName,
      },
    };

    // Create credential
    const vc = await agent.createVerifiableCredential({
      credential: rawCredential,
      proofFormat,
    });

    if (!vc || typeof vc !== "object") {
      throw new Error("Credential creation failed");
    }

    // Save credential to file
    const outDir = process.env.KEY_DATA_DIR || "./key-data";
    const outPath = path.join(outDir, "credential.generated.json");

    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outPath, JSON.stringify(vc, null, 2), "utf8");

    console.log("Credential successfully created");
    console.log("Saved to:", outPath);

    console.log("\nCredential Output:\n");
    console.log(JSON.stringify(vc, null, 2));
  } catch (error) {
    console.error("Error creating credential:");
    console.error(error);
    process.exit(1);
  }
}

main();
