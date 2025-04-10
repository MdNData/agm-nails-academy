import React, { useState, useEffect } from "react";
import apiFetch from "../assets/utils/apiFetch";
import { FiLock } from "react-icons/fi";
import {
  Form,
  useActionData,
  useNavigation,
  useParams,
} from "react-router-dom";
import InputField from "../assets/components/Access/InputField/InputField";
import SubmitButton from "../assets/components/Access/SubmitButton/SubmitButton";
import Overlay from "../assets/components/Access/ForgotPassword/Overlay/Overlay";
import { checkPasswordRequirements } from "../assets/utils/checkInputRequirements";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.newPassword !== data.confirmPassword) {
    return { error: "Parolele nu corespund." };
  }

  const passwordCheck = checkPasswordRequirements(data.newPassword);
  if (passwordCheck.isError) {
    return { error: passwordCheck.msg };
  }

  try {
    const response = await apiFetch.post(`/access/reset/${data.token}`, {
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Eroare la resetarea parolei." };
  }
};

const ResetPassword = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const [newPasswordError, setNewPasswordError] = useState({
    isError: false,
    msg: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    isError: false,
    msg: "",
  });

  useEffect(() => {
    const validation = checkPasswordRequirements(newPassword);
    setNewPasswordError(validation);

    let confirmError = { isError: false, msg: "" };
    if (confirmPassword && confirmPassword !== newPassword) {
      confirmError = { isError: true, msg: "Parolele nu corespund." };
    }
    setConfirmPasswordError(confirmError);

    // Verifica validità complessiva del form
    const isValid =
      !validation.isError &&
      !confirmError.isError &&
      newPassword !== "" &&
      confirmPassword !== "";
    setIsFormValid(isValid);
  }, [newPassword, confirmPassword]);

  return (
    <section className="register">
      <Form method="POST">
        <h2>Resetarea Parolei</h2>
        <input type="hidden" name="token" value={token} />
        <InputField
          label="Parolă Nouă"
          name="newPassword"
          value={newPassword}
          setValue={setNewPassword}
          type="password"
          placeholder="••••••••"
          iconElement={<FiLock />}
          error={newPasswordError}
          setError={setNewPasswordError}
          isSubmitting={isSubmitting}
          // Non è necessario passare "validate" qui, poiché usiamo useEffect per la validazione
        />
        <InputField
          label="Confirma Parolă"
          name="confirmPassword"
          value={confirmPassword}
          setValue={setConfirmPassword}
          type="password"
          placeholder="••••••••"
          iconElement={<FiLock />}
          error={confirmPasswordError}
          setError={setConfirmPasswordError}
          isSubmitting={isSubmitting}
        />
        {actionData && (
          <Overlay
            type={actionData.error ? "error" : "success"}
            msg={actionData.error || actionData.msg}
          />
        )}
        <SubmitButton
          text={"Reseta Parola"}
          isSubmitting={isSubmitting}
          disabled={!isFormValid}
        />
      </Form>
    </section>
  );
};

export default ResetPassword;
