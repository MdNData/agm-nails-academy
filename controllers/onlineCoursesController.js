import mongoose from "mongoose";
import OnlineCourse from "../models/onlineCourseModel.js";

export const getAllOnlineCourses = async (req, res) => {
  try {
    const courses = await OnlineCourse.find({ isPublished: true });
    res.status(200).json(courses);
  } catch (err) {
    console.error("Errore al recupero dei corsi:", err);
    res.status(500).json({ msg: "Errore server" });
  }
};

export const getSingleOnlineCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica che l'ID sia un ObjectId valido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "ID non valido",
      });
    }

    // Utilizza findById per semplificare la query
    const course = await OnlineCourse.findById(id);

    // Se il corso non viene trovato, restituisci errore
    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Cursul nu a fost găsit",
      });
    }

    // Converti il documento in oggetto e applica eventuali fallback per i campi non definiti
    const courseObj = course.toObject();
    const formattedCourse = {
      ...courseObj,
      elements: (courseObj.elements || []).map((el) => ({
        ...el,
        details:
          el.details && el.details.length > 0
            ? el.details
            : ["Informații indisponibilă"],
      })),
      chapters: (courseObj.chapters || []).map((ch) => ({
        ...ch,
        videos: (ch.videos || []).map((vid) => ({
          ...vid,
          duration: vid.duration || "00:00",
        })),
      })),
    };

    // Restituisci i dati formattati
    res.status(200).json({
      success: true,
      data: formattedCourse,
    });
  } catch (err) {
    console.error("Errore nel recupero del corso:", err);
    res.status(500).json({
      success: false,
      error: "Eroare server la preluarea cursului",
      details: err.message, // Utilizza questo campo solo per debugging
    });
  }
};
