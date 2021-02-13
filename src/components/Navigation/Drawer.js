import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Backdrop from "./Backdrop";

const Nav = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 80%;
  max-width: 300px;
  padding: 20px 10px;
  box-sizing: border-box;
  background: #fff;
  z-index: 90;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-300px)"};
  transition: transform 0.22s ease-in;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.nav`
  margin-bottom: 15px;
`;

const Link = styled(NavLink)`
  color: #363d54;
  font-size: 30px;
  text-decoration: none;
  background-color: #fff;
  position: relative;
  padding: 0 20px 10px 20px;
  transition: opacity 0.3s;

  &:hover,
  &:active {
    opacity: 0.7;
  }
`;

// const links = [
//   { to: "/", label: "Список", exact: true },
//   { to: "/auth", label: "Авторизация", exact: false },
//   { to: "/quiz-creator", label: "Создать тест", exact: false },
// ];

const Drawer = ({ isOpen, onClose, isAuthenticated }) => {
  const renderLinks = (links) =>
    links.map((link, index) => {
      return (
        <NavItem key={index}>
          <Link to={link.to} exact={link.exact} onClick={onClose}>
            {link.label}
          </Link>
        </NavItem>
      );
    });

  const links = [{ to: "/", label: "Список", exact: true }];

  if (isAuthenticated) {
    links.push({ to: "/quiz-creator", label: "Создать тест", exact: false });
    links.push({ to: "/logout", label: "Выход", exact: false });
  } else {
    links.push({ to: "/auth", label: "Авторизация", exact: false });
  }

  return (
    <>
      <Nav isOpen={isOpen}>
        <NavList>{renderLinks(links)}</NavList>
      </Nav>
      {isOpen && <Backdrop onClose={onClose} />}
    </>
  );
};

export default Drawer;
