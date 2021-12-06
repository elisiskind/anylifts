import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { InputAdornment, TextField } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints }: Theme) => ({
  root: {
    borderRadius: "20px",
    width: "150px",
    [breakpoints.up("sm")]: {
      width: "300px",
      fontSize: 10,
    },
  },
}));

export interface NumberInputProps {
  label: string;
  onChange: (value: number) => void;
  value?: number;
  className?: string;
  units?: string;
  error?: string;
  onBlur?: () => void;
  min?: number;
  max?: number;
}

export const NumberInput = ({
  label,
  onChange,
  className,
  units,
  value,
  error,
  onBlur,
  min,
  max,
}: NumberInputProps) => {
  const classes = useStyles();
  const numberInputClasses = className
    ? `${classes.root} ${className}`
    : classes.root;

  return (
    <TextField
      InputProps={{
        className: numberInputClasses,
        endAdornment: units ? (
          <InputAdornment position="end">{units}</InputAdornment>
        ) : undefined,
        inputProps: {
          min: min,
          max: max,
        },
      }}
      value={value === undefined ? "" : value}
      onBlur={onBlur}
      label={label}
      variant="outlined"
      onChange={(e) => onChange(Number(e.target.value))}
      type={"number"}
      error={!!error && error !== " "}
      helperText={error}
    />
  );
};
