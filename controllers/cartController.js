// controllers/cartController.js
import Cart from "../models/cartModel.js";
import Course from "../models/courseModel.js";
import { StatusCodes } from "http-status-codes";

// Recupera il carrello dell'utente corrente (già presente)
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate(
      "items.course"
    );
    if (!cart) {
      return res.status(StatusCodes.OK).json({ cart: { items: [] } });
    }
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    console.error("Errore nel recupero del carrello:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Eroare internă la obținerea coșului." });
  }
};

//Conta il numero di prodotti nel carrello
export const getCountItemCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      return res.status(StatusCodes.OK).json({ itemCount: 0 });
    }
    console.log(cart.items.length);
    const nmCart = cart.items.length;
    res.status(StatusCodes.OK).json({ itemCount: nmCart });
  } catch (error) {}
};

// Aggiunge o aggiorna un corso nel carrello (già presente)
export const addCourseToCart = async (req, res) => {
  try {
    const { courseId, selectedPrice } = req.body;
    // Verifica l'esistenza del corso
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Cursul nu a fost găsit." });
    }

    // Trova o crea il carrello dell'utente
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      cart = await Cart.create({ user: req.user.userId, items: [] });
    }

    // Se il corso esiste già, aggiorna il selectedPrice, altrimenti lo aggiunge
    const itemIndex = cart.items.findIndex(
      (item) => item.course.toString() === courseId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].selectedPrice = selectedPrice;
    } else {
      cart.items.push({ course: courseId, selectedPrice });
    }

    await cart.save();
    res
      .status(StatusCodes.OK)
      .json({ msg: "Cursul a fost adăugat în coș.", cart });
  } catch (error) {
    console.error("Eroare la adăugarea cursului în coș:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Eroare internă la adăugarea în coș." });
  }
};

// Nuove funzionalità: elimina un elemento dal carrello
export const deleteCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    // Trova il carrello dell'utente
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Coșul nu a fost găsit." });
    }
    // Filtra l'array degli items, rimuovendo quello con _id uguale a itemId
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();
    res
      .status(StatusCodes.OK)
      .json({ msg: "Cursul a fost eliminat din coș.", cart });
  } catch (error) {
    console.error("Eroare la eliminarea cursului din coș:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Eroare internă la eliminarea din coș." });
  }
};
