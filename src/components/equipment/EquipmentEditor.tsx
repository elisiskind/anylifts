import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

export interface EquipmentEditorProps {
  name: string;
}

export const EquipmentEditor = ({ name }: EquipmentEditorProps) => {
  const classes = useStyles();

  return <div className={classes.root}>{name}</div>;
};
