import { authService } from "../services/auth.service.js";
import { loginSchema } from "../validators/auth.validator.js";

export const authController = {
  async login(req, res) {
    const { email, password } = loginSchema.parse(req.body);
    res.json(await authService.login(email, password));
  },

  me(req, res) {
    res.json({ admin: req.admin });
  },
};
