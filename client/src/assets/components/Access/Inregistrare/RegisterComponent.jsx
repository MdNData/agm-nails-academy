import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { FiMail, FiLock } from "react-icons/fi";
import SubmitButton from "../SubmitButton/SubmitButton";
import { Link, useNavigation, Form } from "react-router-dom";
import { validateInput } from "./validateInput.js";
import { toast } from "react-toastify"; // Importa toastify

const RegisterComponent = ({ serverInputError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState({
    isError: null,
    msg: "",
  });
  const [passwordError, setPasswordError] = useState({
    isError: null,
    msg: "",
  });

  const [generalError, setGeneralError] = useState(null);

  // Mostra toast se c'è un errore inviato dal server
  useEffect(() => {
    if (serverInputError) {
      const errorMessage =
        typeof serverInputError === "string"
          ? serverInputError
          : serverInputError.msg || "A apărut o eroare la înregistrare.";
      toast.error(errorMessage);
    }
  }, [serverInputError]);

  useEffect(() => {
    setGeneralError(emailError.isError || passwordError.isError ? true : false);
    if (!email || !password) {
      setGeneralError(true);
    }
  }, [emailError, passwordError]);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <section className="register">
      <Form method="POST">
        <h2>Creare cont nou</h2>
        <InputField
          name="email"
          placeholder="nume@email.com"
          iconElement={<FiMail />}
          value={email}
          setValue={setEmail}
          error={emailError}
          setError={setEmailError}
          validate={validateInput}
          isSubmitting={isSubmitting}
          serverInputError={serverInputError}
        />
        <InputField
          name="password"
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="••••••••"
          iconElement={<FiLock />}
          error={passwordError}
          setError={setPasswordError}
          validate={validateInput}
          isSubmitting={isSubmitting}
        />
        <SubmitButton
          text="Înregistrează-te"
          generalError={generalError}
          isSubmitting={isSubmitting}
        />
        <Link to="/autentificare">Ai deja cont? Autentifică-te aici</Link>
      </Form>
    </section>
  );
};

export default RegisterComponent;
