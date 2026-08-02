import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getAllUsers } from "../controllers/adminController.js";
import { getAnalytics } from "../controllers/adminController.js";
import {
    getAllArrangements,
    deleteArrangement,
} from "../controllers/adminController.js";
import { deleteUser } from "../controllers/adminController.js";
import { updateUserRole } from "../controllers/adminController.js";


const router = express.Router();



router.get(
    "/analytics",
    protect,
    adminOnly,
    getAnalytics
);

router.get(
    "/arrangements",
    protect,
    adminOnly,
    getAllArrangements
);

router.delete(
    "/arrangements/:id",
    protect,
    adminOnly,
    deleteArrangement
);

router.put("/users/:id/role", protect, adminOnly, updateUserRole);


router.delete("/users/:id", protect, adminOnly, deleteUser);

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/dashboard", protect, adminOnly, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin",
        admin: req.user,
    });
});

export default router;