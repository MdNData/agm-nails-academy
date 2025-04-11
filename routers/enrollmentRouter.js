import express from "express";
import {
  createEnrollment,
  confirmPayment,
  updateChapterProgress,
  getUserEnrollments,
} from "../controllers/enrollmentController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Crea una nuova enrollment (POST /enrollments)
router.post("/", authenticateUser, createEnrollment);

// Recupera le enrollment dell'utente corrente (GET /enrollments)
router.get("/", authenticateUser, getUserEnrollments);

// Conferma il pagamento per una enrollment (PATCH /enrollments/:enrollmentId/payment)
router.patch("/:enrollmentId/payment", authenticateUser, confirmPayment);

// Aggiorna il progresso di un capitolo per una enrollment (PATCH /enrollments/:enrollmentId/chapter-progress)
router.patch(
  "/:enrollmentId/chapter-progress",
  authenticateUser,
  updateChapterProgress
);

export default router;
