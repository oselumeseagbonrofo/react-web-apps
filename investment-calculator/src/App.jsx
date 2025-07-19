import { useState } from "react";
import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";

const INVESTMENT_VARIABLES = {
  initialInvestment: "initialInvestment",
  annualInvestment: "annualInvestment",
  expectedReturn: "expectedReturn",
  duration: "duration",
};

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 20,
    annualInvestment: 33,
    expectedReturn: 72,
    duration: 2,
  });

  const inputIsValid = userInput.duration >= 1;

  const handleUserInput = (id, newValue) => {
    setUserInput((prevUserInput) => {
      return { ...prevUserInput, [id]: +newValue };
    });
  };

  return (
    <>
      <Header />
      <section id="user-input">
        <div className="input-group">
        <UserInput
          name={INVESTMENT_VARIABLES.initialInvestment}
          type="number"
          value={userInput}
          handleChange={handleUserInput}
        />
        <UserInput
          name={INVESTMENT_VARIABLES.annualInvestment}
          type="number"
          value={userInput}
          handleChange={handleUserInput}
        />
        </div>
        <div className="input-group">
        <UserInput
          name={INVESTMENT_VARIABLES.expectedReturn}
          type="number"
          value={userInput}
          handleChange={handleUserInput}
        />
        <UserInput
          name={INVESTMENT_VARIABLES.duration}
          type="number"
          value={userInput}
          handleChange={handleUserInput}
        />
        </div>
      </section>
      {!inputIsValid && (
        <p className="center">Please enter a valid duration &gt;= 1</p>
      )}
      {inputIsValid && <Results investmentVariables={userInput} />}
    </>
  );
}

export default App;
