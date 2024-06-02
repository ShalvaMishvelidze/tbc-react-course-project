import React from "react";

const InputContainer = ({
  t,
  handleChange,
  keyName,
  type,
  user,
  maxLength,
}: any) => {
  return (
    <div className="input-group">
      <label htmlFor={keyName}>{t}</label>
      <input
        onChange={handleChange}
        data-type={keyName}
        name={keyName}
        type={type}
        maxLength={maxLength ? maxLength : 256}
        value={user[keyName]}
      />
    </div>
  );
};

export default InputContainer;
