import { Router } from "express";
import { readLanding, updateLanding } from "../controllers/landing.controller.js";

const route =  Router();

route.patch('/update', updateLanding);
route.get('/read', readLanding);

export default route;