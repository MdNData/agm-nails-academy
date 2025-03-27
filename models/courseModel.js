import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    secondTitle: {
      type: String,
      required: true,
    },
    thirdTitle: {
      type: String,
      required: false,
    },
    price: {
      type: String,
      required: true,
    },
    price2: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: true,
    },
    elements: [
      {
        id: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        details: {
          type: [String],
          required: false,
        },
        days: [
          {
            id: {
              type: Number,
              required: true,
            },
            title: {
              type: String,
              required: true,
            },
            lista: {
              type: [String],
              required: false,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
