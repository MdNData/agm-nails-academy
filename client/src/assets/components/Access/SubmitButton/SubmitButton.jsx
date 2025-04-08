import React from "react";

const SubmitButton = ({ text, generalError, isSubmitting }) => {
  return (
    <button
      type="submit"
      className="submit-button"
      disabled={generalError || isSubmitting}
    >
      {isSubmitting ? <div className="spinner"></div> : text}
    </button>
  );
};

export default SubmitButton;
