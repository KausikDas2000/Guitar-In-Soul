import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { updateProfileImage } from "../controllers/userController.js";
import { getProfile } from "../controllers/userController.js";
import { updateProfile } from "../controllers/userController.js";
import { getProfileStats } from "../controllers/userController.js";

const router = express.Router();

router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  updateProfileImage
);
// routes/userRoutes.js
router.get("/profile", protect, getProfile);

router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

router.get("/profile/stats", protect, getProfileStats);

export default router;