import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

import { toggleLike } from "../controllers/arrangementController.js";

import {
  createArrangement,
  getAllArrangements,
  getArrangementById,
  updateArrangement,
  deleteArrangement,
} from "../controllers/arrangementController.js";
import { incrementDownload } from "../controllers/arrangementController.js";

import { addView } from "../controllers/arrangementController.js";



const router = express.Router();
router.post("/:id/view", addView);

router.put(
  "/:id",
  protect,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "notationPdf", maxCount: 1 },
    { name: "audioFile", maxCount: 1 },
  ]),
  updateArrangement
);

router.put(
  "/:id/download",protect,
  incrementDownload
);


router.get("/", getAllArrangements);

router.get("/:id",protect, getArrangementById);

router.post(
  "/",
  protect,

  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "notationPdf",
      maxCount: 1,
    },
    {
      name: "audioFile",
      maxCount: 1,
    },
  ]),

  createArrangement
);


router.put("/:id/like", protect, toggleLike);

router.delete("/:id", protect, deleteArrangement);


export default router;