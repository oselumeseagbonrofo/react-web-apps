import { useState } from 'react';
//import styled from 'styled-components';
import Button from './Button';
import CustomInput from './Input';
// uses styled-components to create a react component based off of
// tagged template literals
// const TextButton = styled.button`
//   color: #f0b322;
//   border: none;

//   &:hover {
//     color: #f0920e;
//   }
// `;

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div
      id="auth-inputs"
      className="mx-auto w-full max-w-sm rounded bg-gradient-to-tr from-slate-800 to-slate-900 p-8 shadow-md"
    >
      <div className="mb-6 flex flex-col gap-2">
        <CustomInput
          label="email"
          invalid={emailNotValid}
          onChange={(event) => handleInputChange('email', event.target.value)}
          type="email"
        />
        <CustomInput
          label="password"
          invalid={passwordNotValid}
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
          type="password"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button className='text-amber-400 hover:text-[#ffffff]' type="button">Create a new account</button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
