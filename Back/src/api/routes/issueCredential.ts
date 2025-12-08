import { Router } from "express";
import fs from "fs";
import path from "path";
import getAgent from "../../veramo/setup.js";

const router = Router();
const VERIFIED_USERS = path.join(process.cwd(), "key-data", "verifiedUsers.json");

router.post("/", async (req, res) => {
  try {
    const { name, sap, email } = req.body;

    const agent = await getAgent();
    const identifier = await agent.didManagerGetByAlias({ alias: sap });

    const credentialPayload = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential", "StudentID"],
      issuer: identifier.did,
      issuanceDate: new Date().toISOString(),
      credentialSubject: { name, sap, email }
    };

    const verifiableCredential = await agent.createVerifiableCredential({
      credential: credentialPayload,
      proofFormat: "jwt"
    });

    // store user in verified list!
    let list: any[] = [];
    if (fs.existsSync(VERIFIED_USERS)) {
      list = JSON.parse(fs.readFileSync(VERIFIED_USERS, "utf8"));
    }

    list.push({
      name,
      sap,
      email,
      issuedAt: new Date().toISOString()
    });

    fs.writeFileSync(VERIFIED_USERS, JSON.stringify(list, null, 2));

    res.json({ success: true, credential: verifiableCredential });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Credential issuance failed" });
  }
});

export default router;
