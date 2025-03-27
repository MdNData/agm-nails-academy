import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Nu sunteți autentificat." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Utilizatorul nu mai există. Vă rugăm să vă autentificați din nou.",
      });
    }

    req.user = { userId: user._id, email: user.email };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Sesiune expirată. Vă rugăm să vă autentificați din nou.",
      });
    }
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Token invalid. Vă rugăm să vă autentificați din nou." });
  }
};
