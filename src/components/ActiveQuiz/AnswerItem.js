import React from "react";
import styled from "styled-components";

const AnswerItemContainer = styled.li`
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  background: ${(props) => {
    if (props.answerState) {
      if (props.answerState === "success") {
        return "rgba(161, 240, 69, .7)";
      } else {
        return "rgba(240, 87, 108, .7)";
      }
    }
    return "inherit";
  }}}

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transition: background 0.3s ease-in-out;
  }
`;

const AnswerItem = ({ answer: { text, id }, onAnswerClick, answerState }) => {
  return (
    <AnswerItemContainer
      onClick={() => onAnswerClick(id)}
      answerState={answerState}
    >
      {text}
    </AnswerItemContainer>
  );
};

export default AnswerItem;
