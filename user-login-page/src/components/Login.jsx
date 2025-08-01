import { useState, useRef } from "react";

export default function Login() {
  const [loginIsInvalid, setLoginIsInvalid] = useState({
    email: false,
    password: false,
  });
  const emailRef = useRef();
  const passwordRef = useRef();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const emailIsValid = email.includes("@");
    if (!emailIsValid) {
      setLoginIsInvalid((prev) => ({ ...prev, email: true }));
    } else {
      setLoginIsInvalid((prev) => ({ ...prev, email: false }));
    }

    const passwordIsValid = password.length > 6;
    if (!passwordIsValid) {
      setLoginIsInvalid((prev) => ({ ...prev, password: true }));
    } else {
      setLoginIsInvalid((prev) => ({ ...prev, password: false }));
    }

    console.log("Form submitted");
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleInputChange}
            ref={emailRef}
          />
          <div className="control-error">
            {loginIsInvalid.email && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleInputChange}
            ref={passwordRef}
          />
          <div className="control-error">
            {loginIsInvalid.password && <p>Please enter a valid password.</p>}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
