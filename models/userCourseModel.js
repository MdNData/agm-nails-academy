// userCourseModel.js
import mongoose from "mongoose";

const ChapterProgressSchema = new mongoose.Schema(
  {
    chapterId: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

const UserCourseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    courseType: {
      type: String,
      required: true,
      enum: ["physical", "online"],
    },
    paymentConfirmed: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Number,
      default: 0,
    },
    chaptersProgress: {
      type: [ChapterProgressSchema],
      default: [],
    },
    courseCompletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const UserCourse = mongoose.model("UserCourse", UserCourseSchema);
export default UserCourse;
