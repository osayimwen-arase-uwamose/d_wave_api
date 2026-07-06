import { Router } from "express";
import { updateMetaData } from "../controllers/meta_data.controller.js";

const route = Router();

route.patch('/update', updateMetaData);

export default route;