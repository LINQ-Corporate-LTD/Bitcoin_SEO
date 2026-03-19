import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../slices/auth/login/thunk";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const userProfile = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    if (token) {
      setAuthorization(token);
    } else if (!userProfile && !token) {
      dispatch(logoutUser());
    }
  }, [token, userProfile, dispatch]);

  /*
    Navigate is un-auth access protected routes via url
    */

  if (!userProfile && !token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };