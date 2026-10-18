import { Landing } from "../models/landing.model.js";

const readLanding = async (_req, _res) => { 
  try { 
    const landing = await Landing.findOne({});

    if (!landing) { 
      console.log('[readLanding] Landing data not found');

      return _res.status(404).json({ 
        success: false,
        message: 'Landing data not found',
      });
    };

    console.log('[readLanding] Landing data read successfully');

    return _res.status(200).json({ 
      success: true,
      body: { 
        landing,
      },
      message: 'Landing data read successfully',
    });
  } catch (_err) { 
    console.log(`[readLanding] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });
  };
};

const updateLanding = async (_req, _res) => { 
  try { 
    const { 
      imageUrls,
      title,
      summary,
      tagline,
      links,
      servicesData,
    } = _req.body;

    const { 
      text,
      servicesOffered,
      serviceImageUrls,
    } = servicesData;

    if (
      !imageUrls
      || !Array.isArray(imageUrls)
      || !imageUrls.length 
      || !title
      || !summary
      || !tagline
      || !links
      || !Array.isArray(links)
      || links.length !== 3
      || !text
      || !servicesOffered
      || !Array.isArray(servicesOffered)
      || servicesOffered.length !== 3
      || !serviceImageUrls
      || !Array.isArray(serviceImageUrls)
      || serviceImageUrls.length !== 4
    ) { 
      console.log('[updateLanding] Invalid/Incomplete data');

      return _res.status(400).json({ 
        success: false,
        message: 'Invalid/Incomplete data',
      });
    };

    for (const _link of links) { 
      const { 
        icon,
        label,
        url,
      } = _link;

      if (
        !icon
        || !label
        || !url
      ) { 
        console.log(`[updateLanding] invalid/incomplete data: ${_link}`);

        return _res.status(400).json({ 
          success: false,
          message: 'Invalid/Incomplete data',
        });  
      };
    };

    for (const _service of servicesOffered) { 
      const { 
        header,
        description,
        icon,
      } = _service;

      if (
        !header
        || !description
        || !icon
      ) { 
        console.log(`[updateLanding] invalid/incomplete data: ${_service}`);

        return _res.status(400).json({ 
          success: false,
          message: 'Invalid/Incomplete data',
        });
      };
    };

    for (const _image of [...imageUrls, ...serviceImageUrls]) { 
      const { 
        url,
        publicId
      } = _image;

      if (!url || !publicId) { 
        console.log(`[updateLanding] invalid/incomplete data: ${_image}`);

        return _res.status(400).json({ 
          success: false,
          message: 'Invalid/Incomplete data',
        }); 
      };
    }

    const landing = await Landing.findOneAndUpdate(
      {},
      { 
        imageUrls,
        title,
        summary,
        tagline,
        links,
        servicesData,
      },
      { 
        new: true,
        upsert: true,
      },
    );

    const isUpdated = !!landing;

    if (!isUpdated) { 
      console.log('[updateLanding] Unable to update landing data');

      return _res.status(400).json({ 
        success: false,
        message: 'unable to update landing data',
      });
    };

    console.log('[updateLanding] Landing data updated successfully');

    // TODO:Verify status code for updating resource below.
    return _res.status(200).json({
      success: true,
      body: { 
        landing,
      },
      message: 'Landing data updated successfully',
    });


  } catch (_err) { 
    console.log(`[updateLanding] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });
  };
};

export { 
  readLanding,
  updateLanding,
};
