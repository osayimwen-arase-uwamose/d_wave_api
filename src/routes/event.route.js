import { Router } from "express";
import { 
  createEvent, 
  readEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import galleryRoute from "./gallery.route.js";

const route = Router();

route.post('/create', createEvent);
// TODO: What if someone goes directly to the event page without first loading the hoomepage and so populating the local storage with the entire events initially? They shouldn't have to load the entire thing just to view one and so an endpoint should be able view only one.
route.get('/read', readEvents);
route.patch('/update/:eventId', updateEvent);
route.delete('/delete/:eventId', deleteEvent);

route.use('/:eventId/gallery', galleryRoute);

export default route;
