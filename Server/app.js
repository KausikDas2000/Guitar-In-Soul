import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import errorHandler from "./middleware/errorMiddleware.js";
import arrangementRoutes from "./routes/arrangementRoute.js";
import userRoutes from "./routes/userRoute.js";
import favoriteRoutes from "./routes/fevoriteRoute.js"
import adminRoutes from "./routes/adminRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import requestRoutes from "./routes/requestRoute.js";
import notificationRoutes from "./routes/notificationRoute.js";


const app = express();

// Middleware
app.use(
  cors({
    origin:  [
      "http://localhost:5173",
      "https://guitar-in-soul.vercel.app",
    ],

    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/arrangements", arrangementRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);


// Error Handler
app.use(errorHandler);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Guitar In Soul API",
  });
});

export default app;