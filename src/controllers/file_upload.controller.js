import cloudinary from "../config/cloudinary.js";

const uploadFlyer = async (_req, _res) => { 
  try { 
    // TODO: ensure the incoming file is of image type.
    if (!_req.file) { 
      console.log('[uploadFlyer] No image uploaded');

      return _res.status(400).json({ message: 'No image uploaded' });
    };

    const streamUpload = () => new Promise((_resolve, _reject) => { 
      const stream = cloudinary.uploader.upload_stream(
        { folder: "event_flyers" },
        (_error, _result) => { 
          if (_result) { 
            _resolve(_result);
          } else { 
            _reject(_error);
          };
        },
      );

      stream.end(_req.file.buffer);
    });

    const result = await streamUpload();

    console.log(`[uploadFlyer] Image uploaded successfully. url: ${result.secure_url}`);

    _res.status(200).json({ 
      url: result.secure_url,
      publicId: result.public_id,
      message: "Flyer uploaded successfully",
    });
  } catch (_err) { 
    console.log(`[uploadFlyer] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'internal server error',
    });
  };
};

// TODO: make upload gallery Photo compatible for lists of images.
const uploadGalleryPhoto = async (_req, _res) => { 
  try { 
    // TODO: ensure the incoming file is of image type.
    if (!_req.file) { 
      console.log('[uploadGalleryPhoto] No image uploaded');

      return _res.status(400).json({ message: 'No image uploaded' });
    };

    const streamUpload = () => new Promise((_resolve, _reject) => { 
      const stream = cloudinary.uploader.upload_stream(
        { folder: "event_gallery_photos" },
        (_error, _result) => { 
          if (_result) { 
            _resolve(_result);
          } else { 
            _reject(_error);
          };
        },
      );

      stream.end(_req.file.buffer);
    });

    const result = await streamUpload();

    console.log(`[uploadGalleryPhoto] Image uploaded successfully. url: ${result.secure_url}`);

    _res.status(200).json({ 
      url: result.secure_url,
      publicId: result.public_id,
      message: "Flyer uploaded successfully",
    });
  } catch (_err) { 
    console.log(`[uploadGalleryPhoto] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'internal server error',
    });
  };
};

export { 
  uploadFlyer,
  uploadGalleryPhoto,
};
