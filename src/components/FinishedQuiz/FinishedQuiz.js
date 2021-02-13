import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "../UI/Button";

const FinishedQuizContainer = styled.div`
  padding: 20px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 0 10px;
`;

const QuizList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const QuizItem = styled.li``;

const Icon = styled.i`
  margin-left: 10px;
  color: ${(props) =>
    props.answerState === "success"
      ? "rgba(161, 240, 69, .7)"
      : "rgba(240, 87, 108, .7)"}}
`;

const FinishedQuiz = ({ quiz, results, onRetry }) => {
  const successCount = Object.keys(results).reduce((acc, key) => {
    if (results[key] === "success") {
      acc += 1;
    }

    return acc;
  }, 0);

  return (
    <FinishedQuizContainer>
      <QuizList>
        {quiz.map((quizItem, index) => {
          const cls = [
            "fa",
            results[quizItem.id] === "success" ? "fa-check" : "fa-times",
          ];

          return (
            <QuizItem key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <Icon
                className={cls.join(" ")}
                answerState={results[quizItem.id]}
              />
            </QuizItem>
          );
        })}
      </QuizList>

      <p>
        Правильно {successCount} из {quiz.length}
      </p>

      <div>
        <Button onClick={onRetry} type={"primary"}>
          Повторить
        </Button>
        <Link to={"/"}>
          <Button type={"success"}>
            Перейти в список тестов
          </Button>
        </Link>
      </div>
    </FinishedQuizContainer>
  );
};

export default FinishedQuiz;
