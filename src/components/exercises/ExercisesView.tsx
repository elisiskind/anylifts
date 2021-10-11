import React, { useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { EditIcon, Header, Paper } from "components/elements";
import { StorageContext } from "store/StorageProvider";

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(3),
  },
}));

export const ExercisesView = () => {
  const classes = useStyles();
  const { lifts } = useContext(StorageContext);

  return (
    <Grid container spacing={3} className={classes.root}>
      {lifts.map((lift) => {
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
