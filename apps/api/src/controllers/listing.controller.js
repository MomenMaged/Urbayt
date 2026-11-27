import { listingService } from "../services/listing.service.js";
import { idParam } from "../validators/common.validator.js";
import { createListingSchema, updateListingSchema } from "../validators/listing.validator.js";

// Short public cache so admin changes show up on the website within a minute.
const PUBLIC_CACHE = "public, max-age=60";

export const listingController = {
  /* ------------------------------ Public ------------------------------ */

  async listPublished(req, res) {
    const listings = await listingService.listPublished();
    res.set("Cache-Control", PUBLIC_CACHE).json({ listings });
  },

  async getPublishedBySlug(req, res) {
    const listing = await listingService.getPublishedBySlug(req.params.slug);
    res.set("Cache-Control", PUBLIC_CACHE).json({ listing });
  },

  /* ------------------------------- Admin ------------------------------ */

  async listAll(req, res) {
    res.json({ listings: await listingService.listAll() });
  },

  async getById(req, res) {
    res.json({ listing: await listingService.getById(idParam.parse(req.params.id)) });
  },

  async create(req, res) {
    const listing = await listingService.create(createListingSchema.parse(req.body));
    res.status(201).json({ listing });
  },

  async update(req, res) {
    const id = idParam.parse(req.params.id);
    const listing = await listingService.update(id, updateListingSchema.parse(req.body));
    res.json({ listing });
  },

  async remove(req, res) {
    await listingService.remove(idParam.parse(req.params.id));
    res.status(204).end();
  },
};
