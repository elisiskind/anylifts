import React from "react";
import {Grid, Typography} from "@material-ui/core";

export const CurrentLift = () => {
  return <Grid container>
    <Grid item xs={6}>
      <Typography>
        Bench Press
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography>
        110 lbs
      </Typography>
    </Grid>
    <Grid item xs={3}>
      <Typography>
        5 reps
      </Typography>
    </Grid>
  </Grid>
}