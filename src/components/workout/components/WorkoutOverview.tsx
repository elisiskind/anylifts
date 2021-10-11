import * as React from "react";
import { makeStyles, Theme } from "@material-ui/core";
import { CurrentRoutineSet } from "store/Models";
import { Close, Replay, SkipNext, SkipPrevious } from "@material-ui/icons";
import { Button, Divider } from "components/elements";

const useStyles = makeStyles(({ spacing, palette, breakpoints }: Theme) => ({
  workoutOverview: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  setListContainer: {
    overflowY: "scroll",
    boxShadow: "inset 0 4px " + palette.grey[100],
    padding: spacing(2),
    borderBottom: "2px solid " + palette.grey.A100,
    overflow: "hidden",
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    padding: spacing(1, 2, 2, 2),
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
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
  routine: CurrentRoutineSet[];
  currentIndex: number;
  reset: () => void;
  finish: () => Promise<void>;
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
    <div className={classes.workoutOverview}>
      <div className={classes.setListContainer}>
        {routine.map((set, index) => {
          const className =
            index === currentIndex
              ? classes.currentLift
              : index < currentIndex
              ? classes.finishedLift
              : classes.futureLift;
          return (
            <div key={index}>
              {index !== 0 && routine[index - 1].lift !== set.lift && (
                <Divider grid space={1} />
              )}
              <div>
                <div className={className}>
                  <span className={classes.setName}>{set.lift}</span> -{" "}
                  {set.weight} lbs - {set.reps}
                  {set.amrap && "+"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.navigation}>
        <div className={classes.buttons}>
          <Button size={"small"} onClick={reset} className={classes.leftButton}>
            <Replay />
          </Button>
          <Button size={"small"} onClick={finish}>
            <Close />
          </Button>
        </div>
        <div className={classes.buttons}>
          <Button size={"small"} onClick={prev} className={classes.leftButton}>
            <SkipPrevious />
          </Button>
          <Button size={"small"} onClick={next}>
            <SkipNext />
          </Button>
        </div>
      </div>
    </div>
  );
};
