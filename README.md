<div align="center"> <br/>

🔐 Blockchain Identity System
Self-Sovereign Identity · Verifiable Credentials · Tamper-Proof Trust
<br/>

<img src="https://img.shields.io/badge/LIVE DEMO-VERCEL-000000?style=for-the-badge&amp;logo=vercel&amp;logoColor=white" alt="Live Demo">

<img src="https://img.shields.io/badge/BACKEND API-RENDER-46E3B7?style=for-the-badge&amp;logo=render&amp;logoColor=black" alt="Backend API">

<img src="https://img.shields.io/badge/SOURCE CODE-GITHUB-181717?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="GitHub">

<img src="https://img.shields.io/badge/API HEALTH-STATUS-green?style=for-the-badge" alt="Health Check">

<br/>

<img src="https://img.shields.io/badge/Node.js_20+-339933?style=flat-square&amp;logo=node.js&amp;logoColor=white" alt="Node.js">

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&amp;logo=nextjs&amp;logoColor=white" alt="Next.js">

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&amp;logo=typescript&amp;logoColor=white" alt="TypeScript">

<img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&amp;logo=express&amp;logoColor=white" alt="Express">

<img src="https://img.shields.io/badge/W3C VC-Compliant-4B8BBE?style=flat-square" alt="W3C">

<img src="https://img.shields.io/badge/DID-Enabled-FF6B6B?style=flat-square" alt="DID">

<img src="https://img.shields.io/badge/Veramo-Identity Agent-0066FF?style=flat-square" alt="Veramo">

<img src="https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&amp;logo=sqlite&amp;logoColor=white" alt="SQLite">

<img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&amp;logo=tailwindcss&amp;logoColor=white" alt="Tailwind CSS">

<img src="https://img.shields.io/badge/Three.js-Interactive 3D-black?style=flat-square&amp;logo=three.js&amp;logoColor=white" alt="Three.js">

<img src="https://img.shields.io/badge/Framer Motion-Animations-0055FF?style=flat-square" alt="Framer Motion">

<img src="https://img.shields.io/badge/Deployed-Vercel-000?style=flat-square&amp;logo=vercel" alt="Vercel">

<img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&amp;logo=render&amp;logoColor=black" alt="Render">

</div>

📌 Table of Contents
#	Section
01	The Problem We Solved
02	System at a Glance
03	Live Deployment
04	System Architecture
05	Project Structure
06	Credential & Identity Engine
07	W3C Standards Compliance
08	Feature Set
09	Tech Stack
10	How It Works
11	Installation & Setup
12	API Endpoints
13	Team
🚨 The Problem We Solved
Credential fraud costs institutions billions annually. A single forged certificate destroys institutional trust. Verification takes weeks. Traditional credential systems are centralized, easily forged, and slow to verify.

Our system takes a fundamentally different approach — anchoring credentials on the blockchain with cryptographic proof:

Issue	Traditional	This System
Forgery Risk	High — easy to fake	Zero — cryptographically signed
Verification Speed	7–14 days	Instant (< 1 second)
Who Controls Identity	Issuing institution	The credential holder
Portability	Institution-locked	Portable — user carries credentials
Privacy	Shared with issuer	Selective disclosure only
Standard	Proprietary	W3C Verifiable Credentials
Auditability	Manual checks	Blockchain-immutable audit trail
📊 System at a Glance
Attribute	Detail
Project Type	Decentralized Digital Identity & Credential Management
Credential Standard	W3C Verifiable Credentials (VC Data Model v1.1+)
Identity Framework	Decentralized Identifiers (DIDs) + Veramo Agent
Blockchain Support	Ethereum-ready architecture (extensible to other chains)
Credential Types	Academic · Professional · Certifications · Badges
Verification Time	Sub-second cryptographic validation
Storage	SQLite (local) + Blockchain anchoring
User Roles	Issuer (Institution) · Holder (User) · Verifier (Any party)
Frontend	Vercel (Next.js)
Backend	Render (Node.js + Express)
Explainability	Full credential audit trail · Signature verification logs
🌐 Live Deployment
Service	Status	URL
🌐 Frontend (Next.js Dashboard)	🟢 Active	blockchain-identity-system.vercel.app
⚡ Backend (Express + Veramo)	🟢 Active	blockchain-identity-system.onrender.com
🏥 API Health	⚡ Check	/health
📦 Source Code	GitHub	github.com/Shreyansh2434/Blockchain-Identity-System
⚠️ Note: The Render free tier spins down after inactivity. The first request may take 30–50 seconds to wake the backend. Subsequent requests are instant.

