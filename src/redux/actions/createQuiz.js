import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "../../constants/axios-config";

const createQuizQuestion = (item) => ({
  type: CREATE_QUIZ_QUESTION,
  item
});

const resetQuizCreation = () => ({
  type: RESET_QUIZ_CREATION,
})

const finishCreateQuiz = () => async (dispatch, getState) => {
  await axios.post('/quizes.json', getState().create.quiz);
  dispatch(resetQuizCreation());
};

export {createQuizQuestion, finishCreateQuiz, resetQuizCreation};
