import Cart from "../models/cartModel.js";
import Course from "../models/courseModel.js";
import OnlineCourse from "../models/onlineCourseModel.js"; // Importa per i corsi online
import { StatusCodes } from "http-status-codes";

// Recupera il carrello dell'utente corrente
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(StatusCodes.OK).json({ cart: { items: [] } });
    }
    // Popola dinamicamente ogni item in base a category
    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        if (item.category === "physical") {
          const course = await Course.findById(item.itemRef);
          return { ...item.toObject(), itemRef: course };
        } else if (item.category === "online") {
          const onlineCourse = await OnlineCourse.findById(item.itemRef);
          return { ...item.toObject(), itemRef: onlineCourse };
        } else {
          // Se è un prodotto o altra categoria: gestire qui oppure restituire l'item così com'è
          return item;
        }
      })
    );
    cart = cart.toObject();
    cart.items = populatedItems;
    res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    console.error("Errore nel recupero del carrello:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă la obținerea coșului.",
    });
  }
};

// Conta il numero di articoli nel carrello
export const getCountItemCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res.status(StatusCodes.OK).json({ itemCount: 0 });
    }
    const itemCount = cart.items.length;
    res.status(StatusCodes.OK).json({ itemCount });
  } catch (error) {
    console.error("Errore la contare articoli in coș:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă la contare articoli.",
    });
  }
};

// Aggiunge o aggiorna un elemento nel carrello
export const addCourseToCart = async (req, res) => {
  try {
    const { courseId, selectedPrice, category } = req.body;
    if (!courseId || !selectedPrice || !category) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Date incomplete." });
    }
    // Verifica l'esistenza nel modello in base alla categoria
    let courseExists = null;
    if (category === "physical") {
      courseExists = await Course.findById(courseId);
    } else if (category === "online") {
      courseExists = await OnlineCourse.findById(courseId);
    }
    // Se categoria "product" puoi aggiungere controlli con il modello Product
    if (!courseExists) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Elementul nu a fost găsit." });
    }
    // Trova o crea il carrello dell'utente
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      cart = await Cart.create({ user: req.user.userId, items: [] });
    }
    // Cerca se l'elemento è già presente (verifica sia l'ID che la categoria)
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.itemRef.toString() === courseId && item.category === category
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].selectedPrice = selectedPrice;
    } else {
      cart.items.push({ itemRef: courseId, selectedPrice, category });
    }
    await cart.save();
    res.status(StatusCodes.OK).json({
      msg: "Elementul a fost adăugat în coș.",
      cart,
    });
  } catch (error) {
    console.error("Eroare la adăugarea în coș:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă la adăugarea în coș.",
    });
  }
};

// Elimina un elemento dal carrello
export const deleteCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Coșul nu a fost găsit." });
    }
    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();
    res.status(StatusCodes.OK).json({
      msg: "Elementul a fost eliminat din coș.",
      cart,
    });
  } catch (error) {
    console.error("Eroare la eliminarea din coș:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă la eliminarea din coș.",
    });
  }
};
