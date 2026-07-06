import multer from "multer";

const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

export default multerUpload;
