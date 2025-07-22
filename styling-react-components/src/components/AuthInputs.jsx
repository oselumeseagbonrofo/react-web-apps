import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import CustomInput from "./Input";
// uses styled-components to create a react component based off of
// tagged template literals
const ControlDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  //for nested styling
  & label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: "#6b7280";
  }
  & label.invalid {
    color: #f87171;
  }
`;

const TextButton = styled.button`
  color: #f0b322;
  border: none;

  &:hover {
    color: #f0920e;
  }
`;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlDiv>
        {/* 
        Example using nested strings with Styled Components
        <p>
          <label className={emailNotValid ? 'invalid' : undefined}>Email</label>
          <Input
            type="email"
            //className={emailNotValid ? 'invalid' : undefined}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p>
          <label className={passwordNotValid ? 'invalid' : undefined}>Password</label>
          <Input
            $invalid={passwordNotValid}
            type="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </p> */}
        <CustomInput
          label="email"
          invalid={emailNotValid}
          onChange={(event) => handleInputChange("email", event.target.value)}
          type="email"
        />
        <CustomInput
          label="password"
          invalid={passwordNotValid}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          type="password"
        />
      </ControlDiv>
      <div className="actions">
        <TextButton type="button">Create a new account</TextButton>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
