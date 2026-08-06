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


// Get all notifications
router.get(
  "/",
  protect,
  getNotifications
);


// Get single notification
router.get(
  "/:id",
  protect,
  getNotificationById
);


// Delete notification
router.delete(
  "/:id",
  protect,
  deleteNotification
);


// Clear all notifications
router.delete(
  "/",
  protect,
  clearNotifications
);


// Mark one as read
router.put(
  "/:id/read",
  protect,
  markAsRead
);


// Mark all as read
router.put(
  "/read-all",
  protect,
  markAllAsRead
);


// Save Firebase token
router.post(
  "/save-token",
  protect,
  saveFcmToken
);


export default router;