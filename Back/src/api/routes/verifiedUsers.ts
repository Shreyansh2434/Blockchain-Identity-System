import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const VERIFIED_USERS = path.join(process.cwd(), "key-data", "verifiedUsers.json");

router.get("/", (req, res) => {
  if (!fs.existsSync(VERIFIED_USERS)) {
    return res.json([]);
  }
  const list = JSON.parse(fs.readFileSync(VERIFIED_USERS, "utf8"));
  return res.json(list);
});

export default router;
