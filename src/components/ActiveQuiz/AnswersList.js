import React from "react";
import styled from "styled-components";

import AnswerItem from "./AnswerItem";

const AnswersListContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

function AnswersList({ answers, onAnswerClick, answerState }) {
  return (
    <AnswersListContainer>
      {answers.map((answer, i) => {
        return (
          <AnswerItem
            answer={answer}
            key={i}
            onAnswerClick={onAnswerClick}
            answerState={answerState ? answerState[answer.id] : null}
          />
        );
      })}
    </AnswersListContainer>
  );
}

export default AnswersList;
