import { pool } from "../config/database.js";

export const adminRepository = {
  /** Includes the password hash; only the auth service should use this. */
  async findByEmailWithPassword(email, db = pool) {
    const { rows } = await db.query(
      "SELECT id, email, password_hash AS \"passwordHash\" FROM admins WHERE email = $1",
      [email],
    );
    return rows[0] ?? null;
  },

  async findById(id, db = pool) {
    const { rows } = await db.query("SELECT id, email FROM admins WHERE id = $1", [id]);
    return rows[0] ?? null;
  },

  /** Creates the admin, or replaces the password if the email exists. Returns true when created. */
  async upsert(email, passwordHash, db = pool) {
    const { rows } = await db.query(
      `INSERT INTO admins (email, password_hash) VALUES ($1, $2)
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
       RETURNING (xmax = 0) AS created`,
      [email, passwordHash],
    );
    return rows[0].created;
  },
};
