import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Lifts } from "state/HardcodedDataSource";
import { Grid } from "@material-ui/core";
import { Paper, Header, EditIcon } from "components/elements";

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(3),
  },
}));

export const ExercisesView = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      {Lifts.map((lift) => {
        return (
          <Grid item xs={12} sm={4} md={3}>
            <Paper>
              <Grid container>
                <Grid item>
                  <Header variant={"h2"}>{lift.name}</Header>
                </Grid>
                <Grid item>
                  <EditIcon />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};