🏗 System Architecture

ISSUER (Institution) ─────── HOLDER (User) ─────── VERIFIER (Any Party)        │                           │                       │        ▼                           ▼                       ▼┌─────────────────────────────────────────────────────────────────┐│             IDENTITY AGENT LAYER (Veramo)                       ││  ┌─────────────────────────────────────────────────────────┐  ││  │  DID Resolver · Credential Issuer · Holder Storage      │  ││  └─────────────────────────────────────────────────────────┘  │└─────────────────────────────────────────────────────────────────┘                          │        ┌─────────────────┼─────────────────┐        ▼                 ▼                 ▼┌──────────────┐  ┌──────────────────┐  ┌────────────────┐│  ISSUE API   │  │  HOLDER SERVICE  │  │  VERIFY API    ││  Create VC   │  │  Store Creds     │  │  Validate VC   ││  Sign & Date │  │  Export Portable │  │  Check Sig     │└──────────────┘  └──────────────────┘  └────────────────┘        │                 │                     │        └─────────────────┼─────────────────────┘                          ▼┌─────────────────────────────────────────────────────────────────┐│  PERSISTENCE LAYER                                              ││  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     ││  │   SQLite DB  │    │  Blockchain  │    │  Key Storage │     ││  │   (Local)    │    │  (Optional)  │    │  (Encrypted) │     ││  └──────────────┘    └──────────────┘    └──────────────┘     │└─────────────────────────────────────────────────────────────────┘                          │        ┌─────────────────┴─────────────────┐        ▼                                   ▼┌──────────────────┐            ┌──────────────────┐│  FRONTEND UI     │            │  REST API        ││  (Next.js)       │            │  (Express)       ││  ─ Issue Panel   │            │  ─ /vc/issue     ││  ─ Hold Panel    │            │  ─ /vc/verify    ││  ─ Verify Panel  │            │  ─ /vc/export    ││  ─ 3D Homepage   │            │  ─ /dids/*       │└──────────────────┘            └──────────────────┘       (Vercel)                    (Render)
📁 Project Structure

Blockchain-Identity-System/│├── Front/│   └── next-version/              React + Next.js frontend│       ├── pages/                 Route handlers│       │   ├── issue.tsx          Credential issuer panel│       │   ├── hold.tsx           Credential holder dashboard│       │   ├── verify.tsx         Verification interface│       │   └── index.tsx          3D animated homepage│       ├── components/│       │   ├── IssuanceForm.tsx    Create & sign credentials│       │   ├── HolderWallet.tsx    Display owned credentials│       │   ├── VerifyWidget.tsx    Scan & validate credentials│       │   ├── 3DScene.tsx         Three.js interactive scene│       │   └── NavBar.tsx          Navigation & role selector│       ├── styles/│       │   └── globals.css         Tailwind + custom styling│       └── package.json            Frontend dependencies│├── Back/                           Node.js + Express backend│   ├── src/│   │   ├── agent/│   │   │   ├── veramo-agent.ts     Veramo identity agent setup│   │   │   ├── agent-config.ts     DID resolver & storage config│   │   │   └── agent-factory.ts    Agent initialization│   │   ││   │   ├── api/│   │   │   ├── vcRouter.ts         POST /vc/issue, /vc/verify│   │   │   ├── didRouter.ts        GET /dids, /dids/:did│   │   │   ├── holderRouter.ts     GET /holder/credentials│   │   │   └── healthRouter.ts     GET /health│   │   ││   │   ├── services/│   │   │   ├── vcService.ts        Credential issuance logic│   │   │   ├── verifyService.ts    Credential verification│       │   ├── holderService.ts    User credential storage│       │   └── didService.ts       DID resolution & management│       ││       ├── middleware/│       │   ├── auth.ts             Role-based access control│       │   └── errorHandler.ts     Centralized error handling│       ││       ├── types/│       │   ├── credential.ts       VC type definitions│       │   └── did.ts              DID type definitions│       ││       ├── database/│       │   ├── db.ts               SQLite connection│       │   ├── schema.sql          Database schema│       │   └── migrations/         Schema versioning│       ││       ├── utils/│       │   ├── logger.ts           Structured logging│       │   ├── validators.ts       Input validation│       │   └── crypto.ts           Crypto utilities│       ││       └── index.ts                Express app entry│├── key-data/                       Stored verifiable credentials & DIDs│   ├── credentials/│   │   └── [credential-id].json    Issued VCs│   ├── dids/│   │   └── [did-id].json           DID documents│   └── keys/│       └── [key-id].json           Signing keys (encrypted)│├── .env.example                    Environment variable template├── package.json                    Root dependencies├── tsconfig.json                   TypeScript configuration└── README.md                       This file
🤖 Credential & Identity Engine
The system deploys a three-layer credential architecture powered by Veramo:

Layer 1 — DID (Decentralized Identifier)
Property	Detail
Standard	W3C DID Core Specification
Format	did:ethr:0x... (Ethereum) · extensible to other methods
Resolution	Universal Resolver compatible
Key Management	Hierarchical deterministic key derivation
Backup	Exportable seed phrases for key recovery
Layer 2 — Verifiable Credentials (VC)
Property	Detail
Standard	W3C VC Data Model 1.1
Signature	EdDSA / ECDSA cryptographic signing
Claims	Extensible JSON-LD context
Proof	LinkedDataProof with timestamp
Revocation	Optional revocation registry support
Layer 3 — Selective Disclosure
Property	Detail
Privacy	Users choose which claims to reveal
Use Case	Prove qualification without exposing birth date
Verification	Cryptographic ZK-style proofs
Granularity	Claim-level disclosure control
Supporting Infrastructure
Component	Purpose
Veramo Agent	Universal identity orchestrator
SQLite Store	Persistent credential & key storage
Key Management	Hardware-backed signing (optional)
DID Registry	Blockchain anchoring for non-repudiation
📋 W3C Standards Compliance
Standard	Implementation	Status
W3C DID Core	Decentralized Identifiers	✅ Full Support
W3C VC Data Model	Verifiable Credentials	✅ Full Support
Linked Data Proofs	Cryptographic signing	✅ Implemented
JSON-LD	Data model serialization	✅ Enabled
Presentation Exchange	VP request/response	🔄 In Development
✨ Feature Set
Capability	Detail
🎓 Issue Credentials	Institutions create tamper-proof, cryptographically signed certificates
👤 Self-Sovereign Identity	Users own & control their credentials — not locked to institutions
✔️ Instant Verification	Anyone can verify credentials in < 1 second without calling issuer
🔐 Cryptographic Security	EdDSA/ECDSA signatures prove authenticity & integrity
📱 Portable Credentials	Export credentials as JSON — use anywhere, anytime
🎨 Interactive 3D Homepage	Three.js powered animations & immersive UX
🔑 Key Management	Hierarchical deterministic key derivation with seed-phrase backup
📊 Audit Trail	Blockchain-immutable log of credential issuance & verification
🔍 Selective Disclosure	Reveal only relevant claims — keep sensitive data private
🛡️ Role-Based Access	Issuer · Holder · Verifier — granular permissions
📲 Responsive Design	Mobile-first UI with Tailwind CSS
🌍 Multi-Chain Ready	Architecture supports Ethereum, Polygon, and custom DIDs
🛠 Tech Stack
Layer	Technology	Purpose
Language	TypeScript	Type-safe backend & frontend
Frontend Framework	Next.js 14+	SSR · optimization · routing
Styling	Tailwind CSS	Utility-first responsive design
Animation	Framer Motion	Fluid component transitions
3D Graphics	Three.js	Interactive 3D homepage scene
Backend Framework	Express.js	Lightweight REST API
Identity Agent	Veramo	W3C DID/VC orchestration
Credential Standard	W3C VC	Industry-standard format
DID Method	ethr-did	Ethereum-anchored identifiers
Cryptography	libsodium · node-jose	Signing & encryption
Database	SQLite	Persistent local storage
ORM	Better-sqlite3	Synchronous database access
API Documentation	Swagger/OpenAPI	Auto-generated API docs
Frontend Hosting	Vercel	Edge deployment & caching
Backend Hosting	Render	Containerized Node.js deployment
Environment	dotenv	Secure configuration management
🔄 How It Works — End to End
👨‍🎓 Issuance Flow (Institution → Credential)
Step	Module	Action
1	IssuanceForm.tsx	Institution fills credential template (name, date, achievement)
2	POST /vc/issue	Frontend sends request to backend API
3	vcService.ts	Backend validates issuer identity & authorization
4	veramo-agent.ts	Agent creates VC object with claims & proof
5	crypto utilities	EdDSA signature signs entire credential + timestamp
6	SQLite	Credential stored with issuer's DID & signature
7	Response	Signed VC returned to issuer as JSON
🎒 Holding & Export (User → Wallet)
Step	Module	Action
1	HolderWallet.tsx	User imports credential or receives via email link
2	holderService.ts	Backend verifies signature before accepting into wallet
3	SQLite	Credential stored in user's encrypted local store
4	Export Button	User exports as portable JSON file or generates QR code
5	Backup	Optional seed phrase generation for key recovery
✅ Verification Flow (Anyone → Proof of Authenticity)
Step	Module	Action
1	VerifyWidget.tsx	Verifier uploads/scans credential file or DID reference
2	POST /vc/verify	Frontend sends credential to verification endpoint
3	verifyService.ts	Backend extracts signature & issuer DID
4	veramo-agent.ts	Agent resolves issuer DID → public key
5	Crypto validation	Signature verified against credential data (cryptographic proof)
6	Response	Returns: ✅ VALID or ❌ INVALID with reason
7	Dashboard	Verifier sees issuer name, credential type, issue date, expiration
🚀 Installation & Setup
Prerequisites
Tool	Version	Purpose
Node.js	18.x–20.x	JavaScript runtime
npm or yarn	Latest	Package manager
Git	Latest	Version control
Clone Repository

git clone https://github.com/Shreyansh2434/Blockchain-Identity-System.gitcd Blockchain-Identity-System
Backend Setup

cd Backnpm installnpm run buildnpm run dev
Backend runs on:


http://localhost:5000
API health check:


curl http://localhost:5000/health
Frontend Setup

cd Front/next-versionnpm installnpm run dev
Frontend runs on:


http://localhost:3000
Environment Configuration
Create a .env.local file in the Back/ directory:


# Server ConfigurationNODE_ENV=developmentPORT=5000API_URL=http://localhost:5000# Blockchain (optional for local development)ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEYPRIVATE_KEY=your_issuer_private_key# DatabaseDATABASE_PATH=./key-data/credentials.db# LoggingLOG_LEVEL=debug
For the frontend, create .env.local in Front/next-version/:


NEXT_PUBLIC_API_URL=http://localhost:5000NEXT_PUBLIC_APP_NAME=Blockchain Identity System
📡 API Endpoints
Health & Status

GET /health
Response:


{  "status": "ok",  "service": "Blockchain Identity System",  "version": "1.0.0",  "uptime": 3600}
Credential Issuance

POST /api/vc/issueContent-Type: application/json{  "issuerDid": "did:ethr:0x...",  "subjectDid": "did:ethr:0x...",  "credentialType": "AcademicDegree",  "claims": {    "name": "Alice Johnson",    "degree": "Bachelor of Science",    "field": "Computer Science",    "issueDate": "2024-01-15",    "expirationDate": "2029-01-15"  }}
Response:


{  "vc": {    "@context": ["https://www.w3.org/2018/credentials/v1"],    "type": ["VerifiableCredential", "AcademicDegree"],    "issuer": "did:ethr:0x...",    "issuanceDate": "2024-01-15T10:30:00Z",    "credentialSubject": {      "id": "did:ethr:0x...",      "degree": "Bachelor of Science"    },    "proof": {      "type": "LinkedDataProof",      "created": "2024-01-15T10:30:00Z",      "signatureValue": "xyz..."    }  },  "credentialId": "uuid-...",  "status": "issued"}
Credential Verification

POST /api/vc/verifyContent-Type: application/json{  "credential": { /* VC object */ }}
Response:


