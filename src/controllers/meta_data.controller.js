import { MetaData } from "../models/meta_data.model.js";

const readMetaData = async (_req, _res) => { 
  try { 
    const metaData = await MetaData.findOne({});

    if (!metaData) { 
      console.log('[readMetaData] Meta data not found');

      return _res.status(404).json({ 
        success: false,
        message: 'Meta data not found',
      });
    };

    console.log('[readMetaData] Meta data read successfully');

    return _res.status(200).json({ 
      success: true,
      body: metaData,
      message: 'Meta data read successfully',
    });
  } catch (_err) { 
    console.log(`[readMetaData] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });
  };
};

const updateMetaData = async (_req, _res) => { 
  try { 
    const { 
      whatsappNumber,
      instagramUrl,
      threadsUrl,
      mainEmail,
      subEmail,
      city,
      country,
    } = _req.body;

    if (
      !whatsappNumber
      || !instagramUrl
      || !threadsUrl
      || !mainEmail
      || !subEmail
      || !city
      || !country
    ) { 
      console.log('incomplete/invalid request data');

      return _res.status(400).json({ 
        success: false,
        message: 'incomplete/invalid request data'
      });
    };

    const update = await MetaData.findOneAndUpdate(
      {},
      { 
        whatsappNumber,
        instagramUrl,
        threadsUrl,
        mainEmail,
        subEmail,
        city,
        country,  
      },
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

const addDataSet = async (_req, _res) => { 
  try { 
    const { 
      title,
      summary,
      body,
      list,
    } = _req.body;

    if (
      !title
      && !summary
      && !body
      && (!list || !Array.isArray(list))
    ) { 
      console.log('[addDataSet] Invalid request body');

      return _res.status(400).json({ 
        success: false,
        message: 'Invalid request body',
      });
    };

    if (list.length) { 
      for (const _item of list) { 
        const { 
          title,
          body,
          icon
        } = _item;

        if (
          !title
          || !body
          || !icon
        ) { 
          console.log('[addDataSet] Incomplete/Invalid list data');

          return _res.status(400).json({ 
            success: false,
            message: 'Incomplete/Invalid list data',
          });
        };
      };
    };

    const metaData = await MetaData.findOneAndUpdate(
      {},
      { 
        $push: { 
          datasets: { 
            title,
            summary,
            body,
            list,
          },
        },
      },
      { 
        new: true,
        upsert: true,
      },
    );

    console.log('[addDataSet] Dataset added successfully');

    return _res.status(201).json({ 
      success: true,
      message: 'Dataset added successfully',
    });
  } catch (_err) { 
    console.log(`[addDataSet] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });
  };
};

const deleteDataSet = async (_req, _res) => { 
  try { 
    const { datasetId } = _req.params;

    if (!datasetId) { 
      console.log('[deleteDataSet] Missing dataset id in request');

      return _res.status(400).json({ 
        success: false,
        message: 'Missing dataset id',
      });
    };

    const metaData = await MetaData.findOne({});

    const datasetToDelete = metaData.datasets.some(_ds => _ds._id.equals(datasetId));

    if (!datasetToDelete) { 
      console.log(`[deleteDataSet] dataset not found using id: ${datasetId}`);

      return _res.status(404).json({ 
        success: false,
        message: 'Dataset not found',
      });
    };

    await MetaData.updateOne(
      {},
      { 
        $pull: { 
          datasets: { 
            _id: datasetId
          },
        },
      },
    );

    console.log('[deleteDataSet] Dataset deleted successfully');

    return _res.status(202).json({ 
      success: true,
      body: metaData,
      message: 'Dataset deleted successfully',
    });
  } catch (_err) { 
    console.log(`[addDataSet] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internal server error',
    });   
  };
};

const updateDataSet = async (_req, _res) => { 
  try { 

  } catch (_err) { 
    console.log(`[updateDataSet] Internal server error: ${_err.message}`);

    return _res.status(500).json({ 
      success: false,
      message: 'Internals server error',
    });
  };
};

//TODO: Add Edit data set

export {
  readMetaData,
  updateMetaData,
  addDataSet,
  deleteDataSet,
};
