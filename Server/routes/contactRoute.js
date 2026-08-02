import express from "express";
import { sendMessage,getMessages,deleteMessage } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", sendMessage);



router.get(
  "/admin",
  protect,
  adminOnly,
  getMessages
);

router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteMessage
);



export default router;