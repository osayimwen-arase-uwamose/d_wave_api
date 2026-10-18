import { Router } from "express";
import { 
  addGalleryPhoto,
  deleteGalleryPhoto,
  updateGalleryPhotoCaption,
} from "../controllers/gallery.controller.js";

const route = Router();

route.post('/:eventId', addGalleryPhoto);

route.delete(
  '/:eventId/:galleryPhotoId',
  deleteGalleryPhoto,
);

route.patch(
  '/:eventId/:galleryPhotoId',
  updateGalleryPhotoCaption,
);

export default route;
