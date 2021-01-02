import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Lifts } from "./programs/Program";
import { Box, Grid } from "@material-ui/core";
import {AlPaper} from "./elements/AlPaper";
import {AlHeader} from "./elements/AlHeader";

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(3)
  },
}));

export const Exercises = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      {Lifts.map((lift) => {
        return <Grid item xs={12}>
          <AlPaper>
            <AlHeader variant={"h1"}>
              {lift.name}
            </AlHeader>
          </AlPaper>
        </Grid>
      })}
    </Grid>
  );
};