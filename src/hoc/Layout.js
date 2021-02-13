import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import MenuToggle from "../components/Navigation/MenuToggle";
import Drawer from "../components/Navigation/Drawer";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Layout = (props) => {
  const [menu, setMenu] = React.useState(false);

  const toggleMenuHandler = () => setMenu(!menu);

  const closeMenuHandler = () => setMenu(false);

  return (
    <Container>
      <Drawer
        isOpen={menu}
        onClose={closeMenuHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menu} />
      <Main>{props.children}</Main>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: Boolean(state.auth.token),
});

export default connect(mapStateToProps)(Layout);
