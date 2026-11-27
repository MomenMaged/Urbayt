import { z } from "zod";
import { GALLERY_SECTIONS } from "@urban-hive/shared";

/** A positive integer id from a URL parameter. */
export const idParam = z.coerce.number().int().positive();

export const gallerySection = z.enum(GALLERY_SECTIONS);
