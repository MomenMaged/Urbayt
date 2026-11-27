import { ApiError, request, resolveListing, resolvePhoto } from "./client";
import type { GallerySection, Listing, Photo } from "./types";
import { FALLBACK_HOME_CAROUSEL, FALLBACK_LISTINGS } from "../data/fallback";

/** True when the API itself is unavailable, as opposed to answering "not found". */
function isUnavailable(err: unknown) {
  return err instanceof ApiError && (err.status === 0 || err.status >= 500 || err.status === 200);
}

function warnFallback(what: string, err: unknown) {
  console.warn(`[UrbanHive] Showing built-in ${what} because the API is unavailable:`, err);
}

export async function fetchListings(): Promise<Listing[]> {
  try {
    const { listings } = await request<{ listings: Listing[] }>("/api/listings");
    return listings.map(resolveListing);
  } catch (err) {
    warnFallback("listings", err);
    return FALLBACK_LISTINGS;
  }
}

/** Resolves to null when there is no published listing with that slug. */
export async function fetchListing(slug: string): Promise<Listing | null> {
  try {
    const { listing } = await request<{ listing: Listing }>(
      `/api/listings/${encodeURIComponent(slug)}`,
    );
    return resolveListing(listing);
  } catch (err) {
    if (!isUnavailable(err)) return null;
    warnFallback("listing", err);
    return FALLBACK_LISTINGS.find((listing) => listing.slug === slug) ?? null;
  }
}

export async function fetchGallery(section: GallerySection): Promise<Photo[]> {
  try {
    const { photos } = await request<{ photos: Photo[] }>(`/api/gallery/${section}`);
    return photos.map(resolvePhoto);
  } catch (err) {
    warnFallback("gallery", err);
    return FALLBACK_HOME_CAROUSEL;
  }
}
