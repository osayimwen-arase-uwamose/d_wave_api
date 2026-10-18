import { Router } from "express";
import { addDataSet, deleteDataSet } from "../controllers/meta_data.controller.js";
import authenticate from "../middlewares/authenticate.js";
import requireRole from "../middlewares/require-role.js";

const router = Router();

router.use(
  authenticate,
  requireRole('admin'),
);

router.patch(
  '/add',
  addDataSet
);

router.delete(
  '/delete/:datasetId',
  deleteDataSet,
);

router.patch(
  '/update/:datasetId',
  deleteDataSet,
);

export default router;
