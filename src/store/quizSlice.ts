import { createSlice } from "@reduxjs/toolkit";
import { quizData } from "../utils/constants";
import { act } from "react";

const todoSlice = createSlice({
  name: "quiz",
  initialState: {
    currentQuestion: 0,
    answers: {} as any,
    score: 0,
    hasCompleted: false,
  },
  reducers: {
    handleAnswer: (state, action) => {
      const { index, answer } = action.payload;
      if (state.answers[index] !== undefined) {
        if (state.answers[index] === quizData[state.currentQuestion].answer) {
          state.score -= 1;
        }
      }

      state.answers[index] = answer;
      if (answer === quizData[state.currentQuestion].answer) {
        state.score += 1;
      }
    },
    handleNext: (state, action) => {
      if (state.currentQuestion < quizData.length - 1) {
        state.currentQuestion += 1;
      } else {
        state.hasCompleted = true;
      }
    },
    handleBack: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
      }
    },
  },
});

export const { handleAnswer, handleNext, handleBack } = todoSlice.actions;
export default todoSlice.reducer;
