import { StatusCodes } from "http-status-codes";
import { hashPassword, validatePassword } from "../utils/passwordUtils.js";
import { createJWT, verifyJWT } from "../utils/tokenUtils.js";
import User from "../models/userModel.js";

// Controller pentru înregistrare
export const register = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);

    const user = await User.create(req.body);

    const token = createJWT({
      userId: user._id,
      email: user.email,
    });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    res.status(StatusCodes.CREATED).json({ msg: "Utilizator creat cu succes" });
  } catch (error) {
    console.error("Eroare la înregistrarea utilizatorului:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Eroare la înregistrarea utilizatorului" });
  }
};

// Controller pentru login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Email sau parolă incorectă" });
    }

    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Email sau parolă incorectă" });
    }

    const token = createJWT({
      userId: user._id,
      email: user.email,
    });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    res.status(StatusCodes.OK).json({ msg: "Autentificare reușită" });
  } catch (error) {
    console.error("Eroare la login:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă. Vă rugăm să încercați din nou mai târziu.",
    });
  }
};

// Controller pentru verificarea autentificării
export const verifyLogin = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Nu sunteți autentificat." });
    }

    // Dezactivează caching-ul pentru această rută
    res.setHeader("Cache-Control", "no-store");

    const decoded = verifyJWT(token);
    res.status(StatusCodes.OK).json({ user: decoded });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "Sesiune expirată. Vă rugăm să vă autentificați din nou.",
      });
    }
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "Token invalid. Vă rugăm să vă autentificați din nou.",
    });
  }
};

// Controller pentru logout
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "V-ați deconectat cu succes." });
};
