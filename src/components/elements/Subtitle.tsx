import React, { FunctionComponent } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, breakpoints }: Theme) => ({
  subtitle: {
    fontSize: 12,
    [breakpoints.up("sm")]: {
      fontSize: 16,
    },
    fontFamily: "'Source Sans Pro', sans-serif",
    fontWeight: 700,
    color: palette.grey["700"],
  },
}));

/**
 * Primary UI component for user interaction
 */
export const Subtitle: FunctionComponent = ({ children }) => {
  const classes = useStyles();

  return <p className={`${classes.subtitle}`}>{children}</p>;
};
