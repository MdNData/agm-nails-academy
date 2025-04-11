import UserCourse from "../models/userCourseModel.js";
import { StatusCodes } from "http-status-codes";

// Crea una nuova enrollment per un corso
export const createEnrollment = async (req, res) => {
  try {
    const { courseId, courseType } = req.body; // courseType: "physical" oppure "online"
    if (!courseId || !courseType) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Date incomplete pentru înregistrare." });
    }
    // Verifica se esiste già un enrollment per questo corso
    let enrollment = await UserCourse.findOne({
      user: req.user.userId,
      course: courseId,
    });
    if (enrollment) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Cursul este deja achiziționat.",
      });
    }
    enrollment = await UserCourse.create({
      user: req.user.userId,
      course: courseId,
      courseType,
      paymentConfirmed: false, // inizialmente false
      progress: 0,
      chaptersProgress: [],
    });
    res.status(StatusCodes.CREATED).json({
      msg: "Înregistrare creată cu succes.",
      enrollment,
    });
  } catch (error) {
    console.error("Eroare la crearea înregistrării:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă la crearea înregistrării.",
    });
  }
};

// Conferma la plata per un enrollment
export const confirmPayment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const enrollment = await UserCourse.findById(enrollmentId);
    if (!enrollment) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Înregistrarea nu a fost găsită." });
    }
    enrollment.paymentConfirmed = true;
    await enrollment.save();
    res.status(StatusCodes.OK).json({
      msg: "Plata a fost confirmată.",
      enrollment,
    });
  } catch (error) {
    console.error("Eroare la confirmarea plății:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă la confirmarea plății.",
    });
  }
};

// Aggiorna il progresso per un capitolo specifico
export const updateChapterProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { chapterId, completed, totalChapters } = req.body; // totalChapters: totale capitoli del corso
    const enrollment = await UserCourse.findById(enrollmentId);
    if (!enrollment) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Înregistrarea nu a fost găsită." });
    }
    // Cerca se il capitolo esiste già in chaptersProgress
    let chapterProgress = enrollment.chaptersProgress.find(
      (ch) => ch.chapterId === chapterId
    );
    const now = new Date();
    if (chapterProgress) {
      chapterProgress.completed = completed;
      chapterProgress.completedAt = completed ? now : null;
    } else {
      enrollment.chaptersProgress.push({
        chapterId,
        completed,
        completedAt: completed ? now : null,
      });
    }
    // Se viene fornito il totale dei capitoli, ricalcola la percentuale complessiva
    if (totalChapters && totalChapters > 0) {
      const completedCount = enrollment.chaptersProgress.filter(
        (ch) => ch.completed
      ).length;
      enrollment.progress = Math.round((completedCount / totalChapters) * 100);
      if (enrollment.progress === 100) {
        enrollment.courseCompletedAt = now;
      }
    }
    await enrollment.save();
    res.status(StatusCodes.OK).json({
      msg: "Progres actualizat.",
      enrollment,
    });
  } catch (error) {
    console.error("Eroare la actualizarea progresului:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă la actualizarea progresului.",
    });
  }
};

// Recupera le enrollment per l'utente corrente
export const getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await UserCourse.find({ user: req.user.userId });
    res.status(StatusCodes.OK).json({ enrollments });
  } catch (error) {
    console.error("Eroare la obținerea înregistrărilor:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă la obținerea înregistrărilor.",
    });
  }
};
