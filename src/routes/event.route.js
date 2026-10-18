import { Router } from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/event.controller.js";

import { 
  createEventSchema, 
  updateEventSchema 
} from "../validators/event.validators.js";

import authenticate from "../middlewares/authenticate.js";
import requireRole from "../middlewares/require-role.js";
import validateSchema from "../middlewares/validate-schema.js";

import asyncHandler from "../utils/async-handler.js";

const router = Router();

router.get(
  "/",
  asyncHandler(getAll),
);

router.get(
  "/:eventId",
  asyncHandler(getOne),
);

router.post(
  "/",
  authenticate,
  requireRole('admin'),
  validateSchema(createEventSchema),
  asyncHandler(create),
);

router.patch(
  "/:eventId",
  authenticate,
  requireRole('admin'),
  validateSchema(updateEventSchema),
  asyncHandler(update),
);

router.delete(
  "/:eventId",
  authenticate,
  requireRole('admin'),
  asyncHandler(remove),
);

export default router;
