import LoginComponent from "../assets/components/Access/Autentificare/LoginComponent";
import apiFetch from "../assets/utils/apiFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await apiFetch.post("/access/login", data);
    toast.success("Autentificare reușită! Redirect în cont..."); 
    window.location.href = "/cont";
  } catch (error) {
    const errorMessage =
      error.response?.data?.msg || "Eroare la autentificare.";
    toast.error(errorMessage); 
    return error.response.data;
  }
};

const Autentificare = () => {
  return <LoginComponent />;
};
export default Autentificare;
