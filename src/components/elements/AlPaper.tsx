import React, {FunctionComponent} from 'react';
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

export interface AlPaperProps {
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

  /**
   * Any custom classes go here
   */
  className?: string;
}

const useStyles = makeStyles(({palette, spacing}: Theme) => ({
  paper: {
    backgroundColor: ({color}: AlPaperProps) => color ? palette[color].main : 'white',
    border: ({color}: AlPaperProps) => color ? 'none' : '2px solid ' + palette.grey.A100,
    boxShadow: 'none',
    // color: ({color}: AlPaperProps) => color ? palette[color].contrastText : 'black',
    borderRadius: 20,
    padding: spacing(4)
  },
}));

/**
 * Primary UI component for user interaction
 */
export const AlPaper : FunctionComponent<AlPaperProps> = ({color, className, children}) => {
  const classes = useStyles({color})

  const paperClasses = className
    ? `${classes.paper} ${className}`
    : classes.paper;


  return <Paper className={paperClasses}>{children}</Paper>
};
