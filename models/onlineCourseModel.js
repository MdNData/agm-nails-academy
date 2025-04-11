import mongoose from "mongoose";

function arrayLimit(val) {
  return val.length >= 1;
}

const OnlineCourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Titlul este obligatoriu"] },
    secondTitle: String,
    thirdTitle: String,

    // Cambiato per supportare più prezzi
    prices: [
      {
        value: { type: String, required: [true, "Prețul este obligatoriu"] },
        days: {
          type: Number,
          required: [true, "Numărul de zile este obligatoriu"],
        },
        accreditation: { type: Boolean, required: true },
        advancePayment: { type: Boolean, required: true },
      },
    ],

    img: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} nu este o URL validă!`,
      },
    },
    duration: {
      type: String,
      required: [true, "Durata este obligatorie"],
      enum: ["1 săptămână", "2 săptămâni", "1 lună", "3 luni", "6 luni"],
    },
    elements: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        details: {
          type: [String],
          validate: [arrayLimit, "Minim 1 detaliu necesar"],
        },
      },
    ],
    chapters: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        description: String,
        videos: [
          {
            id: { type: Number, required: true },
            title: { type: String, required: true },
            url: {
              type: String,
              required: true,
              validate: {
                validator: function (v) {
                  return /^(http|https):\/\/[^ "]+$/.test(v);
                },
                message: (props) => `${props.value} nu este o URL validă!`,
              },
            },
            duration: {
              type: String,
              match: /^([0-5]?\d):([0-5]\d)$/, // Formato "MM:SS"
            },
          },
        ],
      },
    ],
    isPublished: { type: Boolean, default: false },
    isPurchased: { type: Boolean, default: false },
    progress: { type: String, default: "0%" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OnlineCourse = mongoose.model("OnlineCourse", OnlineCourseSchema);
export default OnlineCourse;
