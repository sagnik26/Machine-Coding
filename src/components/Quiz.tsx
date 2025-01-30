import { useState } from "react";
import { quizData } from "../utils/constants";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedBack] = useState("");
  const [hasFinished, setHasFinished] = useState(false);

  const handleAnswer = (item: any) => {
    setAnswer(item);
    if (item === quizData[currentQuestion].answer) {
      setFeedBack("Correct Answer!");
    } else {
      setFeedBack("Wrong Answer!");
    }
  };

  const handleNext = () => {
    setAnswer(null);
    setFeedBack("");
    if (answer === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setHasFinished(true);
      setFeedBack("");
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      {hasFinished && (
        <div>
          <h1>Exam is Finished!</h1>
          <h1>Score: {score}</h1>
        </div>
      )}

      {!hasFinished && (
        <>
          <h2>{quizData[currentQuestion].question}</h2>
          {quizData[currentQuestion].options.map((item: any, index: number) => {
            return (
              <button
                onClick={() => handleAnswer(item)}
                style={{
                  marginLeft: 5,
                  border: "none",
                  backgroundColor:
                    answer === item
                      ? item === quizData[currentQuestion].answer
                        ? "green"
                        : "red"
                      : "",
                }}
              >
                {index + 1}
                {". "}
                {item}
              </button>
            );
          })}
          <p>{feedback}</p>

          <div
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button onClick={handleNext}>
              {currentQuestion === quizData.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
