import * as React from "react";
import { Box, Grid, Hidden, makeStyles, Theme } from "@material-ui/core";
import { AlButton } from "../elements/AlButton";
import { WorkoutRoutine } from "../programs/Program";
import { Replay, SkipNext, SkipPrevious } from "@material-ui/icons";
import { AlDivider } from "../elements/AlDivider";

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
  backNextButtons: {
    display: "flex",
  },
  prevBtn: {
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
  routine: WorkoutRoutine;
  currentIndex: number;
  reset: () => void;
  next: () => void;
  prev: () => void;
}

export const WorkoutOverview = ({
  currentIndex,
  next,
  prev,
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
              {routine.sets.map((set, index) => {
                const className =
                  index === currentIndex
                    ? classes.currentLift
                    : index < currentIndex
                    ? classes.finishedLift
                    : classes.futureLift;
                return (
                  <>
                    {index !== 0 &&
                      routine.sets[index - 1].exercise !== set.exercise && (
                        <AlDivider grid space={1} />
                      )}
                    <Grid item xs={12}>
                      <Box className={className}>
                        <span className={classes.setName}>{set.exercise}</span>{" "}
                        - {set.weight} lbs - {set.reps}
                        {set.amrap && "+"}
                      </Box>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Box>
        </Box>
        <Grid container className={classes.navigation}>
          <Grid item>
            <AlButton size={"small"} onClick={reset}>
              <Replay className={classes.replayIcon} />{" "}
              <Hidden smDown>Start Over</Hidden>
            </AlButton>
          </Grid>
          <Grid item className={classes.backNextButtons}>
            <AlButton size={"small"} onClick={prev} className={classes.prevBtn}>
              <SkipPrevious />
            </AlButton>
            <AlButton size={"small"} onClick={next}>
              <SkipNext />
            </AlButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
