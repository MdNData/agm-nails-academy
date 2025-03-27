import React from "react";

const SubmitButton = ({ text = "Autentificare" }) => {
  return <button className="submit-button">{text}</button>;
};

export default SubmitButton;
