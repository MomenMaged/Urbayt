import { Router } from "express";
import { listingController } from "../controllers/listing.controller.js";
import { photoController } from "../controllers/photo.controller.js";

/** What the public website reads. No sign-in needed. */
export const publicRoutes = Router();

publicRoutes.get("/listings", listingController.listPublished);
publicRoutes.get("/listings/:slug", listingController.getPublishedBySlug);
publicRoutes.get("/gallery/:section", photoController.listGallery);
publicRoutes.get("/photos/:id", photoController.getImage);
