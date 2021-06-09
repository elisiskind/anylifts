import React, { useContext, useState } from "react";
import { Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Timer } from "components/elements";
import { AvailableEquipment } from "components/equipment";
import Hidden from "@material-ui/core/Hidden";
import { Set } from "state/Programs";
import { CurrentLift, WorkoutOverview } from "components/workout";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { SendAlert } from "lib/notifications";
import {
  retrieveSetIndex,
  retrieveStartTime,
  storeSetIndex,
  storeStartTime,
} from "state/localStorage";
import CurrentWorkoutContext from "store/CurrentWorkoutContext";

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  root: {
    height: "100%",
    display: "flex",
  },
  workoutOverviewContainer: {
    height: "100%",
    flex: 2,
    padding: spacing(2),
    backgroundColor: palette.common.white,
    borderRight: "2px solid " + palette.grey.A100,
  },
  liftContainer: {
    flex: 3,
    height: "100%",
    padding: spacing(2),
  },
  showMobileOverview: {
    display: "flex",
    justifyContent: "center",
    padding: spacing(1),
    height: "72px",
  },
  showMobileOverviewBtn: {
    height: "40px",
  },
  mobileOverview: (show: boolean) => ({
    position: "fixed",
    top: show ? 0 : "calc(100% - 80px - 56px)",
    zIndex: 1,
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    padding: spacing(1),
    outline: "none",
    transition: "top 0.3s ease 0s",
    margin: "56px -16px",
    borderTop: "2px solid " + palette.grey.A100,
  }),
  workoutOverview: {
    height: "calc(100% - 132px)",
  },
}));

interface WorkoutProps {
  reset: () => void;
}

export const Workout = ({ reset }: WorkoutProps) => {
  const routine = useContext(CurrentWorkoutContext);
  const [currentIndex, setCurrentIndex] = useState<number>(
    retrieveSetIndex() || 0
  );
  storeSetIndex(currentIndex);

  const [complete, setComplete] = useState<boolean>(false);
  const [sets, setSets] = useState<Set[]>(routine!.sets);
  const currentSet = sets[currentIndex];

  const [time, setTime] = useState<number>(90);
  const [startTime, setStartTime] = useState<number>(
    retrieveStartTime() || Date.now()
  );

  const addTime = (timeToAdd: number) => {
    setTime(time + timeToAdd);
  };

  const onFinish = () => {
    if (currentSet) {
      const title = "Time for next set!";
      const message = `${currentSet.exercise} - ${currentSet.reps}${
        currentSet.amrap ? "+" : ""
      } x ${currentSet.weight} lbs`;

      SendAlert(title, message);
    }
  };

  const restartTimer = () => {
    const start = Date.now();
    setStartTime(start);
    storeStartTime(start);
  };

  const clearTimer = () => {
    storeStartTime(null);
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      restartTimer();
    }
  };

  const next = () => {
    if (currentIndex + 1 < sets.length) {
      setCurrentIndex(currentIndex + 1);
      restartTimer();
    } else {
      setComplete(true);
      clearTimer();
    }
  };

  const finish = () => {
    setCurrentIndex(0);
    setComplete(false);
    clearTimer();
    reset();
  };

  const restart = () => {
    setComplete(false);
    setCurrentIndex(0);
    restartTimer();
  };

  const [showMobileOverview, setShowMobileOverview] = useState<boolean>(false);
  const toggleShowOverview = () => {
    setShowMobileOverview(!showMobileOverview);
  };

  const addJokerSet = () => {
    const jokerSet = {
      weight: Math.round((currentSet.weight * 1.05) / 2.5) * 2.5,
      reps: currentSet.reps,
      amrap: false,
      exercise: currentSet.exercise,
      jokerSet: true,
    };
    sets.splice(currentIndex + 1, 0, jokerSet);
    setSets([...sets]);
    setCurrentIndex(currentIndex + 1);
    restartTimer();
  };

  const classes = useStyles(showMobileOverview);

  const workoutOverview = (
    <WorkoutOverview
      routine={sets}
      currentIndex={currentIndex}
      next={next}
      prev={prev}
      reset={restart}
      finish={finish}
    />
  );

  return (
    <>
      <Box className={classes.root}>
        <Hidden xsDown>
          <Box className={classes.workoutOverviewContainer}>
            {workoutOverview}
          </Box>
        </Hidden>
        <Box className={classes.liftContainer}>
          <Hidden smUp>
            <Box className={classes.mobileOverview}>
              <Box className={classes.showMobileOverview}>
                <Button
                  variant="outline"
                  onClick={toggleShowOverview}
                  className={classes.showMobileOverviewBtn}
                >
                  {currentIndex + 1}/{sets.length} -{" "}
                  {showMobileOverview ? "Hide" : "Show"} overview{" "}
                  {showMobileOverview ? <ExpandMore /> : <ExpandLess />}
                </Button>
              </Box>
              <Box className={classes.workoutOverview}>{workoutOverview}</Box>
            </Box>
          </Hidden>
          {complete ? (
            <Paper>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  All sets complete!
                </Grid>
                <Box
                  width={"100%"}
                  textAlign={"center"}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <Button onClick={finish}>Finish workout</Button>
                </Box>
              </Grid>
            </Paper>
          ) : (
            <>
              <Box alignItems={"center"} marginBottom={2}>
                {currentIndex > 0 && (
                  <Timer
                    key={currentIndex}
                    time={time}
                    start={startTime}
                    addTime={addTime}
                    onFinish={onFinish}
                  />
                )}
              </Box>
              <CurrentLift
                name={currentSet.exercise}
                reps={currentSet.reps}
                amrap={currentSet.amrap || false}
                weight={currentSet.weight}
                plates={AvailableEquipment[0].plates}
                bar={AvailableEquipment[0].bar}
                next={next}
                jokerSet={!!currentSet.jokerSet}
                addJokerSet={addJokerSet}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
