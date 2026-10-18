import { 
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/event.service.js";

const create = async (req, res) => {

  const { 
    body,
  } = req.validated;

  const event = await createEvent(body);

  return res.status(201).json({
    success: true,
    message: "Event created successfully.",
    data: {
      event,
    },
  });
};

const getAll = async (req, res) => {
  const events = await getEvents();

  return res.status(200).json({
    success: true,
    data: {
      events,
    },
  });
};

const getOne = async (req, res) => {
  const { eventId, } = req.params;

  const event = await getEventById(eventId);

  return res.status(200).json({
    success: true,
    data: {
      event,
    },
  });
};

const update = async (req, res) => {
  const { eventId, } = req.params;

  const { 
    body,
  } = req.validated;

  const event = await updateEvent(
    eventId,
    body,
  );

  return res.status(200).json({
    success: true,
    message: "Event updated successfully.",
    data: {
      event,
    },
  });
};

const remove = async (req, res) => {
  const { eventId } = req.params;

  await deleteEvent(eventId);

  return res.status(200).json({
    success: true,
    message: "Event deleted successfully.",
  });
};

export {
  create,
  getAll,
  getOne,
  update,
  remove,
};
