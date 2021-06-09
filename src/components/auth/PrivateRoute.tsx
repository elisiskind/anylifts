import React, { FunctionComponent, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { UserContext } from "store/UserProvider";

export interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  children,
  ...remainingProps
}) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...remainingProps}
      render={({ location }) =>
        !!user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
