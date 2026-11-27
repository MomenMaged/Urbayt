import { Router } from "express";
import { listingController } from "../controllers/listing.controller.js";
import { photoController } from "../controllers/photo.controller.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { uploadPhotos } from "../middleware/upload.middleware.js";

/** The admin panel's API. Every route requires a signed-in admin. */
export const adminRoutes = Router();

// Runs before everything below, including file uploads, so files from
// signed-out visitors are never read into memory.
adminRoutes.use(requireAdmin);

// Listings
adminRoutes.get("/listings", listingController.listAll);
adminRoutes.post("/listings", listingController.create);
adminRoutes.get("/listings/:id", listingController.getById);
adminRoutes.patch("/listings/:id", listingController.update);
adminRoutes.delete("/listings/:id", listingController.remove);

// Photos
adminRoutes.post("/listings/:id/photos", uploadPhotos, photoController.uploadToListing);
adminRoutes.get("/gallery/:section", photoController.listGalleryAdmin);
adminRoutes.post("/gallery/:section/photos", uploadPhotos, photoController.uploadToGallery);
adminRoutes.put("/photos/order", photoController.reorder);
adminRoutes.patch("/photos/:id", photoController.update);
adminRoutes.delete("/photos/:id", photoController.remove);
