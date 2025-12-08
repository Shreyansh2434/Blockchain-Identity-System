#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sodium from 'libsodium-wrappers';
import base64url from 'base64url';

await sodium.ready;

const [name, sap, email] = process.argv.slice(2);

if (!name || !sap || !email) {
  console.error("❌ Usage: node key-generator.mjs <name> <sap> <email>");
  process.exit(1);
}

const KEY_DIR = path.resolve("./key-data");
if (!fs.existsSync(KEY_DIR)) fs.mkdirSync(KEY_DIR, { recursive: true });

const kp = sodium.crypto_sign_keypair();
const seed = Buffer.from(kp.privateKey.subarray(0, 32));
const pub = Buffer.from(kp.publicKey);

const meta = {
  name,
  sap,
  email,
  org: "UPES",
  context: "UPES Academic Identity",
  createdAt: new Date().toISOString(),
  secretKeyHex: seed.toString("hex"),
  secretKeyBase64: base64url(seed)
};

const metaFile = path.join(KEY_DIR, "meta.json");
let arr = [];
if (fs.existsSync(metaFile)) {
  try {
    arr = JSON.parse(fs.readFileSync(metaFile, "utf8"));
    if (!Array.isArray(arr)) arr = [];
  } catch {
    arr = [];
  }
}
if (!Array.isArray(arr)) arr = [arr];

arr.push(meta);
fs.writeFileSync(metaFile, JSON.stringify(arr, null, 2));

fs.writeFileSync(path.join(KEY_DIR, "private.jwk.json"), JSON.stringify({
  kty:"OKP", crv:"Ed25519", x: base64url(pub), d: base64url(seed)
}, null, 2));

console.log(`\n✔ User Registered: ${name}`);
console.log(`🔍 SAP ID: ${sap}`);
console.log("📌 Next → Run key-runner.mjs to generate DID");
