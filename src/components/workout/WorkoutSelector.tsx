import * as React from "react";
import { useState } from "react";
import { Box, Grid, makeStyles, Theme } from "@material-ui/core";
import { Lifts, Programs, WorkoutRoutine } from "../programs/Program";
import { AlPaper } from "../elements/AlPaper";
import { AlHeader } from "../elements/AlHeader";
import { AlSubtitle } from "../elements/AlSubtitle";
import { AlButton } from "../elements/AlButton";

const useStyles = makeStyles(({ breakpoints, spacing }: Theme) => ({
  root: {
    padding: spacing(2),
    margin: "0 auto",
    width: "100%",
    [breakpoints.up("sm")]: {
      width: "60%",
    },
  },
  clickableCard: {},
}));

interface WorkoutSelectorProps {
  selectWorkout: (programIndex: number, workoutIndex: number) => void;
}

export const WorkoutSelector = ({ selectWorkout }: WorkoutSelectorProps) => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (selectedIndex !== null) {
    const selectedProgram = Programs[selectedIndex];
    return (
      <Box className={classes.root}>
        <Grid container spacing={3}>
          {selectedProgram.routines.map((routine, index) => {
            const workout = new WorkoutRoutine(routine, Lifts);
            const lifts = workout.sets
              .map((s) => s.exercise)
              .filter((v, i, a) => a.indexOf(v) === i)
              .join(", ");
            return (
              <Grid xs={12} item>
                <AlPaper onClick={() => selectWorkout(selectedIndex, index)}>
                  <AlHeader variant={"h2"}>{routine.name}</AlHeader>
                  <AlSubtitle>{workout.sets.length} sets</AlSubtitle>
                  <AlSubtitle>{lifts}</AlSubtitle>
                </AlPaper>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <AlButton onClick={() => setSelectedIndex(null)}>Back</AlButton>
          </Grid>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box className={classes.root}>
        <Grid container spacing={3}>
          {Programs.map((program, index) => {
            return (
              <Grid xs={12} item key={program.id}>
                <AlPaper onClick={() => setSelectedIndex(index)}>
                  <AlHeader variant={"h2"}>{program.name}</AlHeader>
                  <AlSubtitle>{program.routines.length} day program</AlSubtitle>
                </AlPaper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }
};
