import { useEffect, useState } from "react";
import { fetchGallery, fetchListing, fetchListings } from "../api/public";
import type { GallerySection, Listing, Photo } from "../api/types";

/*
 * Data for the public pages. Results are cached for the visit, so moving
 * between pages doesn't refetch; a page reload picks up admin changes.
 */
const cache = new Map<string, Promise<unknown>>();

function cached<T>(key: string, load: () => Promise<T>): Promise<T> {
  if (!cache.has(key)) {
    const promise = load().catch((err) => {
      cache.delete(key);
      throw err;
    });
    cache.set(key, promise);
  }
  return cache.get(key) as Promise<T>;
}

function useCachedResource<T>(key: string, load: () => Promise<T>) {
  const [state, setState] = useState<{ key: string; data: T | undefined }>({
    key: "",
    data: undefined,
  });

  useEffect(() => {
    let active = true;
    cached(key, load).then((data) => {
      if (active) setState({ key, data });
    });
    return () => {
      active = false;
    };
    // `load` is derived from `key`, so the key alone decides when to reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const ready = state.key === key;
  return { data: ready ? state.data : undefined, loading: !ready };
}

export function useListings() {
  const { data, loading } = useCachedResource<Listing[]>("listings", fetchListings);
  return { listings: data ?? [], loading };
}

export function useListing(slug: string) {
  const { data, loading } = useCachedResource<Listing | null>(`listing:${slug}`, () =>
    fetchListing(slug),
  );
  return { listing: data ?? null, loading };
}

export function useGallery(section: GallerySection) {
  const { data, loading } = useCachedResource<Photo[]>(`gallery:${section}`, () =>
    fetchGallery(section),
  );
  return { photos: data ?? [], loading };
}
