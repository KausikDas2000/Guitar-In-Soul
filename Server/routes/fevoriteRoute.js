import express from "express";

import {
  toggleFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/fevoriteController.js";

import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:songId", protect, toggleFavorite);
router.get("/", protect, getFavorites);
router.delete("/:songId", protect, removeFavorite);

export default router;