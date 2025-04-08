import express from "express";
const router = express.Router();
import {
  getAllOnlineCourses,
  getSingleOnlineCourse,
} from "../controllers/onlineCoursesController.js";

// Rotte
router.get("/", getAllOnlineCourses);
router.get("/:id", getSingleOnlineCourse);

export default router;
