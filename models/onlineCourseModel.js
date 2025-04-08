import mongoose from "mongoose";

const OnlineCourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Titlul este obligatoriu"] },
    secondTitle: String,
    thirdTitle: String,
    price: { type: String, required: [true, "Prețul este obligatoriu"] },
    price2: String,
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
              match: /^([0-5]?\d):([0-5]\d)$/,
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

// Validatore personalizzato
function arrayLimit(val) {
  return val.length >= 1;
}

export default mongoose.model("OnlineCourse", OnlineCourseSchema);

