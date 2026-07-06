import { Router } from "express";
import { readAbout, updateAbout } from "../controllers/about.controller";

const route = Router();

route.get('/read', readAbout);
route.patch('/update', updateAbout);

export default route;