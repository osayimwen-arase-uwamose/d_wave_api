import { Router } from "express";
import multerUpload from "../middlewares/multer.js";
import { 
  uploadFlyer,
  uploadGalleryPhoto,
} from "../controllers/file_upload.controller.js";

const route = Router();

route.post('/flyer', multerUpload.single('flyerUrl'), uploadFlyer,);

route.post(
  '/gallery_photo',
  multerUpload.single('galleryPhotoUrl'),
  uploadGalleryPhoto,
);

export default route;
