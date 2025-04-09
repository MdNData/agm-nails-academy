import React, { useState } from "react";
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

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.newPassword !== data.confirmPassword) {
    return { error: "Parolele nu corespund." };
  }
  console.log(data.token);
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
  const [newPasswordError, setNewPasswordError] = useState({
    isError: null,
    msg: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    isError: null,
    msg: "",
  });

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
        <SubmitButton text={"Reseta Parola"} />
      </Form>
    </section>
  );
};

export default ResetPassword;
