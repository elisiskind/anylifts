import React, {FunctionComponent} from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";

export interface AlHighlightProps {
  invert?: boolean,
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

const useStyles = makeStyles(({palette}: Theme) => ({
  highlight: {
    fontFamily: 'inherit',
    textTransform: 'inherit',
    letterSpacing: 'inherit',
    fontWeight: "inherit",
    color: ({color, invert}: AlHighlightProps) => invert ? palette[color ? color : 'primary'].contrastText :
      palette[color ? color : 'primary'].main,
    background:  ({color, invert}: AlHighlightProps) => invert ? palette[color ? color : 'primary'].main :
      'inherit',
    borderRadius:  ({invert}: AlHighlightProps) => invert ? '6px' : 0,
    padding: ({invert}: AlHighlightProps) => invert ? '0 8px' : 0,
  }
}));

/**
 * Primary UI component for user interaction
 */
export const AlHighlight: FunctionComponent<AlHighlightProps> = ({invert, color, children}) => {
  const classes = useStyles({invert, color})

  return (
    <span className={`${classes.highlight}`}>
      {children}
    </span>
  );
};
