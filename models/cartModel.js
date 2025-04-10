// cartmodel.js
import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  itemRef: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["physical", "online", "product"],
  },
  selectedPrice: {
    value: {
      type: String,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    accreditation: {
      type: Boolean,
      required: true,
    },
    advancePayment: {
      type: Boolean,
      required: true,
    },
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
