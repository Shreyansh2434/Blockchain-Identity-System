import { getAgent } from './veramo/setup.js';

async function main() {
  const agent = await getAgent();

  // get or create issuer DID
  let identifiers = await agent.didManagerFind();
  if (!identifiers || identifiers.length === 0) {
    const created = await agent.didManagerCreate({ alias: 'default' });
    identifiers = [created];
  }
  const issuerDid = identifiers[0].did;
  console.log('Using issuer DID:', issuerDid);

  const rawCredential = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    issuer: { id: issuerDid },
    issuanceDate: new Date().toISOString(),
    credentialSubject: { id: 'did:web:example.com', you: 'Demo User' },
  };

  const vc = await agent.createVerifiableCredential({
    credential: rawCredential,
    proofFormat: 'jwt',
  });

  // save credential for later verification/debug
  const fs = await import('fs');
  const path = await import('path');
  const outDir = './key-data';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  fs.writeFileSync(path.join(outDir, 'credential.generated.json'), JSON.stringify(vc, null, 2), 'utf8');

  console.log('Credential created and saved to ./key-data/credential.json');
  console.log(vc);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
