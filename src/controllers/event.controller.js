import { Event } from "../models/event.model.js";

// TODO: Explore adding an end point for gettting a specific event in cases where a particular event page is being loaded and the local storage/cache is empty. INstead of fetching the entire events using readEvents, simply slow load readEvents then load that event only at that moment
const createEvent = async (_req, _res) => {
  try {
    const {
      title, 
      scheduledAt, 
      venue, 
      category, 
      flyerUrl, 
      description, 
      ticketUrl,
    } = _req.body;

    if (
      !title 
      || !scheduledAt 
      || !venue 
      || !category 
      || !flyerUrl 
      || !description 
      || !ticketUrl
    ) { 
      console.log('[createEvent] Missing fields in request body');

      return _res.status(400).json({ message: 'All fields are required' });
    };

    const event = new Event({
      title, 
      scheduledAt, 
      venue, 
      category, 
      flyerUrl, 
      description, 
      ticketUrl,
    });

    await event.save();

    console.log(`[createEvent] Event created successfully: ${title}`);

    // TODO:Verify status code for creating resource below. 
    return _res.status(202).json({ 
      event,
      message: 'Event created successfully',
    });
  } catch (_err) {
    // TODO: verify the spacing within the object literals below and in other source files in the code base.
    console.log(`[createEvent] Internal server error: ${_err.message}`);

    return _res.status(500).json({ message: 'Internal server error' });
  };
};

// TODO: Verify adding comma after the last parameter using airbnb style guide since this isn't an object.
const readEvents = async (_req, _res) => {
  try {
    const events = await Event.find();

    if (!events) { 
      console.log('[readEvents] No event found');

      return _res.status(404).json({ message: 'No event found' });
    };

    console.log('[readEvents] Event(s) read successfully');

    return _res.status(200).json({ 
      events,
      success: true,
    });
  } catch (_err) {
    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });

    console.log(`[readEvents] Internal server error: ${_err.message}`);
  };
};

const updateEvent = async (_req, _res) => {
  try {
    const { eventId } = _req.params;
    const updateData = _req.body;

    if (!updateData) { 
      console.log('[updateEvent] Missing update data in request');

      return _res.status(400).json({ message: 'update data is required' });
    };

    const updated = await Event.findByIdAndUpdate(
      eventId,
      updateData,
      { new: true },
    );

    if (!updated) { 
      console.log('[updateEvents] Event not found');

      return _res.status(404).json({ message: 'Event not found' });
    };

    console.log(`[updateEvent] Event updated successfully: ${updated.title}`);

    // TODO:Verify status code for updating resource below.
    return _res.status(202).json({ 
      updated,
      success: true,
      message: `${updated.title} updated successfully`,
    });
  } catch (_err) {
    console.log(`[updateEvent] Internal server error: ${_err.message}`)

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  };
};

const deleteEvent = async (_req, _res) => {
  try {
    const { eventId } = _req.params;

    if (!eventId) { 
      console.log('[deleteEvent] Missing event id in request');

      return _res.status(400).json({ message: 'Missing event Id' });
    };

    const deleted = await Event.findByIdAndDelete( eventId );

    if (!deleted) { 
      console.log('[deleteEvent] Event not found');

      return _res.status(404).json({ message: 'Event not found' });
    };

    console.log(`[deleteEvent] Event deleted successfully: ${deleted.title}`);

    // TODO:Verify status code for deleting resource below. 
    return _res.status(202).json({ 
      success: true,
      message: `${deleted.title} deleted successfully`,
    });
  } catch (_err) {
    console.log(`[deleteEvent] Internal server error: ${_err.message}`);
    
    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  };
};

export {
  createEvent,
  readEvents,
  updateEvent,
  deleteEvent,
};
