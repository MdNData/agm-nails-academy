import { StatusCodes } from "http-status-codes";
import { hashPassword, validatePassword } from "../utils/passwordUtils.js";
import { createJWT, verifyJWT } from "../utils/tokenUtils.js";
import User from "../models/userModel.js";
import {
  sendForgotPasswordEmail,
  sendWelcomeEmail,
} from "../utils/emailService.js"; // Importa il servizio email

// Controller pentru înregistrare
export const register = async (req, res) => {
  try {
    // Hash-ul parolei
    req.body.password = await hashPassword(req.body.password);

    // Crearea utilizatorului - modelul trebuie să conțină și câmpul "nume"
    const user = await User.create(req.body);

    // Crearea token-ului JWT
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

    // Invia emailul de bun venit (dacă eșuează, doar logăm eroarea)
    sendWelcomeEmail(user.email, user.nume).catch((err) => {
      console.error("Eroare la trimiterea emailului de bun venit:", err);
    });

    // Includi un campo redirectUrl in risposta
    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Utilizator creat cu succes", redirectUrl: "/account" });
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
        .json({ msg: "Email incorect" });
    }

    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Prolă incorectă" });
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

    res
      .status(StatusCodes.OK)
      .json({ msg: "Autentificare reușită", redirectUrl: "/account" });
  } catch (error) {
    console.error("Eroare la login:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă. Vă rugăm să încercați din nou mai târziu.",
    });
  }
};

//controller reset parola
export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.OK).json({
        msg: "Dacă adresa dvs. de e-mail este corectă, veți primi un e-mail cu instrucțiuni pentru resetarea parolei. Dacă nu primiți e-mailul în următoarele 20 de minute, verificați dacă ați introdus corect adresa de email sau creați un cont nou.",
      });
    }

    const resetToken = createJWT({
      userId: user._id,
      purpose: "resetPassword",
    });

    const resetUrl = `https://agm-shop-and-academy.onrender.com/reset/${resetToken}`;
    sendForgotPasswordEmail(user.email, resetUrl).catch((err) => {
      console.error("Eroare la trimiterea emailului de resetare parola:", err);
    });

    res.status(StatusCodes.OK).json({
      msg: "Dacă adresa dvs. de e-mail este corectă, veți primi un e-mail cu instrucțiuni pentru resetarea parolei. Dacă nu primiți e-mailul în următoarele 20 de minute, verificați dacă ați introdus corect adresa de email sau creați un cont nou.",
    });
  } catch (error) {
    console.error("Eroare la trimiterea cereri:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Eroare internă. Vă rugăm să încercați din nou mai târziu.",
    });
  }
};

//controller completare reset parola
export const completeResetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Parolele nu corespund." });
  }

  try {
    const decoded = verifyJWT(token);
    if (decoded.purpose !== "resetPassword") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Token expirat sau nu este valid." });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Utilizatorul nu a fost gasit." });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    await user.save();

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Parola a fost actualizata cu success!" });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Token expirat sau nu este valid." });
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
