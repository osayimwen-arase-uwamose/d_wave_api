import { Router } from "express";

import { 
  readLanding, 
  updateLanding 
} from "../controllers/landing.controller.js";

import requireRole from "../middlewares/require-role.js";
import authenticate from "../middlewares/authenticate.js";

import asyncHandler from "../utils/async-handler.js";

const route =  Router();

route.get(
  '/', 
  asyncHandler(readLanding)
);

route.patch(
  '/', 
  authenticate,
  requireRole('admin'),
  asyncHandler(updateLanding)
);

export default route;
