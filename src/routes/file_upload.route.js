import { Router } from "express";
import multerUpload from "../middlewares/multer.js";
import { 
  uploadFlyer,
  uploadGalleryPhoto,
  uploadLandingImage,
  uploadAboutImage,
} from "../controllers/file_upload.controller.js";

const route = Router();

route.post('/flyer', multerUpload.single('flyerUrl'), uploadFlyer,);

route.post(
  '/gallery-photo',
  multerUpload.single('galleryPhotoUrl'),
  uploadGalleryPhoto,
);

//TODO: Verify post method (may be patch)
route.post(
  '/landing-image',
  multerUpload.single('landingPhotoUrl'),
  uploadLandingImage,
);

route.post(
  '/about-image',
  multerUpload.single('aboutPhotoUrl'),
  uploadAboutImage,
);

export default route;
