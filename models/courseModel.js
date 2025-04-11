// courseModel.js
import mongoose from "mongoose";

const PriceDetailSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, "Il prezzo è obbligatorio"],
    validate: {
      validator: function (v) {
        return (
          v === "Gratis" || /^\d{1,3}(?:\.\d{3})*(?:,\d{2})?\s?RON$/.test(v)
        );
      },
      message: (props) =>
        `${props.value} non è un formato prezzo valido! Esempio: 1.500,00 RON`,
    },
  },
  days: {
    type: Number,
    required: true,
    min: [1, "Minimo 1 giorno"],
    max: [5, "Massimo 5 giorni"],
    default: 1,
  },
  accreditation: {
    type: Boolean,
    required: true,
    default: false,
  },
  advancePayment: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Il titolo principale è obbligatorio"],
    },
    secondTitle: {
      type: String,
      required: [true, "Il sottotitolo è obbligatorio"],
    },
    thirdTitle: String,
    prices: [PriceDetailSchema],
    img: {
      type: String,
      required: [true, "L'immagine è obbligatoria"],
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: (props) => `${props.value} non è un URL valido!`,
      },
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
        details: [String],
        days: [
          {
            id: Number,
            title: String,
            lista: [String],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual per calcolare il prezzo con anticipo
CourseSchema.virtual("prices.withAdvance").get(function () {
  return this.prices.map((price) => {
    if (price.advancePayment) {
      const baseValue = parseFloat(
        price.value.replace(/\./g, "").replace(",", ".")
      );
      const total = baseValue + 500;
      return {
        ...price.toObject(),
        total: total.toLocaleString("it-IT", {
          style: "currency",
          currency: "RON",
        }),
      };
    }
    return price;
  });
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
