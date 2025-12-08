import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

const verifyRouter = Router();

verifyRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { sap } = req.body;

    if (!sap) {
      return res.status(400).json({
        success: false,
        message: "SAP ID missing",
      });
    }

    // ✅ correct path: <project>/Back/key-data/meta.json
    const metaPath = path.join(process.cwd(), "key-data", "meta.json");

    const raw = fs.readFileSync(metaPath, "utf-8");
    const users = JSON.parse(raw);

    const user = Array.isArray(users)
      ? users.find((u: any) => u.sap === sap)
      : users && users.sap === sap
      ? users
      : null;

    if (!user) {
      return res.json({
        success: false,
        message: "No certificate found for this SAP ID",
      });
    }

    return res.json({
      success: true,
      message: "Certificate Verified Successfully",
      data: {
        name: user.name,
        email: user.email,
        sap: user.sap,
        course: user.context,
        issueDate: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
});

export default verifyRouter;
