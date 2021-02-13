import React, { useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout";
import Quiz from "./containers/Quiz";
import Auth from "./containers/Auth";
import QuizCreator from "./containers/QuizCreator";
import QuizList from "./containers/QuizList";
import Logout from "./components/Logout/Logout";
import { autoLogin } from "./redux/actions/auth";

function App(props) {
  useEffect(() => props.autoLogin(), []); // eslint-disable-line react-hooks/exhaustive-deps

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" exact component={QuizList} />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
}

const mapStateToProps = (state) => ({
  isAuthenticated: Boolean(state.auth.token),
});

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(autoLogin()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
