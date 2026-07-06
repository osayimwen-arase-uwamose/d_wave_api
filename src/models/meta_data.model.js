import { model, Schema } from "mongoose";

const metaDataSchema = new Schema({ 
  whatsappNumber: String,
  instagramUrl: String,
  threadsUrl: String,
  mainEmail: String,
  subEmail: String,

});

export const MetaData = model("MetaData", metaDataSchema);