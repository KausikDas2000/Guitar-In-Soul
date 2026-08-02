import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import { register } from "./controllers/authController.js";

dotenv.config();



const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });