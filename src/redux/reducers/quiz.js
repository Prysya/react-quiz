import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE,
  RETRY_QUIZ,
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loadState: false,
  error: null,

  quiz: null,
  activeQuestion: 0,
  answerState: null,
  isFinished: false,
  results: {},
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loadState: true,
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loadState: false,
        quizes: action.quizes,
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loadState: false,
        error: action.error,
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loadState: false,
        quiz: action.quiz,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        activeQuestion: action.number,
      };
    case RETRY_QUIZ:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      };
    default:
      return state;
  }
}

export default quizReducer;