{  "valid": true,  "issuer": {    "did": "did:ethr:0x...",    "name": "University of Example",    "verified": true  },  "credentialType": "AcademicDegree",  "issuanceDate": "2024-01-15T10:30:00Z",  "expirationDate": "2029-01-15T00:00:00Z",  "signatureVerified": true,  "proofVerified": true}
List Holder's Credentials

GET /api/holder/credentials?did=did:ethr:0x...Authorization: Bearer <token>
Response:


{  "did": "did:ethr:0x...",  "credentials": [    {      "id": "uuid-...",      "type": "AcademicDegree",      "issuer": "did:ethr:0x...",      "issuanceDate": "2024-01-15T10:30:00Z",      "expirationDate": "2029-01-15T00:00:00Z"    }  ],  "totalCount": 5}
DID Resolution

GET /api/dids/:did
Response:


{  "@context": "https://w3id.org/did/v0.11",  "id": "did:ethr:0x...",  "publicKey": [    {      "id": "did:ethr:0x#key-1",      "type": "EcdsaSecp256k1VerificationKey2019",      "controller": "did:ethr:0x...",      "publicKeyHex": "..."    }  ],  "authentication": ["did:ethr:0x#key-1"],  "assertionMethod": ["did:ethr:0x#key-1"]}
Export Credential

