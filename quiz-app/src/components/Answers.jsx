import { useRef } from "react";

const Answers = ({answers, answerState, selectedAnswer, onSelectAnswer}) => {
  const shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    // Shuffle Answers
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" ||
          answerState === "wrong") && isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              className={cssClass}
              onClick={() => onSelectAnswer(answer)}
              disabled = {selectedAnswer}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
