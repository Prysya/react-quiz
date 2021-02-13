import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { createControl, validate, validateForm } from "../form/formFramework";
import Select from "../components/UI/Select";
import {
  createQuizQuestion,
  finishCreateQuiz,
} from "../redux/actions/createQuiz";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  flex-grow: 1;
  width: 100%;
  background: linear-gradient(270deg, #f0613c 0%, #f0783c 100%);
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  background: #eee;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errMessage: "Значение не может быть пустым",
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

const QuizCreator = (props) => {
  const [formControls, setFormControls] = React.useState(createFormControls());
  const [rightAnswerId, setRightAnswerId] = React.useState(1);
  const [isFormValid, setIsFormValid] = React.useState(false);

  const setStatesToDefault = () => {
    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControls());
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const changeHandler = (value, controlName) => {
    const newFormControls = { ...formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    newFormControls[controlName] = control;

    setFormControls(newFormControls);
    setIsFormValid(validateForm(formControls));
  };

  const addQuestionHandler = (evt) => {
    evt.preventDefault();

    const { question, option1, option2, option3, option4 } = formControls;

    const questionItem = {
      question: question.value,
      id: props.quiz.length + 1,
      rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    props.createQuizQuestion(questionItem);

    setStatesToDefault();
  };

  const createQuizHandler = (evt) => {
    evt.preventDefault();

    setStatesToDefault();

    props.finishCreateQuiz();
  };

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const {
        label,
        value,
        valid,
        validation,
        touched,
        errMessage,
      } = formControls[controlName];

      return (
        <React.Fragment key={controlName + index}>
          <Input
            key={controlName + index}
            label={label}
            value={value}
            valid={valid}
            shouldValidate={!!validation}
            touched={touched}
            errMessage={errMessage}
            onChange={(event) => changeHandler(event.target.value, controlName)}
          />
          {index === 0 && <hr />}
        </React.Fragment>
      );
    });
  };

  const selectChangeHandler = (evt) => {
    setRightAnswerId(Number(evt.target.value));
  };

  const select = (
    <Select
      label="Выберите правильный ответ"
      value={rightAnswerId}
      onChange={selectChangeHandler}
      options={[
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "3", value: "3" },
        { text: "4", value: "4" },
      ]}
    />
  );

  return (
    <Container>
      <Wrapper>
        <Title>Создание теста</Title>

        <Form onSubmit={submitHandler}>
          {renderControls()}

          {select}

          <Button
            type="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>
          <Button
            type="success"
            onClick={createQuizHandler}
            disabled={props.quiz.length === 0}
          >
            Создать тест
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    quiz: state.create.quiz,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
