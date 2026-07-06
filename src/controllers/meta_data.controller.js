import { MetaData } from "../models/meta_data.model.js";

const updateMetaData = async (_req, _res) => { 
  try { 
    const update = await MetaData.findOneAndUpdate(
      {},
      { ..._req.body },
      { 
        new: true,
        upsert: true,
      },
    );

    const isUpdated = !!update;

    if (!isUpdated) { 
      console.log('[updateMetaData] Unable to update. Meta data not found');

      // TODO: Verify status code below.
      return _res.status(400).json({ 
        success: false,
        message: 'Unable to update meta data',
      });
    };

    console.log('[updateMetaData] Meta data updated successfully');

    return _res.status(202).json({ 
      success: true,
      body: update,
      message: 'Meta data updated successfully',
    });
  } catch (_err) { 
    console.log(`[updateMetaData] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });
  };
};

export {
  updateMetaData,
};
