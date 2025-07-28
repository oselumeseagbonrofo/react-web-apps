import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  // Check if quiz is complete
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;


  // To allow user answer selection
  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    },
    []
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );


  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers} />
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      </div>
    </div>
  );
};

export default Quiz;
