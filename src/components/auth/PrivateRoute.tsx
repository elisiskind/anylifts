import React, { FunctionComponent, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { Loader } from "components/elements/Loader";
import { StorageContext } from "store/StorageProvider";

export interface PrivateRouteProps extends RouteProps {}

export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  children,
  ...remainingProps
}) => {
  const { user, userLoading: loading } = useContext(StorageContext);

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
