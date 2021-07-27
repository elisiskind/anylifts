import React, { FunctionComponent, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { CurrentUserContext } from "store/UserProvider";
import { Loader } from "components/elements/Loader";

export interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  children,
  ...remainingProps
}) => {
  const { data: user, loading } = useContext(CurrentUserContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <Route
      {...remainingProps}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
