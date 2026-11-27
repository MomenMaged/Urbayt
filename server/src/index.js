import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { pool } from "./config/database.js";

const server = createApp().listen(env.port, () => {
  console.log(`Urban Hive API listening on http://localhost:${env.port}`);
});

function shutdown() {
  server.close(() => pool.end().then(() => process.exit(0)));
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
