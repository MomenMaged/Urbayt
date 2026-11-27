import { authService } from "../services/auth.service.js";
import { unauthorized } from "../utils/errors.js";

/** Lets a request through only with a valid admin bearer token; sets `req.admin`. */
export async function requireAdmin(req, res, next) {
  const [scheme, token] = (req.get("authorization") ?? "").split(" ");
  if (scheme !== "Bearer" || !token) throw unauthorized();

  req.admin = await authService.verifyToken(token);
  next();
}
