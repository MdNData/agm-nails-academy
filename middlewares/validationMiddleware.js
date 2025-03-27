import { validationResult, body, param } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateUserRegistration = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email-ul este obligatoriu")
    .isEmail()
    .withMessage("Email-ul trebuie să fie valid")
    .custom(async (email) => {
      const isPresent = await User.findOne({ email });
      if (isPresent) throw new BadRequestError("Email deja folosit");
    }),
  body("password")
    .notEmpty()
    .withMessage("Parola este obligatorie")
    .isLength({ min: 8 })
    .withMessage("Parola prea scurtă. Utilizați cel puțin 8 caractere"),
]);

export const validateUserLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email-ul este obligatoriu")
    .isEmail()
    .withMessage("Email-ul trebuie să fie valid"),
  body("password").notEmpty().withMessage("Parola este obligatorie"),
]);

