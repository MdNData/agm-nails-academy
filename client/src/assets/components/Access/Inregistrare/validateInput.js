import {
  checkEmailRequirements,
  checkPasswordRequirements,
} from "../../../utils/checkInputRequirements";

export const validateInput = (value, name, setError, serverInputError = "") => {
  value = value.trim();

  if (value === "") {
    setError({
      isError: null,
      msg: "",
    });
    return;
  }

  if (name === "email") {
    setError(checkEmailRequirements(value, serverInputError));
    return;
  }

  if (name === "password") {
    setError(checkPasswordRequirements(value));
    return;
  }

  setError({
    isError: false,
    msg: "",
  });
};
