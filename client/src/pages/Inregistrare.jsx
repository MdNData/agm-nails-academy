import RegisterComponent from "../assets/components/Access/Inregistrare/RegisterComponent";
import apiFetch from "../assets/utils/apiFetch.js";
import { useActionData } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await apiFetch.post("/access/register", data);
    window.location.href = "/cont";
  } catch (error) {
    return error.response?.data || error;
  }
};

const Inregistrare = () => {
  const error = useActionData();
  return <RegisterComponent serverInputError={error} />;
};

export default Inregistrare;
