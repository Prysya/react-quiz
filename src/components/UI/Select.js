import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin: 0 0 3px 0;
  padding: 0;
  font-weight: bold;
  display: block;
`;

const SelectTag = styled.select`
  display: block;
  box-sizing: border-box;
  border: 1px solid #bebebe;
  margin: 0 0 5px;
  height: 29px;
  width: 100%;
  outline: none;
  transition: all 300ms ease-in-out;
`;

const Select = ({ label, value, onChange, options }) => {
  const htmlFor = `${label}-${Math.random()}`;

  return (
    <Container>
      <Label htmlFor={htmlFor}>{label}</Label>
      <SelectTag id={htmlFor} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option value={option.value} key={option.value + index}>
            {option.text}
          </option>
        ))}
      </SelectTag>
    </Container>
  );
};

export default Select;
