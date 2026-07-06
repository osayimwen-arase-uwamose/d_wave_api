import { Router } from "express";
import { 
  addGalleryPhoto,
  deleteGalleryPhoto,
  updateGalleryPhotoCaption,
} from "../controllers/gallery.controller.js";

const route = Router({ 
  mergeParams: true,
});

route.post('/add_photo', addGalleryPhoto);
route.delete(
  '/delete_photo/:galleryPhotoId',
  deleteGalleryPhoto,
);
route.patch(
  '/update_caption/:galleryPhotoId',
  updateGalleryPhotoCaption,
);

export default route;
