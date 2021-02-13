import React from "react";
import styled from "styled-components";

const Icon = styled.i`
  position: fixed;
  top: 40px;
  left: ${props => props.isOpen ? "320px" : "40px"};
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  z-index: 100;
  transition: opacity, left 0.22s ease-in;

  &:hover {
    opacity: 0.7;
  }
`;

const MenuToggle = ({ onToggle, isOpen }) => {
  const cls = ["fa", isOpen ? "fa-times" : "fa-bars"];

  return <Icon className={cls.join(" ")} onClick={onToggle} isOpen={isOpen}/>;
};

export default MenuToggle;
