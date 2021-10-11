import React, { useContext, useState } from "react";
import { Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Timer } from "components/elements";
import { AvailableEquipment } from "components/equipment";
import Hidden from "@material-ui/core/Hidden";
import { CurrentLift, WorkoutOverview } from "components/workout";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { SendAlert } from "lib/notifications";
import { CurrentRoutineContext } from "components/workout/WorkoutsView";

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  root: {
    height: "100%",
    display: "flex",
  },
  workoutOverviewContainer: {
    height: "100%",
    flex: 2,
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

export const Workout = () => {
  const {
    sets,
    currentSet,
    nextSet,
    previousSet,
    finish,
    restart,
  } = useContext(CurrentRoutineContext);

  const next = async () => {
    if (currentSet.setIndex === sets.length - 1) {
      if (complete) {
        await finish();
        setComplete(false);
      } else {
        setComplete(true);
      }
    } else {
      await nextSet();
    }
  };
  const [complete, setComplete] = useState<boolean>(false);

  const [time, setTime] = useState<number>(90);
  const set = sets[currentSet.setIndex];

  const addTime = (timeToAdd: number) => {
    setTime(time + timeToAdd);
  };

  const onFinish = () => {
    const title = "Time for next set!";
    const message = `${set.lift} - ${set.reps}${set.amrap ? "+" : ""} x ${
      set.weight
    } lbs`;

    SendAlert(title, message);
  };

  const [showMobileOverview, setShowMobileOverview] = useState<boolean>(false);
  const toggleShowOverview = () => {
    setShowMobileOverview(!showMobileOverview);
  };

  const classes = useStyles(showMobileOverview);

  const workoutOverview = (
    <WorkoutOverview
      routine={sets}
      currentIndex={currentSet.setIndex}
      next={next}
      prev={previousSet}
      reset={restart}
      finish={finish}
    />
  );

  return (
    <>
      <Box className={classes.root}>
        <Hidden xsDown>
          <div className={classes.workoutOverviewContainer}>
            {workoutOverview}
          </div>
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
                  {currentSet.setIndex + 1}/{sets.length} -{" "}
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
                {currentSet.setIndex > 0 && (
                  <Timer
                    key={currentSet.setIndex}
                    time={time}
                    start={currentSet.startTime}
                    addTime={addTime}
                    onFinish={onFinish}
                  />
                )}
              </Box>
              <CurrentLift
                name={set.lift}
                reps={set.reps}
                amrap={set.amrap}
                weight={set.weight}
                plates={AvailableEquipment[0].plates}
                bar={AvailableEquipment[0].bar}
                next={next}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
