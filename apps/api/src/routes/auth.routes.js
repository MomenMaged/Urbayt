import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { loginRateLimit } from "../middleware/rateLimit.middleware.js";

export const authRoutes = Router();

authRoutes.post("/login", loginRateLimit, authController.login);
authRoutes.get("/me", requireAdmin, authController.me);
