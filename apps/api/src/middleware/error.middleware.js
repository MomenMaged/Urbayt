import multer from "multer";
import { ZodError } from "zod";
import { HttpError, notFound } from "../utils/errors.js";

/** Catches requests that matched no route. */
export function notFoundHandler(req, res, next) {
  next(notFound());
}

/**
 * Turns any error into a JSON response. Express 5 forwards rejected promises
 * from async handlers here automatically, so controllers can just throw.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      details: err.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })),
    });
  }

  if (err instanceof multer.MulterError) {
    const message = err.code === "LIMIT_FILE_SIZE" ? "One of the files is too large." : err.message;
    return res.status(400).json({ error: message });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }

  // PostgreSQL unique violation, e.g. a duplicate listing web address.
  if (err?.code === "23505") {
    return res.status(409).json({ error: "That value is already in use.", details: err.detail });
  }

  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
}
