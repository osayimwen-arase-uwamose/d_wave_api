import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`);

    console.log('[connectDB] D-Wave-DB/MongoDB connection successful');
  } catch (_err) {
    console.log(`[connectDB] D-Wave-DB/MongoDB connection failed: ${_err.message}`);
    
    process.exit(1);
  };
};

export default connectDB;
