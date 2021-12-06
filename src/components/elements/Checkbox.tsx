import * as React from "react";
import { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  CheckBoxOutlineBlankRounded,
  CheckBoxRounded,
} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "inline-block",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: ({ color }: CheckboxProps) => theme.palette[color ?? "primary"].main,
  },
  hidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    clippath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  },
}));

export interface CheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  /**
   * Color of button
   */
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

export const Checkbox = ({ value, onChange, label, color }: CheckboxProps) => {
  const classes = useStyles({ value, onChange, label, color });

  return (
    <label className={classes.root}>
      <div className={classes.checkboxContainer}>
        <input
          type={"checkbox"}
          className={classes.hidden}
          onChange={(event) => onChange(event.target.checked)}
        />
        {value ? (
          <CheckBoxRounded className={classes.icon} />
        ) : (
          <CheckBoxOutlineBlankRounded className={classes.icon} />
        )}
        &nbsp;
        {label}
      </div>
    </label>
  );
};
