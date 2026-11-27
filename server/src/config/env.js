/**
 * Settings for the web server, read once from the environment.
 * Database settings live in ./database.js so the CLI scripts can run
 * without the web server's secrets.
 */
function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable ${name}. See server/.env.example.`);
  }
  return value;
}

export const env = {
  port: Number(process.env.PORT) || 4000,
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "12h",
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};

if (env.jwtSecret.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters long.");
}
