// routes/cartRoutes.js
import express from "express";
import {
  getCart,
  addCourseToCart,
  deleteCartItem,
  getCountItemCart,
} from "../controllers/cartController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ottieni il carrello (GET /cart)
router.get("/", authenticateUser, getCart);

//Ottieni quanti elementi ci sono nel carrello
router.get("/item-count", authenticateUser, getCountItemCart);

// Aggiungi o aggiorna un corso nel carrello (POST /cart)
router.post("/", authenticateUser, addCourseToCart);

// Rimuovi un corso dal carrello (DELETE /cart/:itemId)
router.delete("/:itemId", authenticateUser, deleteCartItem);

export default router;
