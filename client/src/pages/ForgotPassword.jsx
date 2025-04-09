import React from "react";
import ForgotPasswordComponent from "../assets/components/Access/ForgotPassword/ForgotPasswordComponent";
import { useActionData } from "react-router-dom";
import apiFetch from "../assets/utils/apiFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await apiFetch.post("/access/reset-password", data);
  } catch (error) {
    return error.response?.data || error;
  }
};

const ForgotPassword = () => {
  const error = useActionData();
  return <ForgotPasswordComponent serverInputError={error} />;
};

export default ForgotPassword;
