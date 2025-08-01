import useInput from "../hooks/useInput";
import Input from "./Input";
import {isEmail, isNotEmpty, hasMinLength, isEqualsToOtherValue} from "../util/validation"

export default function Login() {
  const {value: emailValue, handleInputBlur: handleEmailBlur, handleInputChange: handleEmailChange, hasError: emailHasError} = useInput('', 
    (value) => isEmail(value) && isNotEmpty(value)
  );
   const {value: passwordValue, handleInputBlur: handlePasswordBlur, handleInputChange: handlePasswordChange, hasError: passwordHasError} = useInput('', 
    (value) => hasMinLength(value, 6) && isNotEmpty(value)
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError){
      console.log(passwordHasError)
      console.log(emailHasError)
      return;
    }

    console.log(emailValue, passwordValue);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && <p>Enter valid email</p>}
        />

        <Input
          id="password"
          type="password"
          label="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && <p>Enter Password of 6 or more characters</p>}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
