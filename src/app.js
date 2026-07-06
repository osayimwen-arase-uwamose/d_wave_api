import express from "express";
import cors from "cors";
// TODO: Uninstall cookie prarser
import cookieParser from "cookie-parser";

import eventRouter from "./routes/event.route.js";
import fileUploadRouter from "./routes/file_upload.route.js";
import landingRouter from "./routes/landing.route.js";
import aboutRouter from "./routes/about.route.js";
import metaDataRouter from "./routes/meta_data.route.js";

const app = express();

// app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/events', eventRouter);
app.use('/upload', fileUploadRouter);
app.use('/landing', landingRouter);
app.use('/about', aboutRouter);
app.use('/meta_data', metaDataRouter);

export default app;
