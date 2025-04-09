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
import { toast } from "react-toastify";

const RegisterComponent = ({ serverInputError }) => {
  // Stato per il nome (campo "nume")
  const [nume, setNume] = useState("");
  const [numeError, setNumeError] = useState({ isError: null, msg: "" });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ isError: null, msg: "" });
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    isError: null,
    msg: "",
  });
  const [generalError, setGeneralError] = useState(true);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const serverActionData = useActionData();
  const navigate = useNavigate();

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
    if (
      serverActionData &&
      !serverActionData.error &&
      serverActionData.msg === "Utilizator creat cu succes"
    ) {
      navigate("/account");
    }
  }, [serverActionData, navigate]);

  useEffect(() => {
    const hasError =
      numeError.isError || emailError.isError || passwordError.isError;
    setGeneralError(hasError || !nume || !email || !password);
  }, [numeError, emailError, passwordError, nume, email, password]);

  return (
    <section className="register">
      <Form method="POST">
        <h2>Creare cont nou</h2>

        {/* Campo per il nome ("nume") */}
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

        <InputField
          name="password"
          label="Parola"
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
