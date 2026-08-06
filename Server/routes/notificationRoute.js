import express from "express";
import {
  getNotifications,
  getNotificationById,
  deleteNotification,
  clearNotifications,
    markAsRead,
    markAllAsRead,
    saveFcmToken,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getNotifications);
router.get("/:id", getNotificationById);
router.delete("/:id", deleteNotification);
router.delete("/", clearNotifications);
router.put("/:id/read", protect, markAsRead);
router.put("/read-all", protect, markAllAsRead);
router.post("/save-token", protect, saveFcmToken);

export default router;