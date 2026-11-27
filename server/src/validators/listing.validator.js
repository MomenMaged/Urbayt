import { z } from "zod";

/** Trims free text and turns "" into null. */
const optionalText = (max) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((value) => (value ? value : null));

const optionalCount = z.number().int().min(0).max(1000).nullish().transform((v) => v ?? null);
const optionalAmount = z.number().min(0).max(1e9).nullish().transform((v) => v ?? null);

const bookingUrl = z
  .union([z.url({ protocol: /^https?$/, error: "Must be a full http(s):// link" }), z.literal("")])
  .nullish()
  .transform((value) => (value ? value : null));

// Field rules without defaults. Defaults are added only for creation below:
// in Zod 4, `.partial()` keeps `.default()` values, which would make a PATCH
// of one field silently reset the others.
const fields = {
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes only"),
  title: z.string().trim().min(2).max(160),
  headline: optionalText(200),
  location: optionalText(160),
  overview: optionalText(5000),
  locationDescription: optionalText(5000),
  pricePerNight: optionalAmount,
  currency: z.string().trim().toUpperCase().length(3),
  status: z.enum(["available", "coming_soon"]),
  bedrooms: optionalCount,
  bathrooms: optionalCount,
  maxGuests: optionalCount,
  areaSqm: optionalAmount,
  bookingUrl,
  amenities: z
    .array(z.string().regex(/^[a-z0-9_]+$/, "Invalid amenity key"))
    .max(50)
    .transform((keys) => [...new Set(keys)]),
  isPublished: z.boolean(),
  sortOrder: z.number().int().min(-10000).max(10000),
};

export const createListingSchema = z.object({
  ...fields,
  currency: fields.currency.default("EGP"),
  status: fields.status.default("available"),
  amenities: fields.amenities.default([]),
  isPublished: fields.isPublished.default(true),
  sortOrder: fields.sortOrder.default(0),
});

export const updateListingSchema = z.object(fields).partial();
