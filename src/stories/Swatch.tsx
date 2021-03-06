import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Box, Grid } from "@material-ui/core";
import React from "react";

export interface SwatchProps {
  color: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

const useStyles = makeStyles(({ palette }: Theme) => ({
  swatch: {
    margin: "5px",
    fontFamily: "sans-serif",
    borderRadius: "20px",
  },
  solidSwatch: {
    color: (props: SwatchProps) => palette[props.color].contrastText,
    backgroundColor: (props: SwatchProps) => palette[props.color].main,
    padding: "30px",
  },
  outlineSwatch: {
    color: (props: SwatchProps) => palette[props.color].main,
    backgroundColor: "white",
    border: (props: SwatchProps) => "3px solid " + palette[props.color].main,
    padding: "27px",
  },
}));

export const Swatch = (props: SwatchProps) => {
  const classes = useStyles(props);
  return (
    <Grid container xs={12}>
      <Grid item container xs={6}>
        <Grid xs={12} className={`${classes.solidSwatch} ${classes.swatch}`}>
          {props.color}
        </Grid>
      </Grid>
      <Grid item container xs={6}>
        <Grid xs={12} className={`${classes.outlineSwatch} ${classes.swatch}`}>
          {props.color}
        </Grid>
      </Grid>
    </Grid>
  );
};

export const Swatches = () => {
  return (
    <Box>
      {["primary", "secondary", "error", "warning", "info", "success"].map(
        (value) => {
          // @ts-ignore
          return Swatch({ color: value });
        }
      )}
    </Box>
  );
};
