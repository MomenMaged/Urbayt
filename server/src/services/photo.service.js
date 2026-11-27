import { withTransaction } from "../config/database.js";
import { listingRepository } from "../repositories/listing.repository.js";
import { photoRepository } from "../repositories/photo.repository.js";
import { badRequest, notFound } from "../utils/errors.js";
import { altFromFilename, processImage } from "./image.service.js";

/**
 * Processes every file first, so one unreadable image rejects the whole
 * batch before anything is saved, then stores them after the owner's
 * existing photos in a single transaction.
 */
async function addPhotos(owner, files) {
  if (!files?.length) throw badRequest("Choose at least one image to upload.");

  const images = [];
  for (const file of files) {
    images.push({ ...(await processImage(file)), alt: altFromFilename(file.originalname) });
  }

  return withTransaction(async (client) => {
    let sortOrder = await photoRepository.nextSortOrder(owner, client);
    const saved = [];
    for (const image of images) {
      saved.push(
        await photoRepository.insert(
          {
            ...image,
            listingId: owner.listingId ?? null,
            section: owner.listingId ? "listing" : owner.section,
            sortOrder: sortOrder++,
          },
          client,
        ),
      );
    }
    return saved;
  });
}

export const photoService = {
  async addToListing(listingId, files) {
    if (!(await listingRepository.exists(listingId))) throw notFound("Listing not found");
    return addPhotos({ listingId }, files);
  },

  addToGallery(section, files) {
    return addPhotos({ section }, files);
  },

  listGallery(section) {
    return photoRepository.findGallery(section);
  },

  async getImage(id) {
    const image = await photoRepository.findImage(id);
    if (!image) throw notFound("Photo not found");
    return image;
  },

  /** Saves a new order. All ids must belong to the same listing or gallery section. */
  async reorder(ids) {
    const { count, owners } = await photoRepository.summarize(ids);
    if (count !== ids.length) throw notFound("Some photos no longer exist. Reload and try again.");
    if (owners !== 1) throw badRequest("Photos must all belong to the same listing or gallery.");
    await photoRepository.reorder(ids);
  },

  async updateAlt(id, alt) {
    const photo = await photoRepository.updateAlt(id, alt);
    if (!photo) throw notFound("Photo not found");
    return photo;
  },

  async remove(id) {
    const deleted = await photoRepository.delete(id);
    if (!deleted) throw notFound("Photo not found");
  },
};
