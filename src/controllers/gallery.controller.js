import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { Event } from "../models/event.model.js";

const addGalleryPhoto = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId || !mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({
        success: false,
        message: "A valid event ID is required.",
      });
    }

    const {
      mediaType = "image",
      galleryPhotoUrl,
      videoUrl,
      publicId,
      caption = "",
    } = req.body;

    if (!["image", "video"].includes(mediaType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery media type.",
      });
    }

    if (!publicId || typeof publicId !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid media public ID is required.",
      });
    }

    const mediaUrl = mediaType === "video" ? videoUrl : galleryPhotoUrl;

    if (!mediaUrl || typeof mediaUrl !== "string") {
      return res.status(400).json({
        success: false,
        message: `A valid ${mediaType} URL is required.`,
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const alreadyExists = event.galleryPhotos.some(
      (item) => item.publicId === publicId
    );

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "This media has already been added to the gallery.",
      });
    }

    event.galleryPhotos.push({
      mediaType,
      galleryPhotoUrl: mediaType === "image" ? galleryPhotoUrl : undefined,
      videoUrl: mediaType === "video" ? videoUrl : undefined,
      publicId,
      caption: caption || "",
    });

    await event.save();

    return res.status(201).json({
      success: true,
      message: `Gallery ${mediaType} added to ${event.title} successfully.`,
      body: { event },
    });
  } catch (error) {
    console.error(`[addGalleryPhoto] ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const deleteGalleryPhoto = async (req, res) => {
  try {
    const { eventId, galleryPhotoId } = req.params;

    if (
      !mongoose.isValidObjectId(eventId) ||
      !mongoose.isValidObjectId(galleryPhotoId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid event or gallery media ID.",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const media = event.galleryPhotos.id(galleryPhotoId);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Gallery media not found.",
      });
    }

    const resourceType = media.mediaType === "video" ? "video" : "image";

    const cloudinaryDelete = await cloudinary.uploader.destroy(
      media.publicId,
      { resource_type: resourceType }
    );

    if (cloudinaryDelete.result !== "ok") {
      console.error(
        `[deleteGalleryPhoto] Cloudinary deletion failed: ${cloudinaryDelete.result}`
      );

      return res.status(502).json({
        success: false,
        message: "Unable to delete media from storage.",
      });
    }

    media.deleteOne();

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Gallery media deleted successfully.",
    });
  } catch (error) {
    console.error(`[deleteGalleryPhoto] ${error.message}`);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
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
