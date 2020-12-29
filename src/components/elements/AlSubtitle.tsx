import React, {FunctionComponent} from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(({palette, breakpoints}: Theme) => ({
  subtitle: {
    fontSize: 14,
    [breakpoints.up('sm')]: {
      fontSize: 20,
    },
    fontFamily: "'Source Sans Pro', sans-serif",
    fontWeight: 700,
    color: palette.grey["700"]
  }
}));

/**
 * Primary UI component for user interaction
 */
export const AlSubtitle: FunctionComponent = ({children}) => {
  const classes = useStyles()

  return (
    <Typography className={`${classes.subtitle}`}>
      {children}
    </Typography>
  );
};
