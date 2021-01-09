import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Lifts } from "./programs/Program";
import { Grid } from "@material-ui/core";
import { AlPaper } from "./elements/AlPaper";
import { AlHeader } from "./elements/AlHeader";
import { EditIcon } from "./elements/icons/EditIcon";

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(3),
  },
}));

export const Exercises = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      {Lifts.map((lift) => {
        return (
          <Grid item xs={12} sm={4} md={3}>
            <AlPaper>
              <Grid container>
                <Grid item>
                  <AlHeader variant={"h2"}>{lift.name}</AlHeader>
                </Grid>
                <Grid item>
                  <EditIcon />
                </Grid>
              </Grid>
            </AlPaper>
          </Grid>
        );
      })}
    </Grid>
  );
};