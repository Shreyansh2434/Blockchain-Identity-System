<div align="center">

<br/>

# 🔐 Blockchain Identity System

### _Self-Sovereign Identity • Verifiable Credentials • Tamper-Proof Trust_

<br/>

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-VERCEL-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://blockchain-identity-system.vercel.app)
[![Backend API](https://img.shields.io/badge/BACKEND%20API-RENDER-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://blockchain-identity-system.onrender.com)
[![GitHub](https://img.shields.io/badge/SOURCE%20CODE-GITHUB-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shreyansh2434/Blockchain-Identity-System)
[![Health Check](https://img.shields.io/badge/API%20HEALTH-STATUS-green?style=for-the-badge)](https://blockchain-identity-system.onrender.com/health)

<br/>

![Node.js](https://img.shields.io/badge/Node.js_20+-339933?style=flat-square&logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![W3C](https://img.shields.io/badge/W3C%20VC-Compliant-4B8BBE?style=flat-square)
![DID](https://img.shields.io/badge/DID-Enabled-FF6B6B?style=flat-square)
![Veramo](https://img.shields.io/badge/Veramo-Identity-0066FF?style=flat-square)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=flat-square&logo=three.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render&logoColor=black)

</div>

---

## 📌 Table of Contents

|  #  | Section                                                       |
| :-: | ------------------------------------------------------------- |
| 01  | [The Problem We Solved](#-the-problem-we-solved)              |
| 02  | [System at a Glance](#-system-at-a-glance)                    |
| 03  | [Live Deployment](#-live-deployment)                          |
| 04  | [System Architecture](#-system-architecture)                  |
| 05  | [Project Structure](#-project-structure)                      |
| 06  | [Credential & Identity Engine](#-credential--identity-engine) |
| 07  | [W3C Standards Compliance](#-w3c-standards-compliance)        |
| 08  | [Key Features](#-key-features)                                |
| 09  | [Tech Stack](#-tech-stack)                                    |
| 10  | [How It Works](#-how-it-works--end-to-end)                    |
| 11  | [Installation & Setup](#-installation--setup)                 |
| 12  | [API Endpoints](#-api-endpoints)                              |
| 13  | [Team](#-team)                                                |
| 14  | [Future Enhancements](#-future-enhancements)                  |

---

## 🚨 The Problem We Solved

> **Credential fraud costs institutions billions annually. Traditional systems are centralized, easily forged, and slow to verify.** Our solution: blockchain-anchored credentials with cryptographic proof.

|           Issue           | Traditional System     | This System                        |
| :-----------------------: | ---------------------- | ---------------------------------- |
|     **Forgery Risk**      | ⚠️ High — easy to fake | ✅ Zero — cryptographically signed |
|  **Verification Speed**   | 📅 7–14 days           | ⚡ Instant (< 1 second)            |
| **Who Controls Identity** | 🏛️ Issuing institution | 👤 The credential holder           |
|      **Portability**      | 🔒 Institution-locked  | 🌍 Portable — use anywhere         |
|        **Privacy**        | 📤 Shared with issuer  | 🔍 Selective disclosure only       |
|       **Standard**        | 🏗️ Proprietary         | 📋 W3C Verifiable Credentials      |
|     **Auditability**      | 📝 Manual checks       | ⛓️ Blockchain-immutable logs       |

---

## 📊 System at a Glance

| Attribute               | Detail                                                      |
| ----------------------- | ----------------------------------------------------------- |
| **Project Type**        | Decentralized Digital Identity & Credential Management      |
| **Credential Standard** | W3C Verifiable Credentials (VC Data Model v1.1+)            |
| **Identity Framework**  | Decentralized Identifiers (DIDs) + Veramo Agent             |
| **Blockchain Support**  | Ethereum-ready (extensible to Polygon, etc.)                |
| **Credential Types**    | Academic • Professional • Certifications • Badges           |
| **Verification Time**   | Sub-second cryptographic validation                         |
| **Storage**             | SQLite (local) + Optional blockchain anchoring              |
| **User Roles**          | Issuer (Institution) • Holder (User) • Verifier (Any party) |
| **Frontend Hosting**    | Vercel (Next.js)                                            |
| **Backend Hosting**     | Render (Node.js + Express)                                  |

---

## 🌐 Live Deployment

| Service                             | Status     | URL                                                                                                     |
| ----------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------- |
| 🌐 **Frontend** (Next.js Dashboard) | 🟢 Active  | [blockchain-identity-system.vercel.app](https://blockchain-identity-system.vercel.app)                  |
| ⚡ **Backend** (Express + Veramo)   | 🟢 Active  | [blockchain-identity-system.onrender.com](https://blockchain-identity-system.onrender.com)              |
| 🏥 **API Health Check**             | ⚡ Monitor | [`/health`](https://blockchain-identity-system.onrender.com/health)                                     |
| 📦 **Source Code**                  | GitHub     | [Shreyansh2434/Blockchain-Identity-System](https://github.com/Shreyansh2434/Blockchain-Identity-System) |

> ⚠️ **Note:** The Render free tier spins down after inactivity. First request takes 30–50 seconds. Subsequent requests are instant.

---

## 🏗 System Architecture

```
  ISSUER              HOLDER              VERIFIER
(Institution)        (User)            (Any Party)
    |                   |                   |
    v                   v                   v
    +------------------+---------------------+
    |                                        |
    |  IDENTITY AGENT LAYER (Veramo)         |
    |  - DID Resolver                        |
    |  - Credential Issuer                   |
    |  - Holder Storage                      |
    |                                        |
    +----------------+-----------------------+
                      |
        +-------------|----------+
        |             |          |
        v             v          v
    +--------+   +----------+  +----------+
    | ISSUE  |   |  HOLDER  |  | VERIFY   |
    |  API   |   | SERVICE  |  |   API    |
    +--------+   +----------+  +----------+
    | Create |   | Store    |  | Validate |
    | Sign   |   | Export   |  | Check    |
    +--------+   +----------+  +----------+
        |             |          |
        +-----------+-----------+
                    |
        +-----------v-----------+
        |                       |
        | PERSISTENCE LAYER     |
        | - SQLite DB (Local)   |
        | - Blockchain (Opt)    |
        | - Key Storage (Enc)   |
        |                       |
        +-----------+-----------+
                    |
        +-----------+-----------+
        |                       |
        v                       v
    +---------+         +-----------+
    |FRONTEND |         | REST API  |
    | (Next)  |         | (Express) |
    +---------+         +-----------+
    | Vercel  |         | Render    |
    +---------+         +-----------+
```

---

## 📁 Project Structure

```
Blockchain-Identity-System/
│
├── 📂 Front/
│   └── 📂 next-version/           React + Next.js frontend
│       ├── 📂 pages/
│       │   ├── 📄 issue.tsx       Credential issuer panel
│       │   ├── 📄 hold.tsx        Credential holder dashboard
│       │   ├── 📄 verify.tsx      Verification interface
│       │   └── 📄 index.tsx       3D animated homepage
│       ├── 📂 components/
│       │   ├── 📄 IssuanceForm.tsx
│       │   ├── 📄 HolderWallet.tsx
│       │   ├── 📄 VerifyWidget.tsx
│       │   ├── 📄 3DScene.tsx
│       │   └── 📄 NavBar.tsx
│       ├── 📂 styles/
│       │   └── 📄 globals.css     Tailwind + custom styling
│       └── 📄 package.json
│
├── 📂 Back/                        Node.js + Express backend
│   ├── 📂 src/
│   │   ├── 📂 agent/
│   │   │   ├── 📄 veramo-agent.ts
│   │   │   ├── 📄 agent-config.ts
│   │   │   └── 📄 agent-factory.ts
│   │   ├── 📂 api/
│   │   │   ├── 📄 vcRouter.ts
│   │   │   ├── 📄 didRouter.ts
│   │   │   ├── 📄 holderRouter.ts
│   │   │   └── 📄 healthRouter.ts
│   │   ├── 📂 services/
│   │   │   ├── 📄 vcService.ts
│   │   │   ├── 📄 verifyService.ts
│   │   │   ├── 📄 holderService.ts
│   │   │   └── 📄 didService.ts
│   │   ├── 📂 middleware/
│   │   │   ├── 📄 auth.ts
│   │   │   └── 📄 errorHandler.ts
│   │   ├── 📂 types/
│   │   │   ├── 📄 credential.ts
│   │   │   └── 📄 did.ts
│   │   ├── 📂 database/
│   │   │   ├── 📄 db.ts
│   │   │   ├── 📄 schema.sql
│   │   │   └── 📂 migrations/
│   │   ├── 📂 utils/
│   │   │   ├── 📄 logger.ts
│   │   │   ├── 📄 validators.ts
│   │   │   └── 📄 crypto.ts
│   │   └── 📄 index.ts             Express app entry
│   ├── 📄 package.json
│   └── 📄 tsconfig.json
│
├── 📂 key-data/                    Stored verifiable credentials & DIDs
│   ├── 📂 credentials/
│   │   └── 📄 [credential-id].json
│   ├── 📂 dids/
│   │   └── 📄 [did-id].json
│   └── 📂 keys/
│       └── 📄 [key-id].json (encrypted)
│
├── 📄 .env.example
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 README.md
```

---

## 🤖 Credential & Identity Engine

The system deploys a **three-layer credential architecture** powered by Veramo:

### Layer 1 — DID (Decentralized Identifier)

| Property           | Detail                                                   |
| ------------------ | -------------------------------------------------------- |
| **Standard**       | W3C DID Core Specification                               |
| **Format**         | `did:ethr:0x...` (Ethereum) • Extensible to other chains |
| **Resolution**     | Universal Resolver compatible                            |
| **Key Management** | Hierarchical deterministic key derivation                |
| **Backup**         | Exportable seed phrases for key recovery                 |

### Layer 2 — Verifiable Credentials (VC)

| Property       | Detail                               |
| -------------- | ------------------------------------ |
| **Standard**   | W3C VC Data Model 1.1                |
| **Signature**  | EdDSA / ECDSA cryptographic signing  |
| **Claims**     | Extensible JSON-LD context           |
| **Proof**      | LinkedDataProof with timestamp       |
| **Revocation** | Optional revocation registry support |

### Layer 3 — Selective Disclosure

| Property         | Detail                                          |
| ---------------- | ----------------------------------------------- |
| **Privacy**      | Users choose which claims to reveal             |
| **Use Case**     | Prove qualification without exposing birth date |
| **Verification** | Cryptographic ZK-style proofs                   |
| **Granularity**  | Claim-level disclosure control                  |

### Supporting Infrastructure

| Component          | Purpose                                  |
| ------------------ | ---------------------------------------- |
| **Veramo Agent**   | Universal identity orchestrator          |
| **SQLite Store**   | Persistent credential & key storage      |
| **Key Management** | Hardware-backed signing (optional)       |
| **DID Registry**   | Blockchain anchoring for non-repudiation |

---

## 📋 W3C Standards Compliance

| Standard                  | Implementation            | Status            |
| ------------------------- | ------------------------- | ----------------- |
| **W3C DID Core**          | Decentralized Identifiers | ✅ Full Support   |
| **W3C VC Data Model**     | Verifiable Credentials    | ✅ Full Support   |
| **Linked Data Proofs**    | Cryptographic signing     | ✅ Implemented    |
| **JSON-LD**               | Data model serialization  | ✅ Enabled        |
| **Presentation Exchange** | VP request/response       | 🔄 In Development |

---

## ✨ Key Features

| Feature                        | Description                                                             |
| ------------------------------ | ----------------------------------------------------------------------- |
| 🎓 **Issue Credentials**       | Institutions create tamper-proof, cryptographically signed certificates |
| 👤 **Self-Sovereign Identity** | Users own & control their credentials — not locked to institutions      |
| ✔️ **Instant Verification**    | Anyone can verify credentials in < 1 second without calling issuer      |
| 🔐 **Cryptographic Security**  | EdDSA/ECDSA signatures prove authenticity & integrity                   |
| 📱 **Portable Credentials**    | Export credentials as JSON — use anywhere, anytime                      |
| 🎨 **Interactive 3D UI**       | Three.js powered animations & immersive UX                              |
| 🔑 **Key Management**          | Hierarchical deterministic key derivation with seed-phrase backup       |
| 📊 **Audit Trail**             | Blockchain-immutable log of credential issuance & verification          |
| 🔍 **Selective Disclosure**    | Reveal only relevant claims — keep sensitive data private               |
| 🛡️ **Role-Based Access**       | Issuer • Holder • Verifier — granular permissions                       |
| 📲 **Responsive Design**       | Mobile-first UI with Tailwind CSS                                       |
| 🌍 **Multi-Chain Ready**       | Architecture supports Ethereum, Polygon, and custom DIDs                |

---

## 🛠 Tech Stack

| Layer                   | Technology            | Purpose                          |
| ----------------------- | --------------------- | -------------------------------- |
| **Language**            | TypeScript            | Type-safe backend & frontend     |
| **Frontend Framework**  | Next.js 14+           | SSR • optimization • routing     |
| **Styling**             | Tailwind CSS          | Utility-first responsive design  |
| **Animation**           | Framer Motion         | Fluid component transitions      |
| **3D Graphics**         | Three.js              | Interactive 3D homepage scene    |
| **Backend Framework**   | Express.js            | Lightweight REST API             |
| **Identity Agent**      | Veramo                | W3C DID/VC orchestration         |
| **Credential Standard** | W3C VC                | Industry-standard format         |
| **DID Method**          | ethr-did              | Ethereum-anchored identifiers    |
| **Cryptography**        | libsodium • node-jose | Signing & encryption             |
| **Database**            | SQLite                | Persistent local storage         |
| **ORM**                 | Better-sqlite3        | Synchronous database access      |
| **API Documentation**   | Swagger/OpenAPI       | Auto-generated API docs          |
| **Frontend Hosting**    | Vercel                | Edge deployment & caching        |
| **Backend Hosting**     | Render                | Containerized Node.js deployment |
| **Environment**         | dotenv                | Secure configuration management  |

---

## 🔄 How It Works — End to End

### 👨‍🎓 Issuance Flow (Institution → Credential)

| Step  | Module             | Action                                          |
| :---: | ------------------ | ----------------------------------------------- |
| **1** | `IssuanceForm.tsx` | Institution fills credential template           |
| **2** | `POST /vc/issue`   | Frontend sends request to backend API           |
| **3** | `vcService.ts`     | Backend validates issuer identity               |
| **4** | `veramo-agent.ts`  | Agent creates VC object with claims & proof     |
| **5** | `crypto utilities` | EdDSA signature signs credential + timestamp    |
| **6** | `SQLite`           | Credential stored with issuer's DID & signature |
| **7** | `Response`         | Signed VC returned as JSON                      |

### 🎒 Holding & Export (User → Wallet)

| Step  | Module             | Action                                        |
| :---: | ------------------ | --------------------------------------------- |
| **1** | `HolderWallet.tsx` | User imports credential or receives via email |
| **2** | `holderService.ts` | Backend verifies signature before accepting   |
| **3** | `SQLite`           | Credential stored in user's encrypted store   |
| **4** | `Export Button`    | User exports as JSON or generates QR code     |
| **5** | `Backup`           | Optional seed phrase generation               |

### ✅ Verification Flow (Anyone → Proof)

| Step  | Module              | Action                                             |
| :---: | ------------------- | -------------------------------------------------- |
| **1** | `VerifyWidget.tsx`  | Verifier uploads/scans credential file             |
| **2** | `POST /vc/verify`   | Frontend sends credential to verification endpoint |
| **3** | `verifyService.ts`  | Backend extracts signature & issuer DID            |
| **4** | `veramo-agent.ts`   | Agent resolves issuer DID → public key             |
| **5** | `Crypto validation` | Signature verified against credential data         |
| **6** | `Response`          | Returns: ✅ VALID or ❌ INVALID                    |
| **7** | `Dashboard`         | Verifier sees issuer, type, date, expiration       |

---

## 🚀 Installation & Setup

### Prerequisites

| Tool        | Version   | Purpose            |
| ----------- | --------- | ------------------ |
| Node.js     | 18.x–20.x | JavaScript runtime |
| npm or yarn | Latest    | Package manager    |
| Git         | Latest    | Version control    |

### Clone Repository

```bash
git clone https://github.com/Shreyansh2434/Blockchain-Identity-System.git
cd Blockchain-Identity-System
```

### Backend Setup

```bash
cd Back
npm install
npm run build
npm run dev
```

**Backend runs on:**

```
http://localhost:5000
```

**API health check:**

```bash
curl http://localhost:5000/health
```

### Frontend Setup

```bash
cd Front/next-version
npm install
npm run dev
```

**Frontend runs on:**

```
http://localhost:3000
```

### Environment Configuration

Create a `.env.local` file in the `Back/` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_URL=http://localhost:5000

# Blockchain (optional for local development)
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY
PRIVATE_KEY=your_issuer_private_key

# Database
DATABASE_PATH=./key-data/credentials.db

# Logging
LOG_LEVEL=debug
```

For the frontend, create `.env.local` in `Front/next-version/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Blockchain Identity System
```

---

## 📡 API Endpoints

### Health & Status

```http
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "service": "Blockchain Identity System",
  "version": "1.0.0",
  "uptime": 3600
}
```

### Credential Issuance

```http
POST /api/vc/issue
Content-Type: application/json

{
  "issuerDid": "did:ethr:0x...",
  "subjectDid": "did:ethr:0x...",
  "credentialType": "AcademicDegree",
  "claims": {
    "name": "Alice Johnson",
    "degree": "Bachelor of Science",
    "field": "Computer Science",
    "issueDate": "2024-01-15",
    "expirationDate": "2029-01-15"
  }
}
```

**Response:**

```json
{
  "vc": {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "type": ["VerifiableCredential", "AcademicDegree"],
    "issuer": "did:ethr:0x...",
    "issuanceDate": "2024-01-15T10:30:00Z",
    "credentialSubject": {
      "id": "did:ethr:0x...",
      "degree": "Bachelor of Science"
    },
    "proof": {
      "type": "LinkedDataProof",
      "created": "2024-01-15T10:30:00Z",
      "signatureValue": "xyz..."
    }
  },
  "credentialId": "uuid-...",
  "status": "issued"
}
```

### Credential Verification

```http
POST /api/vc/verify
Content-Type: application/json

{
  "credential": { /* VC object */ }
}
```

**Response:**

```json
{
  "valid": true,
  "issuer": {
    "did": "did:ethr:0x...",
    "name": "University of Example",
    "verified": true
  },
  "credentialType": "AcademicDegree",
  "issuanceDate": "2024-01-15T10:30:00Z",
  "expirationDate": "2029-01-15T00:00:00Z",
  "signatureVerified": true,
  "proofVerified": true
}
```

### List Holder's Credentials

```http
GET /api/holder/credentials?did=did:ethr:0x...
Authorization: Bearer <token>
```

**Response:**

```json
{
  "did": "did:ethr:0x...",
  "credentials": [
    {
      "id": "uuid-...",
      "type": "AcademicDegree",
      "issuer": "did:ethr:0x...",
      "issuanceDate": "2024-01-15T10:30:00Z",
      "expirationDate": "2029-01-15T00:00:00Z"
    }
  ],
  "totalCount": 5
}
```

### DID Resolution

```http
GET /api/dids/:did
```

**Response:**

```json
{
  "@context": "https://w3id.org/did/v0.11",
  "id": "did:ethr:0x...",
  "publicKey": [
    {
      "id": "did:ethr:0x#key-1",
      "type": "EcdsaSecp256k1VerificationKey2019",
      "controller": "did:ethr:0x...",
      "publicKeyHex": "..."
    }
  ],
  "authentication": ["did:ethr:0x#key-1"],
  "assertionMethod": ["did:ethr:0x#key-1"]
}
```

### Export Credential

```http
POST /api/vc/export
Content-Type: application/json

{
  "credentialId": "uuid-...",
  "format": "json|qr|pdf"
}
```

**Response:**

```json
{
  "exportedCredential": {
    /* VC object */
  },
  "qrCode": "data:image/png;base64,...",
  "downloadUrl": "https://..."
}
```

---

## 👥 Team

| Member                | Role                       | Contributions                                              |
| --------------------- | -------------------------- | ---------------------------------------------------------- |
| **Shreyansh Rathaur** | Lead Developer & Architect | System design • Veramo integration • API architecture      |
| **Akash Yadav**       | System Designer & DevOps   | Infrastructure • Deployment pipelines • Optimization       |
| **Rudraksh Rohilla**  | Blockchain Research Lead   | DID standards • W3C VC implementation • Chain integrations |
| **Aakarshan Tyagi**   | Backend Engineer           | Express API • Credential services • Database schema        |
| **Shreya Sengar**     | Frontend & UX Engineer     | Next.js frontend • 3D animations • UI/UX design            |

---

## 🔮 Future Enhancements

| Feature                    | Status            | Timeline |
| -------------------------- | ----------------- | -------- |
| **NFT-Based Certificates** | 🔄 In Development | Q2 2026  |
| **Multi-Chain Support**    | 📋 Planned        | Q2 2026  |
| **Mobile Wallet**          | 📋 Planned        | Q3 2026  |
| **IPFS Integration**       | 🔄 Researching    | Q3 2026  |
| **Presentation Exchange**  | 📋 Planned        | Q4 2026  |
| **Revocation Registry**    | 📋 Planned        | Q1 2027  |
| **Governance Framework**   | 🔄 Designing      | Q1 2027  |
| **ZK-Proof Support**       | 📋 Planned        | Q2 2027  |

---

## 🛡️ Security & Privacy

| Aspect                   | Implementation                                        |
| ------------------------ | ----------------------------------------------------- |
| **Credential Signing**   | ✅ EdDSA/ECDSA cryptographic signatures               |
| **Key Storage**          | ✅ Encrypted local SQLite database                    |
| **DID Control**          | ✅ Only credential holder controls private keys       |
| **Data Privacy**         | ✅ Selective disclosure — users choose what to reveal |
| **Audit Trail**          | ✅ Immutable blockchain-anchored logs (optional)      |
| **Transport Security**   | ✅ HTTPS/TLS enforced in production                   |
| **No Central Authority** | ✅ Fully decentralized identity model                 |

---

## 📬 Feedback & Contribution

We welcome contributions from developers, researchers, and identity enthusiasts!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** changes: `git commit -m "Add feature"`
4. **Push** to branch: `git push origin feature/your-feature`
5. **Submit** a Pull Request

### Report Issues

Found a bug or have a suggestion?  
→ [Open an issue on GitHub](https://github.com/Shreyansh2434/Blockchain-Identity-System/issues)

---

## 📄 License

This project was developed as a **Final Year Major Project** for academic purposes at **UPES**.

---

<div align="center">

<br/>

## 🎯 Vision Statement

> **"Identity belongs to individuals — not institutions.**
>
> **This project is a step toward a world where people truly own their credentials."**

<br/>

Built with 🔐 security • 🔗 decentralization • 🎨 design • 🚀 innovation

_UPES • Final Year Major Project • 2025–2026_

<br/>

[![Try the Live Demo](https://img.shields.io/badge/Try%20the%20Live%20Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://blockchain-identity-system.vercel.app)

[![Explore the Code](https://img.shields.io/badge/Explore%20the%20Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Shreyansh2434/Blockchain-Identity-System)

<br/>

</div>
