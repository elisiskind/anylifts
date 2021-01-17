import * as React from "react";
import { useState } from "react";
import { Box, Grid, makeStyles, Theme } from "@material-ui/core";
import { AlPaper } from "../elements/AlPaper";
import { AlHeader } from "../elements/AlHeader";
import { AlSubtitle } from "../elements/AlSubtitle";
import { AlButton } from "../elements/AlButton";
import { getProgramsForUser, Program } from "../../state/Programs";

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
  selectWorkout: (programId: number, workoutIndex: number) => void;
}

export const WorkoutSelector = ({ selectWorkout }: WorkoutSelectorProps) => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [programs] = useState<Program[] | null>(getProgramsForUser(0));

  if (selectedIndex !== null && programs) {
    const selectedProgram = programs[selectedIndex];
    return (
      <Box className={classes.root}>
        <Grid container spacing={3}>
          {selectedProgram.routines.map((routine, index) => {
            const lifts = routine.sets
              .map((s) => s.exercise)
              .filter((v, i, a) => a.indexOf(v) === i)
              .join(", ");
            return (
              <Grid xs={12} item>
                <AlPaper onClick={() => selectWorkout(selectedIndex, index)}>
                  <AlHeader variant={"h2"}>
                    {selectedProgram.routines[index].name}
                  </AlHeader>
                  <AlSubtitle>{routine.sets.length} sets</AlSubtitle>
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
  } else if (programs) {
    return (
      <Box className={classes.root}>
        <Grid container spacing={3}>
          {programs.map((program, index) => {
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
  } else {
    return <Box>No programs found</Box>;
  }
};
