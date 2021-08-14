import React, { useContext, useEffect, useState } from "react";
import { Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Timer } from "components/elements";
import { AvailableEquipment } from "components/equipment";
import Hidden from "@material-ui/core/Hidden";
import { Set } from "store/ProgramsProvider";
import { CurrentLift, WorkoutOverview } from "components/workout";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { SendAlert } from "lib/notifications";
import { CurrentRoutineContext } from "store/CurrentRoutineProvider";

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

interface JokerSet {
  set: Set;
  index: number;
}

export const Workout = () => {
  const {
    currentSet,
    selectCurrentSet,
    currentRoutine,
    selectCurrentRoutineIndex,
  } = useContext(CurrentRoutineContext);

  const currentIndex = currentSet?.setIndex ?? 0;

  const [complete, setComplete] = useState<boolean>(false);
  const [sets, setSets] = useState<Set[]>(currentRoutine!.sets);
  const [jokerSets, setJokerSets] = useState<JokerSet[]>([]);
  const set = sets[currentIndex];

  const [time, setTime] = useState<number>(90);
  const startTime = currentSet?.startTime ?? Date.now();

  useEffect(() => {
    const newSets = currentRoutine!.sets;
    jokerSets.forEach((jokerSet) => {
      newSets.splice(jokerSet.index, 0, jokerSet.set);
    });
    setSets(newSets);
  }, [currentRoutine, jokerSets]);

  const addTime = (timeToAdd: number) => {
    setTime(time + timeToAdd);
  };

  const onFinish = () => {
    if (currentSet) {
      const title = "Time for next set!";
      const message = `${set.exercise} - ${set.reps}${set.amrap ? "+" : ""} x ${
        set.weight
      } lbs`;

      SendAlert(title, message);
    }
  };

  const prev = async () => {
    if (currentIndex > 0) {
      await selectCurrentSet({
        setIndex: currentIndex - 1,
        startTime: Date.now(),
      });
    }
  };

  const selectSet = async (set: number) => {
    await selectCurrentSet({
      setIndex: set,
      startTime: Date.now(),
    });
  };

  const next = async () => {
    if (currentIndex + 1 < sets.length) {
      console.log("Next set: " + (currentIndex + 1));
      await selectSet(currentIndex + 1);
    } else {
      setComplete(true);
      await selectSet(0);
    }
  };

  const finish = async () => {
    setComplete(false);
    setJokerSets([]);
    await selectCurrentRoutineIndex(null);
  };

  const restart = async () => {
    await selectSet(0);
    setComplete(false);
    setJokerSets([]);
  };

  const [showMobileOverview, setShowMobileOverview] = useState<boolean>(false);
  const toggleShowOverview = () => {
    setShowMobileOverview(!showMobileOverview);
  };

  const addJokerSet = () => {
    const jokerSet: JokerSet = {
      index: currentIndex + 1,
      set: {
        weight: Math.round((set.weight * 1.05) / 2.5) * 2.5,
        reps: set.reps,
        amrap: false,
        exercise: set.exercise,
        jokerSet: true,
      },
    };
    setJokerSets([jokerSet, ...jokerSets]);
    next();
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
                name={set.exercise}
                reps={set.reps}
                amrap={set.amrap || false}
                weight={set.weight}
                plates={AvailableEquipment[0].plates}
                bar={AvailableEquipment[0].bar}
                next={next}
                jokerSet={!!set.jokerSet}
                addJokerSet={addJokerSet}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
