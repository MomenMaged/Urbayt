import type { Listing } from "../api/types";

export function formatPrice(listing: Pick<Listing, "pricePerNight" | "currency">) {
  if (listing.pricePerNight === null) return null;
  return `${listing.pricePerNight.toLocaleString("en-US")} ${listing.currency}`;
}

export function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

/** Path of a listing's page. The original locations keep their short URLs. */
const SHORT_PATHS: Record<string, string> = {
  madinaty: "/madinaty",
  sokhna: "/sokhna",
  "cairo-festival-city": "/cfc",
};

export function listingPath(slug: string) {
  return SHORT_PATHS[slug] ?? `/listings/${slug}`;
}

export function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export const WHATSAPP_NUMBER = "201299926170";

export function whatsappLink(message = "Hello! I’d like to know more about your services.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
