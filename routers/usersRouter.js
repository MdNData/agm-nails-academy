// userRoutes.js
import { Router } from "express";
import { getUserInfo, updateUserInfo } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/me", authenticateUser, getUserInfo);
router.put("/me", authenticateUser, updateUserInfo);

export default router;
