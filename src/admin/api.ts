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
const MAX_FILES_PER_REQUEST = 12;
/** Hosts limit request size (Vercel: 4.5 MB), so each upload request stays under this. */
const MAX_BYTES_PER_REQUEST = 4 * 1024 * 1024;
/** The server stores photos at most this many pixels on the longest side. */
const MAX_SIDE = 2400;

/**
 * Shrinks a photo in the browser before upload, to the size the server keeps
 * anyway. Phone photos drop from several MB to well under 1 MB, so uploads
 * are faster and fit hosting limits. The server still checks and re-encodes
 * every image. If the browser can't read a file, it is sent unchanged.
 */
async function shrinkImage(file: File): Promise<File> {
  if (file.type === "image/gif") return file; // keep animations intact
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size < 1024 * 1024) {
      bitmap.close();
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d")!;
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const toBlob = (type: string) =>
      new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.9));
    // WebP keeps transparency; browsers that can't encode it return PNG,
    // in which case use JPEG on a white background.
    let blob = await toBlob("image/webp");
    let extension = "webp";
    if (!blob || blob.type !== "image/webp") {
      context.globalCompositeOperation = "destination-over";
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      blob = await toBlob("image/jpeg");
      extension = "jpg";
    }
    if (!blob || blob.size >= file.size) return file;

    const name = `${file.name.replace(/\.[^.]+$/, "")}.${extension}`;
    return new File([blob], name, { type: blob.type });
  } catch {
    return file;
  }
}

/** Groups files into requests of at most 12 files and ~4 MB each. */
function batchBySize(files: File[]) {
  const batches: File[][] = [];
  let current: File[] = [];
  let bytes = 0;
  for (const file of files) {
    const full = current.length >= MAX_FILES_PER_REQUEST || bytes + file.size > MAX_BYTES_PER_REQUEST;
    if (current.length > 0 && full) {
      batches.push(current);
      current = [];
      bytes = 0;
    }
    current.push(file);
    bytes += file.size;
  }
  if (current.length > 0) batches.push(current);
  return batches;
}

async function uploadInBatches(path: string, files: File[]) {
  // One at a time: a decoded phone photo can take ~50 MB of memory.
  const prepared: File[] = [];
  for (const file of files) prepared.push(await shrinkImage(file));

  const uploaded: Photo[] = [];
  for (const batch of batchBySize(prepared)) {
    const body = new FormData();
    batch.forEach((file) => body.append("photos", file));
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
