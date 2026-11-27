// Creates or updates the database tables. Safe to run more than once.
import { readFile } from "node:fs/promises";
import { pool } from "../src/config/database.js";

const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");

try {
  await pool.query(schema);
  console.log("Database schema is up to date.");
} finally {
  await pool.end();
}
