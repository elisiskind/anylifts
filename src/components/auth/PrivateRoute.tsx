import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { State } from "store/reducers";

export interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  children,
  ...remainingProps
}) => {
  const auth = useSelector((state: State) => state.firebase.auth);
  return (
    <Route
      {...remainingProps}
      render={({ location }) =>
        isLoaded(auth) &&
        (!isEmpty(auth) ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        ))
      }
    />
  );
};
