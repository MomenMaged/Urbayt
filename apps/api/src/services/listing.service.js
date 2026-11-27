import { listingRepository } from "../repositories/listing.repository.js";
import { badRequest, notFound } from "../utils/errors.js";

export const listingService = {
  /** Listings visitors can see, in display order. */
  listPublished() {
    return listingRepository.findAll({ publishedOnly: true });
  },

  async getPublishedBySlug(slug) {
    const listing = await listingRepository.findBySlug(slug.toLowerCase(), { publishedOnly: true });
    if (!listing) throw notFound("Listing not found");
    return listing;
  },

  /** Every listing, including hidden ones (admin). */
  listAll() {
    return listingRepository.findAll();
  },

  async getById(id) {
    const listing = await listingRepository.findById(id);
    if (!listing) throw notFound("Listing not found");
    return listing;
  },

  async create(data) {
    const id = await listingRepository.create(data);
    return listingRepository.findById(id);
  },

  async update(id, changes) {
    if (Object.keys(changes).length === 0) throw badRequest("Nothing to update.");
    const updated = await listingRepository.update(id, changes);
    if (!updated) throw notFound("Listing not found");
    return listingRepository.findById(id);
  },

  /** Deletes the listing and all of its photos. */
  async remove(id) {
    const deleted = await listingRepository.delete(id);
    if (!deleted) throw notFound("Listing not found");
  },
};
