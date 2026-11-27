import type { Listing, Photo } from "./types";

/**
 * Where the API lives. Leave VITE_API_URL unset in development: Vite proxies
 * /api to the local server (see vite.config.ts). In production set it to the
 * deployed API, e.g. https://urban-hive-api.onrender.com
 */
export const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export class ApiError extends Error {
  status: number;
  details?: { field: string; message: string }[];

  constructor(status: number, message: string, details?: ApiError["details"]) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
  signal?: AbortSignal;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token, signal } = options;
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload: BodyInit | undefined;
  if (body instanceof FormData) {
    payload = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, { method, headers, body: payload, signal });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new ApiError(0, "Can't reach the server. Check your connection and try again.");
  }

  if (response.status === 204) return undefined as T;

  // A static host answering with index.html means the API isn't there.
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : null;
  if (!response.ok || !isJson) {
    throw new ApiError(
      response.status,
      data?.error ?? `The server responded with ${response.status}.`,
      data?.details,
    );
  }
  return data as T;
}

/** API photo URLs are relative to the API; make them usable from the website. */
export function resolvePhoto(photo: Photo): Photo {
  return /^https?:\/\//.test(photo.url) ? photo : { ...photo, url: `${API_BASE}${photo.url}` };
}

export function resolveListing(listing: Listing): Listing {
  return { ...listing, photos: listing.photos.map(resolvePhoto) };
}
