import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  text-align: center;
`;

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  &.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }

  &.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  &.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  &.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Spinner = () => (
  <Container>
    <Loader className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </Loader>
  </Container>
);

export default Spinner;
