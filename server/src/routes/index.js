import { Router } from "express";
import { pool } from "../config/database.js";
import { adminRoutes } from "./admin.routes.js";
import { authRoutes } from "./auth.routes.js";
import { publicRoutes } from "./public.routes.js";

/** Everything under /api. */
export const apiRoutes = Router();

apiRoutes.get("/health", async (req, res) => {
  await pool.query("SELECT 1");
  res.json({ ok: true });
});

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/admin", adminRoutes);
apiRoutes.use("/", publicRoutes);
