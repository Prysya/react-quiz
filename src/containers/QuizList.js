import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Spinner from "../components/UI/Spinner";
import { connect } from "react-redux";
import { fetchQuizes } from "../redux/actions/quiz";

const QuizListContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-grow: 1;
  width: 100%;
  background: linear-gradient(90deg, #fd8355 0%, #f0576c 37%, #f79cbd 100%);
`;

const Title = styled.h1`
  color: #fff;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  margin-bottom: 10px;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: #fff;

  &:hover {
    color: #363f54;
  }
`;

const QuizList = (props) => {
  const renderQuizes = () =>
    props.quizes.map((quiz) => {
      return (
        <Item key={quiz.id}>
          <Link to={`/quiz/${quiz.id}`}>{quiz.name}</Link>
        </Item>
      );
    });

  useEffect(() => props.fetchQuizes(), []);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <QuizListContainer>
      <div>
        <Title>Список тестов</Title>

        {props.loadState && props.quizes.length !== 0 ? (
          <Spinner />
        ) : (
          <List>{renderQuizes()}</List>
        )}
      </div>
    </QuizListContainer>
  );
};

const mapStateToProps = (state) => ({
  quizes: state.quiz.quizes,
  loadState: state.quiz.loadState,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuizes: () => dispatch(fetchQuizes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
