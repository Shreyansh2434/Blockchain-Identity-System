// src/veramo/issue-ld-credential.ts
import { getAgent } from './setup.js'
import fs from 'fs'
import path from 'path'

function findMetaPath(): string | null {
  // prefer root meta.json
  const root = path.resolve('./meta.json')
  if (fs.existsSync(root)) return root

  // prefer key-data/meta.json
  const kd = path.resolve('./key-data')
  const kdMeta = path.join(kd, 'meta.json')
  if (fs.existsSync(kdMeta)) return kdMeta

  // fallback: pick newest file that looks like meta (meta-*.json or *-meta.json)
  if (!fs.existsSync(kd)) return null
  const files = fs.readdirSync(kd)
    .filter(f => /(^meta\.json$)|(-meta\.json$)|(^meta-.*\.json$)/i.test(f))
    .map(f => ({ name: f, mtime: fs.statSync(path.join(kd, f)).mtimeMs }))
  if (!files.length) return null
  files.sort((a, b) => b.mtime - a.mtime) // newest first
  return path.join(kd, files[0].name)
}

function normalizeMeta(metaRaw: any) {
  // Accept either { selectedUser: { id, name, ... } }
  // or { id, name, sap, ... } directly
  if (!metaRaw) return null
  if (metaRaw.selectedUser && typeof metaRaw.selectedUser === 'object') return metaRaw.selectedUser
  // if meta looks like a plain user object
  const keys = Object.keys(metaRaw)
  if (keys.includes('name') && (keys.includes('id') || keys.includes('email') || keys.includes('sap'))) {
    return {
      id: metaRaw.id ?? metaRaw.email ?? metaRaw.sap ?? '',
      name: metaRaw.name,
      sap: metaRaw.sap ?? undefined,
      org: metaRaw.org ?? undefined,
      context: metaRaw.context ?? undefined,
    }
  }
  return null
}

async function issueCredentialLD() {
  const agent = await getAgent()

  const metaPath = findMetaPath()
  if (!metaPath) {
    console.error('❌ No meta.json found (root or ./key-data). Run key-generator/key-reader or create meta.json first.')
    process.exit(1)
  }

  const metaRaw = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
  const selectedUser = normalizeMeta(metaRaw)
  if (!selectedUser || !selectedUser.name || !selectedUser.id) {
    console.error('❌ Invalid meta.json structure. Expected selectedUser:{ id, name } or a user object with name+id/email/sap')
    console.error('meta file used:', metaPath)
    process.exit(1)
  }

  // ensure issuer DID exists (create default if none)
  let identifiers = await agent.didManagerFind()
  if (!identifiers || identifiers.length === 0) {
    console.log('No DIDs found — creating a new one (default provider)...')
    const created = await agent.didManagerCreate({ alias: 'default' })
    identifiers = [created]
  }
  const issuerDid = identifiers[0].did
  console.log('Using issuer DID:', issuerDid)

  // build credential subject
  const ctx = selectedUser.context ?? 'https://myupes-beta.upes.ac.in/connectportal/user/student/collaboration/studentprofile'
  const org = selectedUser.org ?? 'UPES'
  const subjectId = `did:example:${selectedUser.id}`

  const credential = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://w3id.org/security/suites/ed25519-2018/v1',
      ctx,
    ],
    id: `urn:uuid:${(Math.random().toString(36).slice(2, 10))}`,
    type: ['VerifiableCredential', 'StudentCredential'],
    issuer: { id: issuerDid },
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: subjectId,
      name: selectedUser.name,
      sap: selectedUser.sap ?? undefined,
      org,
    },
  }

  // sign the credential via whichever LD API is present
  let verifiableCredential: any = null
  try {
    // prefer explicit LD helper if plugin exposes it
    if (typeof (agent as any).createVerifiableCredentialLD === 'function') {
      verifiableCredential = await (agent as any).createVerifiableCredentialLD({
        credential,
        proofFormat: 'lds',
      })
    } else {
      // fallback to standard createVerifiableCredential with proofFormat 'lds'
      verifiableCredential = await (agent as any).createVerifiableCredential({
        credential,
        proofFormat: 'lds',
      })
    }
  } catch (err: any) {
    console.error('❌ Failed to create LD credential:', err?.message ?? err)
    console.error('Make sure you have configured the CredentialIssuerLD plugin and LD suites in setup.ts')
    process.exit(1)
  }

  // write output
  const outDir = path.resolve('./key-data')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'credential.json')
  fs.writeFileSync(outPath, JSON.stringify(verifiableCredential, null, 2), 'utf8')

  console.log(`✅ LD credential issued for ${selectedUser.name}`)
  console.log(`🪪 Saved to: ${outPath}`)
}

issueCredentialLD().catch(e => {
  console.error('Fatal error issuing LD credential:', e?.message ?? e)
  process.exit(1)
})
