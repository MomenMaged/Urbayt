import sharp from "sharp";
import { badRequest } from "../utils/errors.js";

/**
 * Normalises an uploaded image for the web: applies the camera's rotation,
 * caps the longest side at 2400px and re-encodes as WebP. Photos straight
 * from a phone usually shrink from several MB to a few hundred KB.
 *
 * @param {{ buffer: Buffer, originalname: string }} file
 */
export async function processImage(file) {
  try {
    const { data, info } = await sharp(file.buffer)
      .rotate()
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
    return {
      data,
      mimeType: "image/webp",
      width: info.width,
      height: info.height,
      sizeBytes: info.size,
    };
  } catch {
    throw badRequest(`${file.originalname}: this file could not be read as an image.`);
  }
}

/** Turns "AS-URBAN-HIVE_bedroom-2.jpg" into "AS URBAN HIVE bedroom 2" as a starting description. */
export function altFromFilename(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 200);
}
