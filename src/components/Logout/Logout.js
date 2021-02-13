import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../redux/actions/auth";

const Logout = (props) => {
  useEffect(() => {
    props.logout();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
