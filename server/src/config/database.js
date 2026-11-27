import pg from "pg";

// Read directly from the environment (not env.js) so the database scripts
// work without the web server's settings such as JWT_SECRET.
if (!process.env.DATABASE_URL) {
  throw new Error("Missing required environment variable DATABASE_URL. See server/.env.example.");
}

// Return NUMERIC columns (price, area) as JS numbers instead of strings.
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) =>
  value === null ? null : Number(value),
);

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // Most hosted Postgres providers (Supabase, Neon, Render, Railway) require SSL.
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  max: 10,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error", err);
});

/**
 * Runs `fn` inside a transaction, committing on success and rolling back on
 * error. `fn` receives a client to pass to repository methods.
 */
export async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
