import { z } from "zod";

export const GALLERY_SECTIONS = ["home_carousel"];

/** A positive integer id from a URL parameter. */
export const idParam = z.coerce.number().int().positive();

export const gallerySection = z.enum(GALLERY_SECTIONS);
