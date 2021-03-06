import * as React from "react";
import { useState } from "react";
import { Box, Grid, makeStyles, Theme } from "@material-ui/core";
import { getProgramsForUser, Program } from "state/Programs";
import { Button, Header, Paper, Subtitle } from "components/elements";

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
                <Paper onClick={() => selectWorkout(selectedIndex, index)}>
                  <Header variant={"h2"}>
                    {selectedProgram.routines[index].name}
                  </Header>
                  <Subtitle>{routine.sets.length} sets</Subtitle>
                  <Subtitle>{lifts}</Subtitle>
                </Paper>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Button onClick={() => setSelectedIndex(null)}>Back</Button>
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
                <Paper onClick={() => setSelectedIndex(index)}>
                  <Header variant={"h2"}>{program.name}</Header>
                  <Subtitle>{program.routines.length} day program</Subtitle>
                </Paper>
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
