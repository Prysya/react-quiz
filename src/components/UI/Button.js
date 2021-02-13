import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: ${(props) => (props.type === "primary" ? "#fff" : "#000")};
  margin-right: 15px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  background: ${(props) =>
    props.type === "primary"
      ? "#2884f6"
      : props.type === "success"
      ? "rgba(161, 240, 69, 1)"
      : "rgba(240, 87, 108, 1)"};

  &:focus {
    outline: none;
  }

  &:active {
    box-shadow: inset 2px 2px 1px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    background-color: #ccc;
    color: #000;
    cursor: not-allowed;
  }
`;

const Button = ({ children, onClick, type, disabled }) => {
  return (
    <Btn onClick={onClick} type={type} disabled={disabled}>
      {children}
    </Btn>
  );
};

export default Button;
