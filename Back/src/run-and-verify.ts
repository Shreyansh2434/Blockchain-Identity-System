// src/run-and-verify.ts
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { stdin as input, stdout as output } from 'process';
import readline from 'readline/promises';

const KEY_DIR = path.resolve('./key-data');

function collectMetaPaths(): string[] {
  if (!fs.existsSync(KEY_DIR)) return [];
  return fs
    .readdirSync(KEY_DIR)
    .filter((f) =>
      f.toLowerCase().endsWith('-meta.json') ||
      f.toLowerCase() === 'meta.json' ||
      (f.toLowerCase().startsWith('meta-') && f.toLowerCase().endsWith('.json'))
    )
    .map((f) => path.join(KEY_DIR, f));
}

function readMetaObjects(metaPath: string): any[] {
  try {
    const raw = fs.readFileSync(metaPath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [];
  }
}

function deriveSecretHex(meta: any): string {
  const name = meta.name || '';
  const id = meta.id || meta.email || '';
  const sap = meta.sap || '';
  const org = meta.org || 'UPES';
  const context =
    meta.context ||
    'https://myupes-beta.upes.ac.in/connectportal/user/student/collaboration/studentprofile';
  const inputString = `${name}|${id}|${sap}|${org}|${context}`;
  const key = crypto.scryptSync(inputString, 'fixed-salt-for-demo', 32);
  return key.toString('hex'); // return raw 64-hex chars (no 0x)
}

function base64urlToBuffer(s: string): Buffer {
  let tmp = s.replace(/-/g, '+').replace(/_/g, '/');
  while (tmp.length % 4) tmp += '=';
  return Buffer.from(tmp, 'base64');
}

function normalizeSecretTo0x(secret: unknown): string {
  if (!secret && secret !== '') throw new Error('Missing secret');
  let s = String(secret).trim();

  // remove surrounding quotes if any
  s = s.replace(/^"+|"+$/g, '');

  // collapse leading 0x sequences -> single 0x
  s = s.replace(/^0x+/i, '0x');

  // if starts with 0x
  if (s.toLowerCase().startsWith('0x')) {
    const rem = s.slice(2);
    // rem is hex?
    if (/^[0-9a-fA-F]+$/.test(rem)) {
      const hex = rem.slice(0, 64).padEnd(64, '0').toLowerCase();
      return  hex;
    }
    // rem might be base64url -> decode then use first 32 bytes
    try {
      const buf = base64urlToBuffer(rem);
      const hex = buf.slice(0, 32).toString('hex').padEnd(64, '0');
      return  hex;
    } catch { /* fallthrough */ }
    // fallback: sha256 of rem
    const fallback = crypto.createHash('sha256').update(rem).digest('hex');
    return  fallback;
  }

  // if pure hex without 0x
  if (/^[0-9a-fA-F]+$/.test(s)) {
    const hex = s.slice(0, 64).padEnd(64, '0').toLowerCase();
    return hex;
  }

  // if base64url-looking
  if (/^[A-Za-z0-9\-_]+$/.test(s)) {
    try {
      const buf = base64urlToBuffer(s);
      const hex = buf.slice(0, 32).toString('hex').padEnd(64, '0');
      return  hex;
    } catch { /* fallthrough */ }
  }

  // last resort: derive 32 bytes via sha256
  const digest = crypto.createHash('sha256').update(s).digest('hex');
  return  digest;
}

async function chooseUser(): Promise<{ meta: any; source: string }> {
  const metaPaths = collectMetaPaths();
  if (metaPaths.length === 0) {
    console.error('❌ No meta files found in ./key-data. Run key-generator.mjs first.');
    process.exit(1);
  }

  const users: { meta: any; source: string }[] = [];
  for (const p of metaPaths) {
    const objs = readMetaObjects(p);
    for (const obj of objs) {
      const metaObj = obj.selectedUser ?? obj;
      users.push({ meta: metaObj, source: p });
    }
  }

  if (users.length === 0) {
    console.error('❌ No valid user objects found in meta files.');
    process.exit(1);
  }

  console.log('\nAvailable users:\n');
  users.forEach((u, i) => {
    const display = u.meta.name || u.meta.id || `User-${i + 1}`;
    console.log(`  ${i + 1}: ${display}`);
  });

  const rl = readline.createInterface({ input, output });
  const choiceStr = await rl.question(`\nSelect user by number (1-${users.length}): `);
  rl.close();

  const idx = parseInt(choiceStr, 10) - 1;
  if (isNaN(idx) || idx < 0 || idx >= users.length) {
    console.error('❌ Invalid selection.');
    process.exit(1);
  }

  const chosen = users[idx];
  console.log(`\nSelected: ${chosen.meta.name || chosen.meta.id} -> ${chosen.source}\n`);
  return chosen;
}

async function main() {
  const { meta } = await chooseUser();

  // pick secret: prefer stored hex fields, then derive
  let rawSecret =
    meta.secretKeyHex ?? meta.secretKey ?? meta.kmsSecretKey ?? meta.privateSecret ?? null;

  if (!rawSecret) {
    // derive raw 64-hex (no 0x)
    rawSecret = deriveSecretHex(meta);
  }

  // normalize to  64 hex chars
  const normalized = normalizeSecretTo0x(rawSecret);
  process.env.KMS_SECRET_KEY = normalized;
  console.log(`✅ Derived KMS_SECRET_KEY for session: ${normalized.slice(0, 12)}...`);

  // dynamic import AFTER env is set
  const mod: any = await import('./veramo/setup.js');
  const getAgent =
    typeof mod === 'function'
      ? mod
      : mod.getAgent ?? mod.default ?? mod.init ?? null;

  if (typeof getAgent !== 'function') {
    console.error('❌ getAgent() not found in veramo/setup.js. Ensure it exports properly.');
    process.exit(1);
  }

  const agent = await getAgent();
  await new Promise((r) => setTimeout(r, 300));

  let identifiers = await agent.didManagerFind();
  if (!identifiers || identifiers.length === 0) {
    console.log('No DIDs found — creating a new one (default provider)...');
    const created = await agent.didManagerCreate({ alias: 'default' });
    identifiers = [created];
  }

  const issuerDid = identifiers[0].did;
  console.log('✅ Using issuer DID:', issuerDid);

  const rawCredential = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    issuer: { id: issuerDid },
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: meta.id || 'did:web:example.com',
      name: meta.name || 'Demo User'
    }
  };

  const vc = await agent.createVerifiableCredential({
    credential: rawCredential,
    proofFormat: 'jwt'
  });

  const outPath = path.join(KEY_DIR, 'credential.generated.json');
  fs.writeFileSync(outPath, JSON.stringify(vc, null, 2), 'utf8');
  console.log(`✅ Credential issued and saved to: ${outPath}\n`);

  const verifyResult = await agent.verifyCredential({
    credential: vc,
    proofFormat: 'jwt'
  });
  console.log('==== VERIFICATION RESULT ====');
  console.log(JSON.stringify(verifyResult, null, 2));

  try {
    const resolved = await agent.resolveDid({ didUrl: issuerDid });
    console.log('\n==== RESOLVED ISSUER DID DOCUMENT ====');
    console.log(JSON.stringify(resolved, null, 2));
  } catch (err) {
    console.error('Error resolving DID:', err);
  }

  console.log('\n🎉 Demo finished successfully.');
}

main().catch((e) => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});
