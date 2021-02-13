import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import ActiveQuiz from "../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../components/FinishedQuiz/FinishedQuiz";
import Spinner from "../components/UI/Spinner";

import {
  fetchQuizById,
  onAnswerClickHandler,
  retryHandler,
} from "../redux/actions/quiz";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-grow: 1;
  width: 100%;
  background: linear-gradient(90deg, #5041b2 0%, #7969e6 100%);
`;

const Title = styled.h1`
  color: white;
  margin-left: 10px;
`;

const QuizWrapper = styled.div`
  width: 600px;
`;

function Quiz(props) {
  useEffect(() => {
    props.fetchQuizById(props.match.params.id);

    return () => props.retryHandler();
  }, [props.match.params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <QuizWrapper>
        <Title>Ответьте на все вопросы</Title>

        {props.loadState || !props.quiz ? (
          <Spinner />
        ) : props.isFinished ? (
          <FinishedQuiz
            results={props.results}
            quiz={props.quiz}
            onRetry={props.retryHandler}
          />
        ) : (
          <ActiveQuiz
            question={props.quiz[props.activeQuestion].question}
            answers={props.quiz[props.activeQuestion].answers}
            onAnswerClick={props.onAnswerClickHandler}
            quizLength={props.quiz.length}
            questionNumber={props.activeQuestion + 1}
            answerState={props.answerState}
          />
        )}
      </QuizWrapper>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz.quiz,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  isFinished: state.quiz.isFinished,
  results: state.quiz.results,
  loadState: state.quiz.loadState,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuizById: (quizId) => dispatch(fetchQuizById(quizId)),
  onAnswerClickHandler: (answerId) => dispatch(onAnswerClickHandler(answerId)),
  retryHandler: () => dispatch(retryHandler()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
