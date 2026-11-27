import multer from "multer";
import { badRequest } from "../utils/errors.js";

const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

/** Must match UPLOAD_BATCH_SIZE in the website's src/admin/api.ts. */
export const MAX_FILES_PER_UPLOAD = 12;
const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB) || 15;

/** Accepts up to 12 images in the multipart field "photos", kept in memory as `req.files`. */
export const uploadPhotos = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_MB * 1024 * 1024, files: MAX_FILES_PER_UPLOAD },
  fileFilter(req, file, callback) {
    if (ACCEPTED_TYPES.has(file.mimetype)) {
      callback(null, true);
    } else {
      callback(badRequest(`${file.originalname}: only JPG, PNG, WebP, AVIF or GIF images are allowed.`));
    }
  },
}).array("photos", MAX_FILES_PER_UPLOAD);
