import express from "express";
import cors from "cors";
// TODO: Uninstall cookie prarser
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";

import authRouter from "./routes/auth.routes.js"
import eventRouter from "./routes/event.route.js";
import fileUploadRouter from "./routes/file_upload.route.js";
import landingRouter from "./routes/landing.route.js";
import aboutRouter from "./routes/about.route.js";
import metaDataRouter from "./routes/meta_data.route.js";
import galleryRouter from "./routes/gallery.route.js";
import AppError from "./utils/app-error.js";

const app = express();

// app.use(cookieParser());
app.use(
  cors({ 
    origin: function () { 
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        'https://admin.dwaveentertainment.co.uk',
        env.FRONTEND_URL
      ];

      if (allowedOrigins.indexOf(origin) !== -1) { 
        callback(null, true);
      } else { 
        callback(
          new AppError(
            403,
            'CORS Error: Access Denied'
          )
        );
      };
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRouter);
app.use('/events', eventRouter);
app.use('/upload', fileUploadRouter);
app.use('/landing', landingRouter);
app.use('/about', aboutRouter);
app.use('/meta-data', metaDataRouter);
app.use('/gallery', galleryRouter)

export default app;
