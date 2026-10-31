import { Schema, model } from "mongoose";

const photoSchema = new Schema({ 
  mediaType: { 
    type: String,
    enum: ['image', 'video'],
    default: 'image',
    required: true,
  },

  galleryPhotoUrl: { 
    type: String,
    trim: true,
    required: function () { 
      return this.mediaType === 'image';
    }
  },

  videoUrl: { 
    type: String,
    trim: true,
    required: function () { 
      return this.mediaType === 'video';
    }
  },

  publicId: { 
    type: String,
    required: true,
    trim: true,
  },

  caption: { 
    type: String,
    default: ""
  },
});

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    maxLength: 100,
  },

  scheduledAt: {
    type: Date,
    required: true,
  },

  venue: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: String,
    required: true,
    trim: true,
  },

  flyerUrl: {
    type: String,
    required: true,
    trim: true,
  },

  flyerPublicId: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    maxLength: 300,
  },

  ticketUrl: {
    type: String,
    trim: true,
  },

  galleryPhotos: [photoSchema],
}, 
{ timestamps: true }
);

export const Event = model("Event", eventSchema);
