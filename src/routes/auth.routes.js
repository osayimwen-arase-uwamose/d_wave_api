import { Router } from "express";

import { 
  register,
  login,
  refresh,
  me,
  logout,
  logoutAll,
} from "../controllers/auth.controllers.js";

import { 
  registerSchema,
  loginSchema,
} from "../validators/auth.validators.js";

import authenticate from "../middlewares/authenticate.js";
import validateSchema from "../middlewares/validate-schema.js";

import { 
  authRateLimit,
  loginRateLimit,
} from "../middlewares/rate-limit.js";

import asyncHandler from "../utils/async-handler.js";

const router = Router();

router.post(
  '/register',
  authRateLimit,
  validateSchema(registerSchema),
  asyncHandler(register)
);

router.post(
  '/login',
  loginRateLimit,
  validateSchema(loginSchema),
  asyncHandler(login)
);

router.post(
  '/refresh',
  authRateLimit,
  asyncHandler(refresh)
);

router.get(
  '/me',
  authenticate,
  asyncHandler(me)
);

router.post(
  '/logout',
  authenticate,
  asyncHandler(logout)
);

router.post(
  '/logout-all',
  authenticate,
  asyncHandler(logoutAll)
);

export default router;
