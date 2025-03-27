import { Router } from "express";
import Course from "../models/courseModel.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find(); 
    res.status(200).json(courses); 
  } catch (error) {
    res.status(500).json({ msg: "Eroare la obținerea cursurilor", error });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id); 
    if (!course) {
      return res.status(404).json({ msg: "Cursul nu a fost găsit" });
    }
    res.status(200).json(course); 
  } catch (error) {
    res.status(500).json({ msg: "Eroare la obținerea cursului", error });
  }
});

export default router;
