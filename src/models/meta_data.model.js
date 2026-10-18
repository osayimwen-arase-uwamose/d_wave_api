import { model, Schema } from "mongoose";

const metaDataSchema = new Schema({ 
  whatsappNumber: String,
  instagramUrl: String,
  threadsUrl: String,
  mainEmail: String,
  subEmail: String,
  city: String,
  country: String,
  datasets: [{ 
    title: { 
      type: String,
    },

    summary: { 
      type: String,
    },

    body: { 
      type: String
    },

    list: [{ 
      title: {
        type: String,
      },

      body: { 
        type: String,
      },

      icon: String,
    }],
  }],
});

export const MetaData = model("MetaData", metaDataSchema);
