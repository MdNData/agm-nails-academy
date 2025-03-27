export const checkPasswordRequirements = (password) => {
  // Check for minimum password length (e.g., at least 8 characters)
  if (password.length < 8) {
    return {
      isError: true,
      msg: "parola trebuie să aibă cel puțin 8 caractere",
    };
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    return {
      isError: true,
      msg: "parola trebuie să includă cel puțin o literă mică",
    };
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    return {
      isError: true,
      msg: "parola trebuie să includă cel puțin o literă mare",
    };
  }

  // Check for numbers
  if (!/\d/.test(password)) {
    return {
      isError: true,
      msg: "parola trebuie să includă cel puțin un număr",
    };
  }

  // Check for special characters (you can customize this character set)
  if (!/[!@#\$%\^&\*\(\)_\+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    return {
      isError: true,
      msg: "parola trebuie să includă cel puțin un caracter special",
    };
  }

  return {
    isError: false,
    msg: "",
  };
};

export const checkEmailRequirements = (email, serverInputError = "") => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      isError: true,
      msg: "emailul trebuie sa fie valid",
    };
  } else if (serverInputError?.response?.data?.msg == "email deja folosit") {
    serverInputError.response.data.msg = "";
    return {
      isError: true,
      msg: "email deja folosit",
    };
  } else {
    return {
      isError: false,
      msg: "",
    };
  }
};
