import * as React from "react";
import { Box, Grid, makeStyles, Theme } from "@material-ui/core";
import { Set } from "state/Programs";
import { Close, Replay, SkipNext, SkipPrevious } from "@material-ui/icons";
import { Button, Divider } from "components/elements";

const useStyles = makeStyles(({ spacing, palette, breakpoints }: Theme) => ({
  workoutOverview: {
    height: "100%",
  },
  setList: {
    height: "100%",
    overflowY: "scroll",
    padding: spacing(2),
    borderRadius: 20,
  },
  setListContainer: {
    border: "2px solid " + palette.grey.A100,
    boxShadow: "inset 0 4px " + palette.grey[100],
    height: "calc(100% - 64px)",
    overflow: "hidden",
    borderRadius: 20,
  },
  navigation: {
    paddingTop: spacing(2),
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
  },
  leftButton: {
    marginRight: spacing(1),
  },
  replayIcon: {
    [breakpoints.up("md")]: {
      marginRight: "10px",
    },
  },
  currentLift: {
    backgroundColor: palette.secondary.main,
    color: palette.secondary.contrastText,
    borderRadius: 20,
    padding: spacing(1, 2),
  },
  finishedLift: {
    padding: spacing(1, 2),
  },
  futureLift: {
    padding: spacing(1, 2),
  },
  setName: {
    fontWeight: 800,
  },
}));

interface WorkoutOverviewProps {
  routine: Set[];
  currentIndex: number;
  reset: () => void;
  finish: () => void;
  next: () => void;
  prev: () => void;
}

export const WorkoutOverview = ({
  currentIndex,
  next,
  prev,
  finish,
  reset,
  routine,
}: WorkoutOverviewProps) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.workoutOverview}>
        <Box className={classes.setListContainer}>
          <Box className={classes.setList}>
            <Grid container>
              {routine.map((set, index) => {
                const className =
                  index === currentIndex
                    ? classes.currentLift
                    : index < currentIndex
                    ? classes.finishedLift
                    : classes.futureLift;
                return (
                  <Grid item xs={12} container key={index}>
                    {index !== 0 &&
                      routine[index - 1].exercise !== set.exercise && (
                        <Divider grid space={1} />
                      )}
                    <Grid item xs={12}>
                      <Box className={className}>
                        <span className={classes.setName}>{set.exercise}</span>{" "}
                        - {set.weight} lbs - {set.reps}
                        {set.amrap && "+"}
                      </Box>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Box>
        <Grid container className={classes.navigation}>
          <Grid item className={classes.buttons}>
            <Button
              size={"small"}
              onClick={reset}
              className={classes.leftButton}
            >
              <Replay />
            </Button>
            <Button size={"small"} onClick={finish}>
              <Close />
            </Button>
          </Grid>
          <Grid item className={classes.buttons}>
            <Button
              size={"small"}
              onClick={prev}
              className={classes.leftButton}
            >
              <SkipPrevious />
            </Button>
            <Button size={"small"} onClick={next}>
              <SkipNext />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
