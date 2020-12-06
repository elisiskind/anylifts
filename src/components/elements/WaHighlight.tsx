import React, {FunctionComponent} from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";

export interface WaHighlightProps {
  invert?: boolean,
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

const useStyles = makeStyles(({palette}: Theme) => ({
  highlight: {
    fontFamily: 'inherit',
    textTransform: 'inherit',
    letterSpacing: 'inherit',
    fontWeight: "inherit",
    color: ({color, invert}: WaHighlightProps) => invert ? palette[color ? color : 'primary'].contrastText :
      palette[color ? color : 'primary'].main,
    background:  ({color, invert}: WaHighlightProps) => invert ? palette[color ? color : 'primary'].main :
      'inherit',
    borderRadius:  ({invert}: WaHighlightProps) => invert ? '6px' : 0,
    padding: ({invert}: WaHighlightProps) => invert ? '0 8px' : 0,
  }
}));

/**
 * Primary UI component for user interaction
 */
export const WaHighlight: FunctionComponent<WaHighlightProps> = ({invert, color, children} : WaHighlightProps) => {
  const classes = useStyles({invert, color})

  return (
    <span className={`${classes.highlight}`}>
      {children}
    </span>
  );
};
