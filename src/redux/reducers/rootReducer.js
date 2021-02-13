import { combineReducers } from "redux";

import quizReducer from "./quiz";
import createQuizReducer from "./createQuizReducer";
import authReducer from "./auth";

export default combineReducers({
  quiz: quizReducer,
  create: createQuizReducer,
  auth: authReducer,
});
