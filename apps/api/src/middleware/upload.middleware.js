import multer from "multer";
import { ACCEPTED_IMAGE_TYPES, PHOTO_LIMITS } from "@urban-hive/shared";
import { badRequest } from "../utils/errors.js";

const ACCEPTED_TYPES = new Set(ACCEPTED_IMAGE_TYPES);

const MAX_FILES_PER_UPLOAD = PHOTO_LIMITS.maxFilesPerRequest;
const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB) || PHOTO_LIMITS.maxFileMb;

/** Accepts up to PHOTO_LIMITS.maxFilesPerRequest images in the multipart field "photos", kept in memory as `req.files`. */
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
