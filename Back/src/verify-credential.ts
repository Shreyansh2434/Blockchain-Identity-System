// src/verify-credential.ts
import fs from 'fs'
import path from 'path'
import { getAgent } from './veramo/setup.js' // named export

type AnyObj = { [k: string]: any }

function detectProofFormat(credential: AnyObj): 'lds' | 'jwt' | null {
  if (!credential || typeof credential !== 'object') return null
  // JWT proof usually is a compact JWT string or has proof.jwt
  if (typeof credential === 'string') return 'jwt'
  if (credential.proof) {
    // linked-data proof: proof object or array with LD proof types
    const p = credential.proof
    const proofs = Array.isArray(p) ? p : [p]
    for (const pr of proofs) {
      if (pr && typeof pr === 'object' && pr.type && typeof pr.type === 'string') {
        // Ed25519Signature2018 or other LD types → lds
        if (pr.type.includes('Ed25519') || pr.type.includes('LinkedDataSignature') || pr.type.includes('Proof')) {
          return 'lds'
        }
      }
      // If JWT inside proof (proof.jwt) -> jwt
      if (pr && typeof pr === 'object' && pr.jwt) return 'jwt'
    }
  }
  // sometimes VC encoded as { proof: { type: 'JwtProof2020', jwt: '...' } }
  if (credential.proof?.jwt) return 'jwt'
  // fallback: if credential has a top-level 'jwt' string property
  if (credential.jwt) return 'jwt'
  return null
}

async function main() {
  const agent = await getAgent()

  const arg = process.argv[2]
  const filePath = arg ? arg : path.join('./key-data', 'credential.json')

  if (!fs.existsSync(filePath)) {
    console.error(`Credential file not found: ${filePath}`)
    process.exit(1)
  }

  const credential = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  // auto-detect proof format; prefer LD if present
  const detected = detectProofFormat(credential)
  const tried: string[] = []

  // helper to try verification with a given format
  async function tryVerify(format: 'lds' | 'jwt') {
    tried.push(format)
    try {
      const result = await agent.verifyCredential({ credential, proofFormat: format as any })
      return result
    } catch (err: any) {
      return { verified: false, error: err?.message ?? err }
    }
  }

  // If detected format, try that first; otherwise try LD then JWT
  let result: any = { verified: false, error: 'not attempted' }

  if (detected === 'lds') {
    result = await tryVerify('lds')
    if (!result?.verified) {
      // fallback to jwt just in case
      result = await tryVerify('jwt')
    }
  } else if (detected === 'jwt') {
    result = await tryVerify('jwt')
    if (!result?.verified) {
      result = await tryVerify('lds')
    }
  } else {
    // unknown detection: try lds then jwt
    result = await tryVerify('lds')
    if (!result?.verified) result = await tryVerify('jwt')
  }

  console.log('Tried proof formats:', tried.join(', '))
  console.log('Verification result:', JSON.stringify(result, null, 2))

  if (!result?.verified) {
    console.error('Credential verification failed.')
    console.error('If this credential uses Linked Data proofs ensure @veramo/credential-ld and suites are installed and the agent created with CredentialIssuerLD (see setup.ts).')
    process.exit(1)
  }
}

main().catch((e) => {
  console.error('Fatal error while verifying credential:', (e as Error).message ?? e)
  process.exit(1)
})
