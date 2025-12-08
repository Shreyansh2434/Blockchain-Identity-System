import { Router } from "express";
import fs from "fs";
import path from "path";

const usersRouter = Router();

usersRouter.get("/", (_req, res) => {
  try {
    const metaPath = path.join(process.cwd(), "key-data", "meta.json");

    const raw = fs.readFileSync(metaPath, "utf-8");
    const users = JSON.parse(raw);

    return res.json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Users fetch error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load users",
    });
  }
});

export default usersRouter;
