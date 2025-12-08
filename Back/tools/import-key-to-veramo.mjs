#!/usr/bin/env node
// tools/import-key-to-veramo.mjs
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node tools/import-key-to-veramo.mjs <path-to-private.jwk.json>');
  process.exit(1);
}
const jwkPath = path.resolve(args[0]);
if (!fs.existsSync(jwkPath)) { console.error('file not found:', jwkPath); process.exit(1); }
const jwk = JSON.parse(fs.readFileSync(jwkPath, 'utf8'));
console.log('JWK loaded. To import, use the compiled import script bundled in /dist (key-manager import action).');
// For safety this script only validates and shows shape:
console.log(JSON.stringify(jwk, null, 2));
console.log('\nIf you want automatic import into Veramo, run the compiled import routine with KMS_SECRET_KEY set.');
