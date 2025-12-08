// tools/key-reader.mjs (updated normalize/derive)
import base64url from "base64url";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const metaPath = path.join("./key-data", "meta.json");
if (!fs.existsSync(metaPath)) { console.error("No key-data/meta.json"); process.exit(1); }
const arr = JSON.parse(fs.readFileSync(metaPath, "utf8")) || [];

function deriveHex(meta) {
  const s = `${meta.name||''}|${meta.id||meta.email||''}|${meta.sap||''}|${meta.org||''}|${meta.context||''}`;
  const k = crypto.scryptSync(s, "fixed-salt-for-demo", 32);
  // ensure exact 32 bytes => 64 hex chars
  return "0x" + Buffer.from(k).toString("hex").padEnd(64, "0").slice(0,64);
}

arr.forEach((u, i) => {
  const hex = (u.secretKeyHex && typeof u.secretKeyHex === 'string')
    ? normalizeHexString(u.secretKeyHex)
    : deriveHex(u);
  console.log(`User ${i+1}: ${u.name || u.id || "unnamed"} -> ${hex}`);
  if (u.secretKeyBase64) console.log(`   base64url: ${u.secretKeyBase64}`);
});

// helper used by reader only (keeps file self-contained)
function normalizeHexString(raw) {
  let s = String(raw).trim();
  // remove any number of leading 0x
  while (s.toLowerCase().startsWith("0x")) s = s.slice(2);
  // if it's base64url-like, decode it
  if (/^[A-Za-z0-9\-_]+=*$/.test(s) && !/^[0-9a-fA-F]+$/.test(s)) {
    try {
      const buf = base64url.toBuffer(s);
      s = buf.toString('hex');
    } catch (e) { /* fallthrough */ }
  }
  // now s should be hex; pad/truncate to 64 chars (32 bytes)
  if (!/^[0-9a-fA-F]+$/.test(s)) {
    // fallback: derive deterministic from meta (not ideal but safe)
    const k = crypto.scryptSync(String(raw), "fixed-salt-for-demo", 32);
    s = Buffer.from(k).toString('hex');
  }
  s = s.slice(0,64).padEnd(64, '0').toLowerCase();
  return "0x" + s;
}