POST /api/vc/exportContent-Type: application/json{  "credentialId": "uuid-...",  "format": "json|qr|pdf"}
Response:


{  "exportedCredential": { /* VC object */ },  "qrCode": "data:image/png;base64,...",  "downloadUrl": "https://..."}
👥 Team
Member	Role	Responsibilities
Shreyansh Rathaur	Lead Developer & Architect	System design · Veramo integration · API architecture
Akash Yadav	System Designer & DevOps	Infrastructure · deployment pipelines · system optimization
Rudraksh Rohilla	Blockchain Research Lead	DID standards · W3C VC implementation · chain integrations
Aakarshan Tyagi	Backend Engineer	Express API · credential services · database schema
Shreya Sengar	Frontend & UX Engineer	Next.js frontend · 3D animations · user experience design
🔮 Future Enhancements
Feature	Status	Timeline
NFT-Based Certificates	🔄 In Development	Q2 2026
Multi-Chain Support	📋 Planned	Q2 2026
Mobile Wallet	📋 Planned	Q3 2026
IPFS Integration	🔄 Researching	Q3 2026
Presentation Exchange	📋 Planned	Q4 2026
Revocation Registry	📋 Planned	Q1 2027
Governance Framework	🔄 Designing	Q1 2027
ZK-Proof Support	📋 Planned	Q2 2027
🛡️ Security & Privacy
Aspect	Implementation
Credential Signing	✅ EdDSA/ECDSA cryptographic signatures
Key Storage	✅ Encrypted local SQLite database
DID Control	✅ Only credential holder controls private keys
Data Privacy	✅ Selective disclosure — users choose what to reveal
Audit Trail	✅ Immutable blockchain-anchored logs (optional)
Transport Security	✅ HTTPS/TLS enforced in production
No Central Authority	✅ Fully decentralized identity model
📬 Feedback & Contribution
We welcome contributions from developers, researchers, and identity enthusiasts!

How to Contribute
Fork the repository
Create a feature branch: git checkout -b feature/your-feature
Commit changes: git commit -m "Add feature"
Push to branch: git push origin feature/your-feature
Submit a Pull Request
Report Issues
Found a bug or have a suggestion?
→ Open an issue on GitHub

📄 License
This project was developed as a Final Year Major Project for academic purposes at UPES.

<div align="center"> <br/>

🎯 Vision Statement
"Identity belongs to individuals — not institutions.

This project is a step toward a world where people truly own their credentials."

<br/>

Built with 🔐 security · 🔗 decentralization · 🎨 design · 🚀 innovation

UPES · Final Year Major Project · 2025–2026

<br/>

<img src="https://img.shields.io/badge/Try the Live Demo-000000?style=for-the-badge&amp;logo=vercel&amp;logoColor=white" alt="Try the Live Demo">

<img src="https://img.shields.io/badge/Explore the Code-181717?style=for-the-badge&amp;logo=github&amp;logoColor=white" alt="Explore the Code">

<br/> </div>
