import { Router } from "express";

import { readAbout, updateAbout } from "../controllers/about.controller.js";

import authenticate from "../middlewares/authenticate.js";
import requireRole from "../middlewares/require-role.js";

import asyncHandler from "../utils/async-handler.js";

const route = Router();

route.get(
  '/', 
  asyncHandler(readAbout),
);

route.patch(
  '/',
  authenticate,
  requireRole('admin'),
  asyncHandler(updateAbout),
);

export default route;