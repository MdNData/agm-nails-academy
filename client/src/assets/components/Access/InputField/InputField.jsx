import React from "react";

const InputField = ({
  name = "",
  label,
  type = "text",
  value = "",
  required = true,
  autocomplete = "on",
  placeholder = "",
  iconElement = "",
}) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>
        <p>{label || name}</p>
        {iconElement}
        <input
          type={type}
          name={name}
          defaultValue={value}
          autoComplete={autocomplete}
          required={required}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default InputField;
