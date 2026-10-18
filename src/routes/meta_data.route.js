import { Router } from "express";
import { readMetaData, updateMetaData } from "../controllers/meta_data.controller.js";
import datasetRouter from "./dataset.route.js";

const route = Router();

route.get('/read', readMetaData);
route.patch('/update', updateMetaData);

route.use('/dataset', datasetRouter);

export default route;