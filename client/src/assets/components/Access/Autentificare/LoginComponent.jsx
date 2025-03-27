import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";
import { Link, Form, useNavigation, useActionData } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

const LoginComponent = ({ serverInputError }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState({ isError: null, msg: "" });
  const [passwordError, setPasswordError] = useState({
    isError: null,
    msg: "",
  });
  const [generalError, setGeneralError] = useState(null);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const serverError = useActionData();

  useEffect(() => {
    setGeneralError(emailError.isError || passwordError.isError ? true : false);
    if (!email || !password) {
      setGeneralError(true);
    }
  }, [emailError, passwordError, serverInputError]);

  return (
    <section className="login">
      <Form method="POST">
        <h2>Intra în contul tău</h2>
        {serverError && <p className="error-msg">{serverError.msg}</p>}
        <InputField
          name="email"
          placeholder="nume@email.com"
          iconElement={<FiMail />}
          value={email}
          setValue={setEmail}
          error={emailError}
          setError={setEmailError}
          isSubmitting={isSubmitting}
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
          isSubmitting={isSubmitting}
        />
        <SubmitButton
          text="Autentifică-te"
          generalError={generalError}
          isSubmitting={isSubmitting}
        />
        <Link to="/register">Nu ai cont? Înregistrează-te aici</Link>
      </Form>
    </section>
  );
};

export default LoginComponent;
