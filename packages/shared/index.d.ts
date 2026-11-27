/* Types for index.js, plus the shape of the data the API sends. */

export declare const LISTING_STATUSES: readonly ["available", "coming_soon"];
export declare const GALLERY_SECTIONS: readonly ["home_carousel"];
export declare const ACCEPTED_IMAGE_TYPES: readonly string[];
export declare const PHOTO_LIMITS: {
  readonly maxFilesPerRequest: number;
  readonly maxFileMb: number;
  readonly maxSide: number;
};

export type ListingStatus = (typeof LISTING_STATUSES)[number];
export type GallerySection = (typeof GALLERY_SECTIONS)[number];

/** A photo as the API returns it. */
export interface Photo {
  id: number;
  alt: string;
  width: number | null;
  height: number | null;
  /** Path of the image file, e.g. "/api/photos/12" (the website makes it absolute). */
  url: string;
}

/** A listing as the API returns it (see apps/api/src/mappers/listing.mapper.js). */
export interface Listing {
  id: number;
  slug: string;
  title: string;
  headline: string | null;
  location: string | null;
  overview: string | null;
  locationDescription: string | null;
  pricePerNight: number | null;
  currency: string;
  status: ListingStatus;
  bedrooms: number | null;
  bathrooms: number | null;
  maxGuests: number | null;
  areaSqm: number | null;
  bookingUrl: string | null;
  amenities: string[];
  isPublished: boolean;
  sortOrder: number;
  photos: Photo[];
}

/** The editable fields of a listing, as sent to the admin API. */
export type ListingInput = Omit<Listing, "id" | "photos">;
