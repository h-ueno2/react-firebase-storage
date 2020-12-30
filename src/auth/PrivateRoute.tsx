import React, { useContext } from "react";
import { Route, RouteProps } from "react-router-dom";
import { AuthContext } from "src/auth/AuthProvider";
import Login from "src/auth/Login";

const PrivateRoute = (props: RouteProps) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? props.component : Login;

  return <Route path={props.path} exact={props.exact} component={Component} />;
};

export default PrivateRoute;
