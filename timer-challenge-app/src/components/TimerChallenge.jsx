import { useState, useRef, Fragment } from "react";
import ResultModal from "./ResultModal";
import { use } from "react";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timer = useRef();
  const accessDialog = useRef();

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // it expires to prevent infinite loop
    accessDialog.current.open(); // Open the result modal when the timer expires
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    // Start the timer challenge
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
    }, 100);
  }

  function handleStop() {
    clearInterval(timer.current);
    accessDialog.current.open(); // Open the result modal when the timer is stopped
  }

  return (
    <Fragment>
      <ResultModal
        ref={accessDialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {<p>Challenge Expired. You lose</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer Inactive"}
        </p>
      </section>
    </Fragment>
  );
}
