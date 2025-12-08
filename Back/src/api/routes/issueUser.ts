import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const DB_PATH = path.join(process.cwd(), "data", "database.json");

router.post("/", (req: Request, res: Response) => {
  try {
    const { name, sap, email } = req.body;

    if (!name || !sap || !email) {
      return res.json({ success: false, message: "All fields required" });
    }

    let db = [];
    if (fs.existsSync(DB_PATH)) db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
    db.push({ name, sap, email, issuedAt: new Date().toISOString() });

    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    res.json({ success: true, message: "Credential issued successfully" });

  } catch (e: any) {
    res.json({ success: false, message: e.message });
  }
});

export default router;
