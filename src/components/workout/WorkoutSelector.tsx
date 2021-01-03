import * as React from "react";
import { useState } from "react";
import { Box, Grid, makeStyles, Theme } from "@material-ui/core";
import { Program } from "../../domain/Programs";
import { Lifts, Programs, WorkoutRoutine } from "../programs/Program";
import { AlPaper } from "../elements/AlPaper";
import { AlHeader } from "../elements/AlHeader";
import { AlSubtitle } from "../elements/AlSubtitle";
import { AlButton } from "../elements/AlButton";

const useStyles = makeStyles(({ breakpoints, spacing, palette }: Theme) => ({
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
  selectWorkout: (routine: WorkoutRoutine) => void;
}

export const WorkoutSelector = ({ selectWorkout }: WorkoutSelectorProps) => {
  const classes = useStyles();

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <Box className={classes.root}>
      {selectedProgram === null ? (
        <>
          <Grid container spacing={3}>
            {Programs.map((program) => {
              return (
                <Grid xs={12} item>
                  <AlPaper onClick={() => setSelectedProgram(program)}>
                    <AlHeader variant={"h2"}>{program.name}</AlHeader>
                    <AlSubtitle>
                      {program.routines.length} day program
                    </AlSubtitle>
                  </AlPaper>
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={3}>
            {selectedProgram.routines.map((routine) => {
              const workout = new WorkoutRoutine(routine, Lifts);
              const lifts = workout.sets
                .map((s) => s.exercise)
                .filter((v, i, a) => a.indexOf(v) === i)
                .join(", ");
              return (
                <Grid xs={12} item>
                  <AlPaper onClick={() => selectWorkout(workout)}>
                    <AlHeader variant={"h2"}>{routine.name}</AlHeader>
                    <AlSubtitle>{workout.sets.length} sets</AlSubtitle>
                    <AlSubtitle>{lifts}</AlSubtitle>
                  </AlPaper>
                </Grid>
              );
            })}
            <Grid item xs={12}>
              <AlButton onClick={() => setSelectedProgram(null)}>Back</AlButton>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};
