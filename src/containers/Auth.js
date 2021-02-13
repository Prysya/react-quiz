import React from "react";
import styled from "styled-components";

import isEmail from "validator/lib/isEmail";

import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { connect } from "react-redux";
import auth from "../redux/actions/auth";

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-grow: 1;
  width: 100%;
  background: linear-gradient(270deg, #cef2fa 0%, #59bfef 100%);
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 0 20px;
`;

const Title = styled.h1`
  color: #fff;
  text-align: center;
`;

const Form = styled.form`
  background: #eee;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 5px;
`;

const Auth = (props) => {
  const [formControls, setFormControls] = React.useState({
    email: {
      value: "",
      type: "email",
      label: "Email",
      errMessage: "Введите корректный Email",
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true,
      },
    },
    password: {
      value: "",
      type: "password",
      label: "Пароль",
      errMessage: "Введите корректный пароль",
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6,
      },
    },
  });
  const [isFormValid, setIsFormValid] = React.useState(false);

  const loginHandler = () => {
    props.auth(formControls.email.value, formControls.password.value, true);
  };

  const registerHandler = () => {
    props.auth(formControls.email.value, formControls.password.value, false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = isEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (event, input) => {
    const copiedFormControls = { ...formControls };
    const control = { ...formControls[input] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    copiedFormControls[input] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    setFormControls(copiedFormControls);
    setIsFormValid(isFormValid);
  };

  const renderInputs = () => {
    return Object.keys(formControls).map((input, index) => {
      const {
        type,
        value,
        valid,
        touched,
        label,
        errMessage,
        validation,
      } = formControls[input];

      return (
        <Input
          key={input + index}
          type={type}
          value={value}
          label={label}
          errMessage={errMessage}
          valid={valid}
          touched={touched}
          shouldValidate={!!validation}
          onChange={(event) => onChangeHandler(event, input)}
        />
      );
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Авторизация</Title>

        <Form onSubmit={submitHandler}>
          {renderInputs()}
          {console.log(isFormValid)}

          <Button type="success" onClick={loginHandler} disabled={!isFormValid}>
            Войти
          </Button>
          <Button
            type="primary"
            onClick={registerHandler}
            disabled={!isFormValid}
          >
            Зарегестрироваться
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
});

export default connect(null, mapDispatchToProps)(Auth);
