import { useState } from "react";

// Output values seperately
const INVESTMENT_VARIABLES = {
  initialInvestment: "Initial Investment",
  annualInvestment: "Annual Investment",
  expectedReturn: "Expected Return",
  duration: "Duration",
};
const UserInput = ({ name, value, type, handleChange }) => {
  return (
    <p>
      <label htmlFor={name}>{INVESTMENT_VARIABLES[name]}</label>
      <input
        id={name}
        name={name}
        value={value[name]}
        placeholder={`Enter ${name}`}
        type={type}
        onChange={(e) => handleChange(name, e.target.value)}
      ></input>
    </p>
  );
};

export default UserInput;
