import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  color: ${(props) => (props.valid ? "#000" : "#f01f30")};
  margin-bottom: 3px;
  padding: 0;
  display: block;
  font-weight: bold;
`;

const FormInput = styled.input`
  display: block;
  box-sizing: border-box;
  border: 1px solid #bebebe;
  padding: 7px;
  margin: 0 0 5px;
  width: 100%;
  outline: none;
  transition: all 0.3s ease-in-out;
`;

const Error = styled.span`
  color: #f01f30;
  font-size: 12px;
  font-weight: bold;
`;

const Input = ({
  type,
  label,
  value,
  onChange,
  errMessage,
  valid,
  touched,
  shouldValidate,
}) => {
  const inputType = type || "text";
  const htmlFor = `${inputType}-${Math.random()}`;

  const isInvalid = () => {
    return !valid && shouldValidate && touched;
  };

  return (
    <InputContainer>
      <Label htmlFor={htmlFor} valid={!isInvalid()}>
        {label}
      </Label>
      <FormInput
        id={htmlFor}
        type={inputType}
        value={value}
        onChange={onChange}
      />

      {isInvalid() && <Error>{errMessage}</Error>}
    </InputContainer>
  );
};

export default Input;
