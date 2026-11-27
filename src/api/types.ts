export type ListingStatus = "available" | "coming_soon";

export interface Photo {
  id: number;
  alt: string;
  width: number | null;
  height: number | null;
  /** Absolute URL, ready to use as an <img> src. */
  url: string;
}

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

export type GallerySection = "home_carousel";
