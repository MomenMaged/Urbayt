// Creates an admin account, or resets the password if the email already exists.
//
//   npm run create-admin -- you@example.com "a long password"
//
// or set ADMIN_EMAIL and ADMIN_PASSWORD in .env and run `npm run create-admin`.
import bcrypt from "bcryptjs";
import { pool } from "../src/config/database.js";
import { adminRepository } from "../src/repositories/admin.repository.js";

const email = (process.argv[2] ?? process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
const password = process.argv[3] ?? process.env.ADMIN_PASSWORD ?? "";

if (!email.includes("@") || password.length < 10) {
  console.error(
    "Usage: npm run create-admin -- <email> <password>\n" +
      "The password must be at least 10 characters.",
  );
  process.exit(1);
}

try {
  const created = await adminRepository.upsert(email, await bcrypt.hash(password, 12));
  console.log(created ? `Admin ${email} created.` : `Password updated for ${email}.`);
} finally {
  await pool.end();
}
