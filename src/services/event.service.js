import { Event } from "../models/event.model.js";

import AppError from "../utils/app-error.js";


const getEventById = async (
  eventId,
) => {
  const event =
    await Event.findById(eventId);

  if (!event) {
    throw new AppError(
      "Event not found.",
      404,
      "EVENT_NOT_FOUND",
    );
  }

  return event;
};


const getEvents = async () => {
  const events =
    await Event.find()
      .sort({ scheduledAt: 1 });

  return events;
};


const createEvent = async ({
  title,
  scheduledAt,
  venue,
  category,
  flyerUrl,
  flyerPublicId,
  description,
  ticketUrl,
}) => {
  const event =
    await Event.create({
      title,
      scheduledAt,
      venue,
      category,
      flyerUrl,
      flyerPublicId,
      description,
      ticketUrl,
    });

  return event;
};


const updateEvent = async (
  eventId,
  updates,
) => {
  const event =
    await Event.findByIdAndUpdate(
      eventId,
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      },
    );

  if (!event) {
    throw new AppError(
      "Event not found.",
      404,
      "EVENT_NOT_FOUND",
    );
  }

  return event;
};


const deleteEvent = async (
  eventId,
) => {
  const event =
    await Event.findByIdAndDelete(
      eventId,
    );

  if (!event) {
    throw new AppError(
      "Event not found.",
      404,
      "EVENT_NOT_FOUND",
    );
  }

  return event;
};


export {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
