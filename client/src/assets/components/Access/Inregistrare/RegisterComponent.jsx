import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import SubmitButton from "../SubmitButton/SubmitButton";
import {
  Link,
  useNavigation,
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { validateInput } from "./validateInput.js";
import { checkPasswordRequirements } from "../../../utils/checkInputRequirements.js";
import { toast } from "react-toastify";

const RegisterComponent = ({ serverInputError }) => {
  // Stato per il nome ("nume")
  const [nume, setNume] = useState("");
  const [numeError, setNumeError] = useState({ isError: false, msg: "" });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ isError: false, msg: "" });
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    isError: false,
    msg: "",
  });
  const [generalError, setGeneralError] = useState(true);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const serverActionData = useActionData();
  const navigate = useNavigate();

  // Notifica eventuali errori provenienti dal server
  useEffect(() => {
    if (serverInputError) {
      const errorMessage =
        typeof serverInputError === "string"
          ? serverInputError
          : serverInputError.msg || "A apărut o eroare la înregistrare.";
      toast.error(errorMessage);
    }
  }, [serverInputError]);

  // Gestione reindirizzamento in caso di registrazione avvenuta con successo
  useEffect(() => {
    if (
      serverActionData &&
      !serverActionData.error &&
      serverActionData.msg === "Utilizator creat cu succes"
    ) {
      navigate("/account");
    }
  }, [serverActionData, navigate]);

  // Effetto che controlla l'aggiornamento dello stato di validità complessivo del form
  useEffect(() => {
    const hasError =
      numeError.isError || emailError.isError || passwordError.isError;
    setGeneralError(hasError || !nume || !email || !password);
  }, [numeError, emailError, passwordError, nume, email, password]);

  // Handler per il submit del form: viene controllata la validità di tutti i campi
  const handleSubmit = (e) => {
    // Ricalcola le validazioni per ciascun campo
    const numeValidation = validateInput(nume, "nume", serverInputError);
    const emailValidation = validateInput(email, "email", serverInputError);
    const passwordValidation = checkPasswordRequirements(password);
    setNumeError(numeValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    // Se c'è un errore o se uno dei campi è vuoto, blocca l'invio
    if (
      numeValidation.isError ||
      emailValidation.isError ||
      passwordValidation.isError ||
      !nume ||
      !email ||
      !password
    ) {
      e.preventDefault();
      toast.error(
        "Vă rugăm să corectați erorile înainte de a trimite formularul."
      );
      return;
    }
  };

  return (
    <section className="register">
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Creare cont nou</h2>

        {/* Campo "nume" */}
        <InputField
          label="Nume"
          name="nume"
          placeholder="Nume complet"
          iconElement={<FiUser />}
          value={nume}
          setValue={setNume}
          error={numeError}
          setError={setNumeError}
          validate={validateInput}
          isSubmitting={isSubmitting}
          serverInputError={serverInputError}
        />

        {/* Campo "email" */}
        <InputField
          name="email"
          label="Email"
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

        {/* Campo "password" */}
        <InputField
          name="password"
          label="Parolă"
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="••••••••"
          iconElement={<FiLock />}
          error={passwordError}
          setError={setPasswordError}
          validate={checkPasswordRequirements}
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
