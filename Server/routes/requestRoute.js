import express from "express";
import {
  createRequest,
  getRequests,
  getRequestById,
  voteRequest,
  updateRequestStatus,
  deleteRequest,
} from "../controllers/requestController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ======================
// User Routes
// ======================

// Create a new song request
router.post("/", protect, createRequest);

// Get all requests
router.get("/", getRequests);

// Get single request
router.get("/:id", getRequestById);

// Vote / Unvote
router.put("/vote/:id", protect, voteRequest);

// ======================
// Admin Routes
// ======================

// Change request status (Pending/Fulfilled)
router.put(
  "/admin/:id",
  protect,
  adminOnly,
  updateRequestStatus
);

// Delete request
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteRequest
);

export default router;