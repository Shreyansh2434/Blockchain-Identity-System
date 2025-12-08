#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const META = path.join(process.cwd(), "key-data", "meta.json");
const raw = JSON.parse(fs.readFileSync(META, "utf8"));
const users = Array.isArray(raw) ? raw : [raw];

const user = users[users.length - 1]; // newest

function normalizeHex(s) {
  return ("0x" + s.replace(/^0x/i, "").slice(0, 64)).toLowerCase();
}

const secret = normalizeHex(user.secretKeyHex);
process.env.KMS_SECRET_KEY = secret;

console.log(`\n🔐 Using key for: ${user.name} (SAP ${user.sap})`);
console.log("⚙ Creating DID...\n");

const result = spawnSync("node", ["dist/create-identifier.js"], { stdio: "inherit", env: process.env });
if (result.status !== 0) console.error("❌ DID creation failed");
else console.log(`\n✔ DID created successfully for ${user.name}`);
