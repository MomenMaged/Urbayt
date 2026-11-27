import { ApiError, request, resolveListing, resolvePhoto } from "../api/client";
import type { GallerySection, Listing, ListingInput, Photo } from "../api/types";

const TOKEN_KEY = "uh_admin_token";
export const LOGOUT_EVENT = "uh-admin-logout";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

/** Authenticated request. An expired or invalid session signs the admin out. */
async function adminRequest<T>(path: string, options: { method?: string; body?: unknown } = {}) {
  try {
    return await request<T>(path, { ...options, token: tokenStore.get() });
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      tokenStore.clear();
      window.dispatchEvent(new Event(LOGOUT_EVENT));
    }
    throw err;
  }
}

/** Must match MAX_FILES_PER_UPLOAD on the server. */
const UPLOAD_BATCH_SIZE = 12;

async function uploadInBatches(path: string, files: File[]) {
  const uploaded: Photo[] = [];
  for (let i = 0; i < files.length; i += UPLOAD_BATCH_SIZE) {
    const body = new FormData();
    files.slice(i, i + UPLOAD_BATCH_SIZE).forEach((file) => body.append("photos", file));
    const { photos } = await adminRequest<{ photos: Photo[] }>(path, { method: "POST", body });
    uploaded.push(...photos.map(resolvePhoto));
  }
  return uploaded;
}

export const adminApi = {
  async login(email: string, password: string) {
    const result = await request<{ token: string; admin: { id: number; email: string } }>(
      "/api/auth/login",
      { method: "POST", body: { email, password } },
    );
    tokenStore.set(result.token);
    return result.admin;
  },

  async me() {
    const { admin } = await adminRequest<{ admin: { id: number; email: string } }>("/api/auth/me");
    return admin;
  },

  async listListings() {
    const { listings } = await adminRequest<{ listings: Listing[] }>("/api/admin/listings");
    return listings.map(resolveListing);
  },

  async getListing(id: number) {
    const { listing } = await adminRequest<{ listing: Listing }>(`/api/admin/listings/${id}`);
    return resolveListing(listing);
  },

  async createListing(input: Partial<ListingInput>) {
    const { listing } = await adminRequest<{ listing: Listing }>("/api/admin/listings", {
      method: "POST",
      body: input,
    });
    return resolveListing(listing);
  },

  async updateListing(id: number, patch: Partial<ListingInput>) {
    const { listing } = await adminRequest<{ listing: Listing }>(`/api/admin/listings/${id}`, {
      method: "PATCH",
      body: patch,
    });
    return resolveListing(listing);
  },

  deleteListing: (id: number) =>
    adminRequest<void>(`/api/admin/listings/${id}`, { method: "DELETE" }),

  uploadListingPhotos: (listingId: number, files: File[]) =>
    uploadInBatches(`/api/admin/listings/${listingId}/photos`, files),

  async getGallery(section: GallerySection) {
    const { photos } = await adminRequest<{ photos: Photo[] }>(`/api/admin/gallery/${section}`);
    return photos.map(resolvePhoto);
  },

  uploadGalleryPhotos: (section: GallerySection, files: File[]) =>
    uploadInBatches(`/api/admin/gallery/${section}/photos`, files),

  reorderPhotos: (ids: number[]) =>
    adminRequest<void>("/api/admin/photos/order", { method: "PUT", body: { ids } }),

  async updatePhotoAlt(id: number, alt: string) {
    const { photo } = await adminRequest<{ photo: Photo }>(`/api/admin/photos/${id}`, {
      method: "PATCH",
      body: { alt },
    });
    return resolvePhoto(photo);
  },

  deletePhoto: (id: number) => adminRequest<void>(`/api/admin/photos/${id}`, { method: "DELETE" }),
};

export function errorMessage(err: unknown) {
  if (err instanceof ApiError) {
    const detail = err.details?.map((d) => (d.field ? `${d.field}: ${d.message}` : d.message)).join("; ");
    return detail ? `${err.message} ${detail}` : err.message;
  }
  return "Something went wrong. Please try again.";
}
