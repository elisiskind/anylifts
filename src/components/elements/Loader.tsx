import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: "30%",
  },
  inner: {
    flex: 1,
    margin: "auto",
    textAlign: "center",
  },
}));

/**
 * Primary UI component for user interaction
 */
export const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <CircularProgress />
      </div>
    </div>
  );
};
