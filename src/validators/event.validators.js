import { z } from "zod";

const createEventSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(
        1,
        "Event title is required.",
      )
      .max(
        100,
        "Event title cannot exceed 100 characters.",
      ),

    scheduledAt: z.coerce.date({
      message:
        "A valid scheduled date and time is required.",
    }),

    venue: z
      .string()
      .trim()
      .min(
        1,
        "Event venue is required.",
      ),

    category: z
      .string()
      .trim()
      .min(
        1,
        "Event category is required.",
      ),

    flyerUrl: z
      .string()
      .trim()
      .min(
        1,
        "Event flyer URL is required.",
      ),

    flyerPublicId: z
      .string()
      .trim()
      .min(
        1,
        "Event flyer public ID is required.",
      ),

    description: z
      .string()
      .trim()
      .min(
        1,
        "Event description is required.",
      )
      .max(
        300,
        "Event description cannot exceed 300 characters.",
      ),

    ticketUrl: z
      .string()
      .trim()
      .optional(),
  }),

  params: z.object({}),

  query: z.object({}),
});

const updateEventSchema = z.object({
  body: createEventSchema.shape.body
    .partial()
    .refine(
      (data) =>
        Object.keys(data).length > 0,
      {
        message:
          "At least one field is required to update an event.",
      },
    ),

  params: z.object({}),

  query: z.object({}),
});

const galleryPhotoSchema = z.object({
  body: z.object({
    galleryPhotoUrl: z
      .string()
      .trim()
      .min(
        1,
        "Gallery photo URL is required.",
      ),

    publicId: z
      .string()
      .trim()
      .min(
        1,
        "Gallery photo public ID is required.",
      ),

    caption: z
      .string()
      .trim()
      .default(""),
  }),

  params: z.object({}),

  query: z.object({}),
});

export {
  createEventSchema,
  updateEventSchema,
  galleryPhotoSchema,
};
