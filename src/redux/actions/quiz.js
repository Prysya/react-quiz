import axios from "../../constants/axios-config";

import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE,
  RETRY_QUIZ,
} from "./actionTypes";

const fetchQuizesStart = () => ({ type: FETCH_QUIZES_START });

const fetchQuizesSuccess = (quizes) => ({
  type: FETCH_QUIZES_SUCCESS,
  quizes,
});

const fetchQuizesError = (error) => ({ type: FETCH_QUIZES_ERROR, error });

const fetchQuizes = () => async (dispatch) => {
  dispatch(fetchQuizesStart());

  const quizesTemp = [];

  try {
    const res = await axios.get("quizes.json");

    Object.keys(res.data).forEach((key, index) => {
      quizesTemp.push({ id: key, name: `Тест №${index + 1}` });
    });

    dispatch(fetchQuizesSuccess(quizesTemp));
  } catch (err) {
    dispatch(fetchQuizesError(err));
  }
};

const fetchQuizSuccess = (quiz) => ({
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  });

const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
};

const quizNextQuestion = (number) => {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  };
};

const finishQuiz = () => ({ type: FINISH_QUIZ });

const isQuizFinished = (state) =>
  state.activeQuestion + 1 === state.quiz.length;

const onAnswerClickHandler = (answerId) => (dispatch, getState) => {
  const state = getState().quiz;

  if (state.answerState) {
    const key = Object.keys(state.answerState)[0];

    if (state.answerState[key] === "success") {
      return;
    }
  }

  const question = state.quiz[state.activeQuestion];
  const results = state.results;

  if (question.rightAnswerId === answerId) {
    if (!results[question.id]) {
      results[question.id] = "success";
    }

    dispatch(quizSetState({ [answerId]: "success" }, results));

    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz());
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1));
      }

      window.clearTimeout(timeout);
    }, 1000);
  } else {
    results[question.id] = "error";
    dispatch(quizSetState({ [answerId]: "error" }, results));
  }
};

const fetchQuizById = (quizId) => async (dispatch) => {
  dispatch(fetchQuizesStart());

  try {
    const res = await axios.get(`quizes/${quizId}.json`);

    const quiz = res.data;

    dispatch(fetchQuizSuccess(quiz));
  } catch (error) {
    dispatch(fetchQuizesError(error));
  }
};

const retryHandler = () => ({
  type: RETRY_QUIZ,
});

export {
  fetchQuizes,
  fetchQuizesStart,
  fetchQuizesError,
  fetchQuizesSuccess,
  fetchQuizById,
  fetchQuizSuccess,
  onAnswerClickHandler,
  quizSetState,
  finishQuiz,
  quizNextQuestion,
  isQuizFinished,
  retryHandler,
};
