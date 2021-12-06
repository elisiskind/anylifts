import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, withTheme } from "@material-ui/core";
import { AppTheme } from "App";

const useStyles = makeStyles(({ breakpoints }: Theme) => ({
  root: {
    borderRadius: "20px",
    width: "150px",
    [breakpoints.up("sm")]: {
      width: "300px",
    },
  },
}));

export interface TextInputProps {
  label: string;
  onChange: (value: string) => void;
  variant?: "password" | "email" | "default";
  className?: string;
}

export const TextInput = ({
  label,
  onChange,
  variant,
  className,
}: TextInputProps) => {
  const classes = useStyles();
  const textInputClasses = className
    ? `${classes.root} ${className}`
    : classes.root;

  const args = () => {
    switch (variant) {
      case "password": {
        return {
          type: "password",
          autoComplete: "current-password",
        };
      }
      case "email": {
        return {
          autoComplete: "email",
        };
      }
    }
  };

  return (
    <TextField
      InputProps={{ className: textInputClasses }}
      label={label}
      variant="outlined"
      onChange={(e) => onChange(e.target.value)}
      {...args()}
    />
  );
};
