import mongoose from "mongoose";

import cloudinary from "../config/cloudinary.js";

import { Event } from "../models/event.model.js";

const addGalleryPhoto = async (req, res) => { 
  try { 
    // TODO: If there is no event Id in params, would this throw an error of unable to destructure an so server error of 500 when it is a 400 error?
    const { eventId } = req.params;

    console.log("event id:", eventId)

    const { 
      galleryPhotoUrl,
      publicId,
      caption = "",
    } = req.body;

    if (!eventId || !mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({
        success: false,
        message: "A valid event ID is required.",
      });
    };

    const alreadyExists = await Event.exists({
      _id: eventId,
      "galleryPhotos.publicId": publicId,
    });

    if (alreadyExists) { 
      console.log('[addGalleryPhoto] Duplicate public id detected');

      return res.status(409).json({ 
        success: false,
        message: 'Photo already added',
      });
    };

    const event = await Event.findById(eventId);
    
    if (!event) { 
      return res.status(404).json({ 
        message: 'Event not found',
      });
    };

    //TODO: Prevent duplicate image public id. Even if admin wants to upload one image multiple times, they should have different public ids.
    event.galleryPhotos.push({ 
      galleryPhotoUrl,
      publicId,
      caption: caption || "",
    });

    await event.save();

    // TODO: Verify status code for updating a resource
    return res.status(200).json({ 
      success: true,
      message: `gallery photos added to ${event.title} successfully`,
      body: { event },
    });
  } catch (_err) { 
    console.log(`[addGalleryPhoto] Internal server error: ${_err.message}`);

    return res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  };
};

const deleteGalleryPhoto = async (_req, _res) => { 
  try { 
    const { eventId, galleryPhotoId, } = _req.params;

    const event = await Event.findById(eventId);

    if (!event) { 
      console.log('[deleteGalleryPhoto] Event id does not matvh any event');

      return _res.status(404).json({ 
        success: false,
        message: 'Event not found',
      });
    };

    const photo = event.galleryPhotos.id(galleryPhotoId);

    if (!photo) { 
      console.log('[deleteGalleryPhoto] Gallery photo id does not match any photo');

      return _res.status(404).json({ 
        success: false,
        message: 'Photo not found',
      });
    };

    const cloudinaryDelete = await cloudinary.uploader.destroy(photo.publicId);

    if (cloudinaryDelete.result !== "ok") { 
      console.log('[deleteGalleryPhoto] Failed to delete photo from cloudinary');

      throw new Error ('Failed to delete photo');
    };

    photo.deleteOne();

    await event.save();

    console.log('[deleteGalleryPhoto] Gallery photo deleted successfully');

    return _res.status(200).json({ 
      success: true,
      message: 'Caption deleted successfully',
    });
  } catch (_err) { 
    console.log(`[deleteGalleryPhoto] Internal server error ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });
  };
};

const updateGalleryPhotoCaption = async (_req, _res) => { 
  try { 
    const { eventId, galleryPhotoId } = _req.params;

    const { caption } = _req.body;

    if (caption === undefined || caption === null) { 
       console.log('[updateGalleryPhotoCaption] Caption not found in request body');

       return _res.status(400).json({ 
        success: false,
        message: 'caption cannot be undefined or null'
       });
    };

    const event = await Event.findById(eventId);

    if (!event) { 
      console.log('[updateGalleryPhotoCaption] Event id does not matvh any event');

      return _res.status(404).json({ 
        success: false,
        message: 'Event not found',
      });
    };

    const photo = event.galleryPhotos.id(galleryPhotoId);

    if (!photo) { 
      console.log('[updateGalleryPhotoCaption] Gallery photo id does not match any photo');

      return _res.status(404).json({ 
        success: false,
        message: 'Photo not found',
      });
    };

    photo.caption = caption;

    await event.save();

    console.log('[updateGalleryPhotoCaption] Gallery photo caption updated successfully');

    return _res.status(200).json({ 
      success: true,
      message: 'Caption updated successfully',
    });
  } catch (_err) { 
    console.log(`[updateGalleryPhotoCaption] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });
  };
};

export { 
  addGalleryPhoto,
  deleteGalleryPhoto,
  updateGalleryPhotoCaption,
};
