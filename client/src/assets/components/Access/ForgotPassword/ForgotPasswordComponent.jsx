import React, { useState } from "react";
import { Form } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import InputField from "../InputField/InputField";
import { validateInput } from "../Inregistrare/validateInput";
import SubmitButton from "../SubmitButton/SubmitButton";

const ForgotPasswordComponent = ({ serverInputError }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ isError: null, msg: "" });

  const isSubmitting = navigation.state === "submitting";
  return (
    <section className="register">
      <Form mathod="POST">
        <h2>Resetare Parola</h2>

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

        <SubmitButton text={"Trimite Cerera"} isSubmitting={isSubmitting} />
      </Form>
    </section>
  );
};

export default ForgotPasswordComponent;
