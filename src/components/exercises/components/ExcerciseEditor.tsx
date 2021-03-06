import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

export interface ExcerciseEditorProps {
  name: string;
}

export const ExcerciseEditor = ({ name }: ExcerciseEditorProps) => {
  const classes = useStyles();

  return <div className={classes.root}>{name}</div>;
};
