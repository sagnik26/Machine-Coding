import { useEffect, useState } from "react";
import { quizData } from "../utils/constants";
import { handleAnswer, handleNext, handleBack } from "../store/quizSlice";
import { useDispatch, useSelector } from "react-redux";

const Quiz = () => {
  const [feedback, setFeedBack] = useState("");
  const dispatch = useDispatch();
  const { currentQuestion, answers, score, hasCompleted } = useSelector(
    (state: any) => state.quiz
  );

  console.log(answers);

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      {hasCompleted && (
        <div>
          <h1>Exam is Finished!</h1>
          <h1>Score: {score}</h1>
        </div>
      )}

      {!hasCompleted && (
        <>
          <h2>{quizData[currentQuestion].question}</h2>
          {quizData[currentQuestion].options.map((item: any, index: number) => {
            return (
              <button
                onClick={() =>
                  dispatch(
                    handleAnswer({
                      index: currentQuestion,
                      answer: item,
                    })
                  )
                }
                style={{
                  marginLeft: 5,
                  border: "none",
                  backgroundColor:
                    answers[currentQuestion] === item
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
            <button onClick={() => dispatch(handleBack())}>back</button>
            <button onClick={() => dispatch(handleNext(currentQuestion))}>
              {currentQuestion === quizData.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
