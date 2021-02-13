import React from "react";
import styled from "styled-components";

import AnswersList from "./AnswersList";

const ActiveQuizContainer = styled.div`
  padding: 20px;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  margin: 0 10px;
  box-sizing: border-box;
`;

const Question = styled.p`
  display: flex;
  justify-content: space-between;
`;

function ActiveQuiz({
  question,
  answers,
  onAnswerClick,
  questionNumber,
  quizLength,
  answerState,
}) {

  return (
    <ActiveQuizContainer>
      <Question>
        <span>
          <strong>{questionNumber}.&nbsp;</strong>
          {question}
        </span>

        <small>
          {questionNumber} из {quizLength}
        </small>
      </Question>

      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        answerState={answerState}
      />
    </ActiveQuizContainer>
  );
}

export default ActiveQuiz;
