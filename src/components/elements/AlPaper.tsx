import React, {FunctionComponent} from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

export interface AlPaperProps {
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

const useStyles = makeStyles(({palette, spacing}: Theme) => ({
  paper: {
    backgroundColor: ({color}: AlPaperProps) => color ? palette[color].main : 'white',
    border: ({color}: AlPaperProps) => color ? 'none' : '2px solid ' + palette.grey.A100,
    boxShadow: 'none',
    color: ({color}: AlPaperProps) => color ? palette[color].contrastText : 'black',
    borderRadius: 20,
    padding: spacing(4)
  },
}));

/**
 * Primary UI component for user interaction
 */
export const AlPaper : FunctionComponent = ({children}) => {
  const classes = useStyles()

  return <Paper className={classes.paper}>{children}</Paper>
};
