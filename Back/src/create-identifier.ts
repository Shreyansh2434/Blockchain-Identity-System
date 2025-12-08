import fs from "fs";
import path from "path";
import { getAgent } from "./veramo/setup.js";

async function main() {
  const agent = await getAgent();

  const metaPath = path.resolve("key-data/meta.json");
  const metaFile = path.join(process.cwd(), "key-data", "meta.json");
  const raw = fs.readFileSync(metaFile, "utf8");
  const users = Array.isArray(raw) ? raw : [raw];

  const sap = process.env.SAP_ID;
  const user = users.find((u: any) => u.sap === sap);

  if (!user) throw new Error("User not found in meta.json");

  const identifier = await agent.didManagerCreate({
    provider: "did:key",
    alias: sap,                      // 🔥 alias fixed (unique for each user)
    kms: "local"
  });

  console.log("Created identifier:", identifier);
}
main();
