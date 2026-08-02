import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { forgotPassword } from "../controllers/authController.js";
import { resetPassword } from "../controllers/authController.js";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/authController.js";



const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/me", protect, getCurrentUser);

router.put("/profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;