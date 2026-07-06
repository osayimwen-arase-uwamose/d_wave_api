import dotenv from "dotenv"
import connectDB from "./config/connect_db.js"
import app from "./app.js";

dotenv.config();

(async () => {
  try {
    await connectDB();

    app.on('error', (_err) => {
      console.log(`[server] Error starting server: ${_err.message}`);
      throw new Error(_err);
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`[server] Server is running on port: ${PORT}`);
    });
  } catch (_err) {
    console.log(`[server] Server failed to start: ${_err}`);

    process.exit(1);
  }
})();
