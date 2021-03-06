import { Divider as MuiDivider, Grid, useTheme } from "@material-ui/core";
import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles(({ spacing }: Theme) => ({
  divider: {
    flexGrow: 1,
  },
  label: {
    padding: spacing(1),
  },
  root: {
    textAlign: "center",
  },
}));

export interface DividerProps {
  grid?: boolean;
  space?: number;
  label?: string;
}

export const Divider = ({ grid, space, label }: DividerProps) => {
  const classes = useStyles();
  const theme = useTheme();

  const divider = (
    <MuiDivider style={{ margin: theme.spacing(space ? space : 2, 0) }} />
  );

  if (label && grid) {
    return (
      <Grid item container xs={12}>
        <Grid item className={classes.divider}>
          {divider}
        </Grid>
        <Grid item className={classes.label}>
          {label}
        </Grid>
        <Grid item className={classes.divider}>
          {divider}
        </Grid>
      </Grid>
    );
  } else if (grid) {
    return (
      <Grid item xs={12}>
        {divider}
      </Grid>
    );
  } else if (label) {
    return (
      <Grid container className={classes.root}>
        <Grid item className={classes.divider}>
          {divider}
        </Grid>
        <Grid item className={classes.label}>
          {label}
        </Grid>
        <Grid item className={classes.divider}>
          {divider}
        </Grid>
      </Grid>
    );
  } else {
    return divider;
  }
};
