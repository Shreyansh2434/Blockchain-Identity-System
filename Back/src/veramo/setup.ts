// src/veramo/setup.ts
import { createAgent } from "@veramo/core";
import { CredentialPlugin } from "@veramo/credential-w3c";
import {
  DIDStore,
  Entities,
  KeyStore,
  PrivateKeyStore,
  migrations,
} from "@veramo/data-store";
import { DIDManager } from "@veramo/did-manager";
import { KeyDIDProvider, getDidKeyResolver } from "@veramo/did-provider-key";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import { KeyManager } from "@veramo/key-manager";
import { KeyManagementSystem, SecretBox } from "@veramo/kms-local";
import { Resolver } from "did-resolver";
import { DataSource } from "typeorm";
import "dotenv/config";
import path from "path";

// normalize secret
function normalizeSecretToString(secret?: string): string {
  if (!secret) throw new Error("KMS_SECRET_KEY missing");
  let s = secret.trim();
  while (s.toLowerCase().startsWith("0x")) s = s.slice(2);
  s = s.replace(/[^0-9a-fA-F]/g, "");
  s = s.slice(0, 64).padEnd(64, "0");
  return s.toLowerCase();
}

const DB_PATH = path.resolve("database.sqlite");

export async function getAgent(): Promise<any> {
  const secretString = normalizeSecretToString(process.env.KMS_SECRET_KEY);

  const db = new DataSource({
    type: "sqlite",
    database: DB_PATH,
    migrations,
    migrationsRun: true,
    synchronize: false,
    logging: false,
    entities: Entities,
  });

  const connection = await db.initialize();

  const agent = createAgent({
    plugins: [
      new KeyManager({
        store: new KeyStore(connection),
        kms: {
          local: new KeyManagementSystem(
            new PrivateKeyStore(connection, new SecretBox(secretString))
          ),
        },
      }),
      new DIDManager({
        store: new DIDStore(connection),
        defaultProvider: "did:key",
        providers: {
          "did:key": new KeyDIDProvider({ defaultKms: "local" }),
        },
      }),
      new DIDResolverPlugin({
        resolver: new Resolver({ ...getDidKeyResolver() }),
      }),
      new CredentialPlugin(),
    ],
  });

  return agent;
}

export default getAgent;
