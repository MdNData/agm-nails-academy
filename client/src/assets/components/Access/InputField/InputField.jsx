import React, { useState } from "react";

const InputField = ({
  name = "",
  label,
  type = "text",
  value = "",
  required = true,
  autoComplete = "on",
  placeholder = "",
  iconElement = "",
  error,
  setError,
  validate,
  isSubmitting,
  serverInputError,
  setValue,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (isTouched) {
      const validationResult = validate(inputValue, name, serverInputError);
      setError(validationResult);
    }
  };

  const handleBlur = () => {
    setIsTouched(true);
    const validationResult = validate(value, name, serverInputError);
    setError(validationResult);
  };

  let borderColor = "rgb(209, 213, 219)";
  if (isTouched) {
    if (error && error.isError) {
      borderColor = "red";
    } else if (!error?.isError && value) {
      borderColor = "green";
    }
  }

  return (
    <div className="input-field">
      <label htmlFor={name}>
        <p>{label || name}</p>
        {iconElement}
        <input
          type={type}
          name={name}
          value={value}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor }}
        />
      </label>
      {isTouched && error && error.isError && (
        <div className="error-message">{error.msg}</div>
      )}
    </div>
  );
};

export default InputField;
