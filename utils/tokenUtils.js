import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    console.error("Errore nella creazione del token JWT:", error);
    throw new Error("Errore nella creazione del token JWT");
  }
};

export const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Errore nella verifica del token JWT:", error);
    throw new Error("Token JWT non valido");
  }
};
