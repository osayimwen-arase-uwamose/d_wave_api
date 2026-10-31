import crypto from "crypto";
import cloudinary from "../config/cloudinary.js";

const VIDEO_FOLDER = "event_videos";
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

const ALLOWED_VIDEO_FORMATS = ["mp4", "mov", "webm"];

// Generate a signed upload request
const generateVideoUploadSignature = async (req, res) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const publicId = `${VIDEO_FOLDER}/${crypto.randomUUID()}`;

    const uploadParams = {
      timestamp,
      public_id: publicId,
      overwrite: false,
    };

    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_API_SECRET
    );

    return res.status(200).json({
      success: true,
      message: "Video upload authorized successfully.",
      data: {
        signature,
        timestamp,
        publicId,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
      },
    });
  } catch (error) {
    console.error(
      `[generateVideoUploadSignature] ${error.message}`
    );

    return res.status(500).json({
      success: false,
      message: "Unable to authorize video upload.",
    });
  }
};


// Verify the uploaded Cloudinary resource
const verifyVideoUpload = async (req, res) => {
  try {
    const { publicId } = req.body;

    if (
      typeof publicId !== "string" ||
      !/^event_videos\/[0-9a-f-]{36}$/i.test(publicId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid video public ID.",
      });
    }

    const resource = await cloudinary.api.resource(
      publicId,
      {
        resource_type: "video",
        type: "upload",
      }
    );

    const isValidFormat = ALLOWED_VIDEO_FORMATS.includes(
      resource.format?.toLowerCase()
    );

    if (!isValidFormat) {
      return res.status(400).json({
        success: false,
        message: "Unsupported video format.",
      });
    }

    if (resource.bytes > MAX_VIDEO_SIZE) {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: "video",
      });

      return res.status(400).json({
        success: false,
        message: "Video exceeds the maximum allowed size of 100 MB.",
      });
    }

    if (!resource.secure_url) {
      return res.status(422).json({
        success: false,
        message: "Unable to retrieve the uploaded video URL.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Video verified successfully.",
      data: {
        url: resource.secure_url,
        publicId: resource.public_id,
        resourceType: resource.resource_type,
        format: resource.format,
        duration: resource.duration,
        bytes: resource.bytes,
        width: resource.width,
        height: resource.height,
      },
    });
  } catch (error) {
    console.error(`[verifyVideoUpload] ${error.message}`);

    if (error.http_code === 404) {
      return res.status(404).json({
        success: false,
        message: "Uploaded video could not be found.",
      });
    }

    return res.status(502).json({
      success: false,
      message: "Unable to verify uploaded video.",
    });
  }
};

export {
  generateVideoUploadSignature,
  verifyVideoUpload,
};