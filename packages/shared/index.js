/*
 * Rules the website (apps/web) and the API (apps/api) must agree on.
 * Change them here and both sides follow. The database has matching CHECK
 * constraints in apps/api/db/schema.sql; update those too when adding a
 * status or gallery section.
 */

/** A listing is either bookable now or announced as coming soon. */
export const LISTING_STATUSES = ["available", "coming_soon"];

/** Site-wide photo galleries that aren't tied to a listing. */
export const GALLERY_SECTIONS = ["home_carousel"];

/** Image formats the admin panel accepts and the API can process. */
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export const PHOTO_LIMITS = {
  /** Most photos in one upload request. */
  maxFilesPerRequest: 12,
  /** Largest single photo accepted, in MB (the API can override with MAX_UPLOAD_MB). */
  maxFileMb: 15,
  /** Photos are stored at most this many pixels on their longest side. */
  maxSide: 2400,
};
