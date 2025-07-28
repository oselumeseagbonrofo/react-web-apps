import { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeOut, mode }) => {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeout);
    
    return () => {
        clearTimeout(timer);
    }

}, [timeout, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 100);
    }, 100);

    return () => {
        clearInterval(interval);
    }
  }, []);

  return <progress id="question-time" value={timeRemaining} max={timeout} className={mode} />;
};

export default QuestionTimer;
