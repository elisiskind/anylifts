import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: "20px",
    width: "300px",
  },
}));

export interface TextInputProps {
  label: string;
  onChange: (value: string) => void;
  variant?: "password" | "email" | "default";
}

export const TextInput = ({ label, onChange, variant }: TextInputProps) => {
  const classes = useStyles();

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
      InputProps={{ className: classes.root }}
      label={label}
      variant="outlined"
      onChange={(e) => onChange(e.target.value)}
      {...args()}
    />
  );
};
