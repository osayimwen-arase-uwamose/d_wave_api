import { Router } from "express";

import { 
  generateVideoUploadSignature, verifyVideoUpload, 
} from "../controllers/videoUpload.controller.js";

import authenticate from "../middlewares/authenticate.js";
import requireRole from "../middlewares/require-role.js";

const router = Router();

router.use(authenticate);
router.use(requireRole('admin'));

router.post(
  '/upload-signature',
  generateVideoUploadSignature
);

router.post(
  '/verify-upload',
  verifyVideoUpload
);

export default router;
