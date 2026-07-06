import { About } from "../models/about.model.js";

const readAbout = async (_req, _res) => { 
  try { 
    const about = await About.findOne({});

    if (!about) { 
      console.log('[readAbout] About data not found');

      return _res.status(404).json({ 
        success: false,
        message: 'About data not found',
      });
    };

    console.log('[readAbout] About data read successfully');

    return _res.status(200).json({ 
      success: true,
      body: about,
      message: 'About data read successfully',
    });
  } catch (_err) { 
    console.log(`[readAbout] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });
  };
};

const updateAbout = async (_req, _res) => { 
  try { 
    const { 
      imageUrls,
      title,
      text,
      businessDetails,
      missionStatement,
      visionary,
    } = _req.body;

    const missiontitle = missionStatement.title; 
    const missionText = missionStatement.text;
    const missionSubDetails = missionStatement.msSubDetails;

    const { quote, name, } = visionary;
    const visionaryPosition = visionary.position;
    const visionaryText = visionary.text;
    const visionaryImageUrl = visionary.imageUrl;

    if (
      !imageUrls
      || !Array.isArray(imageUrls)
      || !imageUrls.length
      || !title
      || !text
      || !businessDetails
      || !Array.isArray(businessDetails)
      || businessDetails.length !== 3
      || !missionStatement
      || !visionary
      || !missiontitle
      || !missionText
      || !missionSubDetails
      || !Array.isArray(missionSubDetails)
      || missionSubDetails.length !== 2
      || !name
      || !visPositon
      || !visionaryText
      || !visionaryImageUrl
    ) { 
      console.log('[updateAbout] Invalid/Incomplete data');

      return _res.status(400).json({ 
        success: false,
        message: 'Invalid/Incomplete data',
      });
    };

    for (const _detail of businessDetails) { 
      const { 
        icon,
        title,
        value,
      } = _detail;

      if (
        !icon
        || !title
        || !value
      ) { 
        console.log(`[updateAbout] invalid/incomplete data: ${_detail}`);

        return _res.status(400).json({ 
          success: false,
          message: 'Invalid/Incomplete data',
        });   
      };
    };


    for (const _subDetail of missionSubDetails) { 
      const { 
        imageUrl,
        title,
      } = _subDetail;

      if (!imageUrl || !title) { 
        console.log(`[updateAbout] invalid/incomplete data: ${_subDetail}`);

        return _res.status(400).json({ 
          success: false,
          message: 'Invalid/Incomplete data',
        }); 
      };
    };

    const update = await About.findOneAndUpdate(
      {},
      { 
        imageUrls,
        title,
        text,
        businessDetails,
        missionStatement,
        visionary,
      },
      { 
        new: true,
        upsert: true,
      },
    );

    const isUpdated = !!update;

    if (!isUpdated) { 
      console.log('[updateAbout] Unable to update about data');

      return _res.status(400).json({ 
        success: false,
        message: 'unable to update about data',
      });   
    };

    console.log('[updateAbout] About data updated successfully');

    // TODO:Verify status code for updating resource below.
    return _res.status(200).json({
      success: true,
      body: update,
      message: 'About data updated successfully',
    });
  } catch (_err) { 
    console.log(`[updateAbout] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });
  };
};

export { 
  readAbout,
  updateAbout,
};