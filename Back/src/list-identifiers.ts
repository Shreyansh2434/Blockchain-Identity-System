import { getAgent } from './veramo/setup.js';

async function main() {
  const agent = await getAgent();
  const ids = await agent.didManagerFind();
  console.log('Identifiers:', JSON.stringify(ids, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
