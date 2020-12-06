import React, {FunctionComponent} from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

export interface WaHeaderProps {
  variant: "h1" | "h2"
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    fontSize: ({variant} : WaHeaderProps) => variant === 'h1' ? 24 : 20,
    fontWeight: 700
  }
}));

/**
 * Primary UI component for user interaction
 */
export const WaHeader: FunctionComponent<WaHeaderProps> = ({variant, children}: WaHeaderProps) => {
  const classes = useStyles({variant})

  return (
    <Typography variant={variant} className={`${classes.header}`}>
      {children}
    </Typography>
  );
};
