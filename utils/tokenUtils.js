import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const createJWT = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    throw new Error("Sesiunea a expirat, vă rugăm să vă logați din nou.");
  }
};

export const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Sesiunea a expirat, vă rugăm să vă logați din nou.");
  }
};

export const verifyJWTReset = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.purpose === "resetPassword") {
      const user = await User.findById(decoded.userId);
      if (!user) {
        throw new Error("Utilizatorul nu a fost găsit.");
      }
      if (user.passwordChangedAt) {
        const changedTimestamp = Math.floor(
          user.passwordChangedAt.getTime() / 1000
        );

        if (
          !decoded.passwordChangedAt ||
          decoded.passwordChangedAt < changedTimestamp
        ) {
          throw new Error(
            "Sesiunea a expirat, vă rugăm să reîncercați procedura."
          );
        }
      }
    }

    return decoded;
  } catch (error) {
    throw new Error("Sesiunea a expirat, vă rugăm să reîncercați procedura.");
  }
};

export const createJWTReset = (payload, user) => {
  try {
    const newPayload = {
      ...payload,
      passwordChangedAt: user.passwordChangedAt
        ? Math.floor(user.passwordChangedAt.getTime() / 1000)
        : null,
    };
    const token = jwt.sign(newPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    throw new Error("Eroare la crearea tokenului JWT");
  }
};
