import { photoService } from "../services/photo.service.js";
import { gallerySection, idParam } from "../validators/common.validator.js";
import { photoPatchSchema, reorderSchema } from "../validators/photo.validator.js";

export const photoController = {
  /* ------------------------------ Public ------------------------------ */

  async listGallery(req, res) {
    const photos = await photoService.listGallery(gallerySection.parse(req.params.section));
    res.set("Cache-Control", "public, max-age=60").json({ photos });
  },

  /** Sends the image file itself. */
  async getImage(req, res) {
    const id = idParam.parse(req.params.id);
    const etag = `"photo-${id}"`;
    // A photo's bytes never change after upload (a new upload gets a new id),
    // so browsers and CDNs may cache it for a year.
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    res.set("ETag", etag);
    if (req.get("if-none-match") === etag) return res.status(304).end();

    try {
      const image = await photoService.getImage(id);
      res.type(image.mimeType).send(image.data);
    } catch (err) {
      res.set("Cache-Control", "no-store");
      throw err;
    }
  },

  /* ------------------------------- Admin ------------------------------ */

  async listGalleryAdmin(req, res) {
    res.json({ photos: await photoService.listGallery(gallerySection.parse(req.params.section)) });
  },

  async uploadToListing(req, res) {
    const photos = await photoService.addToListing(idParam.parse(req.params.id), req.files);
    res.status(201).json({ photos });
  },

  async uploadToGallery(req, res) {
    const photos = await photoService.addToGallery(gallerySection.parse(req.params.section), req.files);
    res.status(201).json({ photos });
  },

  async reorder(req, res) {
    const { ids } = reorderSchema.parse(req.body);
    await photoService.reorder(ids);
    res.status(204).end();
  },

  async update(req, res) {
    const { alt } = photoPatchSchema.parse(req.body);
    res.json({ photo: await photoService.updateAlt(idParam.parse(req.params.id), alt) });
  },

  async remove(req, res) {
    await photoService.remove(idParam.parse(req.params.id));
    res.status(204).end();
  },
};
