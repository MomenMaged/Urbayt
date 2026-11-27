import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { apiRoutes } from "./routes/index.js";

/** Builds the Express app: security headers, CORS, JSON parsing, routes, errors. */
export function createApp() {
  const app = express();

  // Needed behind a host's proxy (Render, Railway, Fly) so rate limiting sees real client IPs.
  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.use(
    helmet({
      // Photos are served from this API but shown on the website's own domain.
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(
    cors({
      origin(origin, callback) {
        // Allow same-origin / server-to-server requests (no Origin header) and listed sites.
        callback(null, !origin || env.corsOrigins.includes(origin));
      },
    }),
  );
  app.use(express.json({ limit: "200kb" }));

  // Opening the API's address in a browser shows that it's up.
  app.get("/", (req, res) => {
    res.json({ name: "Urban Hive API", status: "ok", health: "/api/health" });
  });

  app.use("/api", apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
