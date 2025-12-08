🚀 Blockchain Identity System
Secure • Decentralized • Verifiable Credentials

A blockchain-powered digital identity and credential management system that enables instant verification of academic & professional records — eliminating fraud and ensuring trust across institutions and organizations.

🔐 Why This Project?
Problem	Solution
Certificates are easy to forge	Verifiable digital credentials stored securely
Manual verification is slow & costly	Instant blockchain-based verification
Centralized systems risk data loss	Decentralized identity infrastructure
No universal standard	W3C Verifiable Credentials + DID method

This system empowers institutions to issue tamper-proof certificates, while users can verify their credentials anywhere in seconds.

🧠 Key Features

✨ Issue verifiable credentials for students & professionals
✨ Blockchain-anchored identity (DID based)
✨ Instant certificate verification — no back-and-forth emails
✨ Tamper-proof and fraud-resistant
✨ Modern UI with 3D animated interactive homepage
✨ Role-based dashboard (Issuer / User)
✨ Portable credentials — own your identity

🏗 System Architecture
Frontend (Next.js + Tailwind + Framer Motion + Three.js)
           ↓ REST API
Backend (Node.js + Express + TypeScript)
           ↓ Veramo Framework
DID and VC Storage → Blockchain / SQLite

🌐 Live Deployment (when hosted)
Component	Status	Link
Frontend (Vercel)	🔵 Active	—
Backend API (Render)	🔵 Active	—
API Health Check	⚡	/health
📂 Project Structure
📦 Blockchain-Identity-System
 ┣ 🗂 Front        → Next.js frontend
 ┣ 🗂 Back         → Node.js API + Veramo identity agent
 ┣ 📄 README.md
 ┗ 🔑 key-data     → Stored verifiable credentials

🧪 Local Development
▶ Start Backend
cd Back
npm install
npm run build
npm run dev


Backend runs on:

http://localhost:5000

▶ Start Frontend
cd Front/next-version
npm install
npm run dev


Frontend runs on:

http://localhost:3000

🔧 Tech Stack
Layer	Technologies
Frontend	Next.js, Tailwind CSS, Framer Motion, Three.js
Backend	Node.js, Express, TypeScript
Identity	Veramo, W3C Verifiable Credentials, DIDs
DB	SQLite
Cloud	Render (Backend), Vercel (Frontend)
🛡 Security & Privacy

✔ Certificates are cryptographically signed
✔ Personally Identifiable Data stored securely
✔ No third-party access to credentials
✔ Users own their identity — self-sovereign identity (SSI)

👥 Team / Contributors
Name	Role
Shreyansh Rathaur	Lead Developer
Aakash Yadav	System Designer
Rudraksh Rohilla	Blockchain Research
Aakarshan Tyagi	Backend & API
Shreya Sengar	UI/UX & Testing
⭐ Future Enhancements

🔹 NFT-based certificate ownership
🔹 University dashboard multi-tenant support
🔹 Mobile wallet for credentials
🔹 IPFS decentralized storage

📬 Feedback / Contribution

We welcome contributions!
Fork the repo, create a branch, and submit a pull request.

Feedback / suggestions → issues tab 👇
🔗 https://github.com/Shreyansh2434/Blockchain-Identity-System/issues

🏁 Closing Note

🔥 “Identity belongs to individuals — not institutions.
This project is a step toward a world where people truly own their credentials.”

If you like this project, ⭐ star the repository — it helps a lot!

💙 Made with passion, curiosity & code.
