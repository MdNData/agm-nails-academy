import OnlineCourse from "../models/onlineCourseModel.js";

export const getAllOnlineCourses = async (req, res) => {
  try {
    const courses = await OnlineCourse.find({ isPublished: true });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getSingleOnlineCourse = async (req, res) => {
  try {
    const course = await OnlineCourse.findById(req.params.id)
      .select("-__v -createdAt -updatedAt")
      .lean();

    if (!course) {
      return res.status(404).json({
        success: false,
        error: "Cursul nu a fost găsit",
      });
    }

    const formattedCourse = {
      ...course,
      elements: course.elements.map((el) => ({
        ...el,
        details: el.details || ["Informații indisponibile"],
      })),
      chapters: course.chapters.map((ch) => ({
        ...ch,
        videos: ch.videos.map((vid) => ({
          ...vid,
          duration: vid.duration || "00:00",
        })),
      })),
    };

    res.status(200).json({
      success: true,
      data: formattedCourse,
    });
  } catch (err) {
    console.error("Eroare la obținerea cursului:", err);
    res.status(500).json({
      success: false,
      error: "Eroare server la preluarea cursului",
    });
  }
};