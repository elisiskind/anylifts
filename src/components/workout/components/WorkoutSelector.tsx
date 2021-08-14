import * as React from "react";
import { useContext, useState } from "react";
import { Box, Grid, makeStyles, Theme } from "@material-ui/core";
import { Button, Header, Paper, Subtitle } from "components/elements";
import { CurrentRoutineContext } from "store/CurrentRoutineProvider";
import { ProgramsContext } from "store/ProgramsProvider";
import { Loader } from "components/elements/Loader";

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

export const WorkoutSelector = () => {
  const classes = useStyles();

  const { selectCurrentRoutineIndex } = useContext(CurrentRoutineContext);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { data: programs, loading } = useContext(ProgramsContext);

  const selectRoutine = async (
    programId: string | null,
    routineIndex: number | null
  ) => {
    console.log("Selecting routine...");
    const currentRoutineIndex =
      programId === null || routineIndex === null
        ? null
        : {
            programId,
            routineIndex,
          };
    await selectCurrentRoutineIndex(currentRoutineIndex);
    console.log("selected!");
  };

  if (loading) {
    return <Loader />;
  } else if (selectedIndex !== null && programs) {
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
              <Grid xs={12} item key={index}>
                <Paper onClick={() => selectRoutine(selectedProgram.id, index)}>
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
