import { useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

const Question = ({ index, onSelectAnswer, onSkipAnswer }) => {
  const [userAnswers, setUserAnswers] = useState({
    answer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (userAnswers.answer) {
    timer = 1000;
  }

  if (userAnswers.isCorrect != null) {
    timer = 2000;
  }

  const handleSelectAnswer = (answer) => {
    setUserAnswers({
      answer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setUserAnswers({
        answer: answer,
        isCorrect: answer === QUESTIONS[index].answers[0],
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };
  let answerState = "";

  if (userAnswers.answer && userAnswers.isCorrect != null) {
    answerState = userAnswers.isCorrect ? "correct" : "wrong";
  } else if (userAnswers.answer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeOut={userAnswers.answer === "" ? onSkipAnswer: null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        answerState={answerState}
        selectedAnswer={userAnswers.answer}
        onSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
