import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { adminRepository } from "../repositories/admin.repository.js";
import { HttpError, unauthorized } from "../utils/errors.js";

// A real bcrypt hash of a random string, compared against when the email is
// unknown so that response time does not reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync("urban-hive-timing-guard", 12);

export const authService = {
  /** Checks the credentials and returns a signed token for the admin. */
  async login(email, password) {
    const admin = await adminRepository.findByEmailWithPassword(email);
    const valid = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);
    if (!admin || !valid) {
      throw new HttpError(401, "Incorrect email or password.");
    }

    const token = jwt.sign({ sub: String(admin.id), email: admin.email }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });
    return { token, admin: { id: admin.id, email: admin.email } };
  },

  /** Returns the admin a token belongs to, or throws 401. */
  async verifyToken(token) {
    let payload;
    try {
      payload = jwt.verify(token, env.jwtSecret);
    } catch {
      throw unauthorized("Your session has expired. Please sign in again.");
    }

    // Confirm the admin still exists, so deleting an admin revokes their tokens.
    const admin = await adminRepository.findById(Number(payload.sub));
    if (!admin) throw unauthorized();
    return admin;
  },
};
