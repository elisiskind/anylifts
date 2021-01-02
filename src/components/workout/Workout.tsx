import React, { useEffect, useState } from "react";
import { Box, Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AlPaper } from "../elements/AlPaper";
import { CurrentLift } from "./CurrentLift";
import { Lifts, Programs, WorkoutRoutine } from "../programs/Program";
import { AvailableEquipment } from "../Equipment";
import Hidden from "@material-ui/core/Hidden";
import { AlTimer } from "../elements/AlTimer";
import { WorkoutOverview } from "./WorkoutOverview";

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({

  root: {
    height: '100%',
    display: 'flex'
  },
  workoutOverviewContainer: {
    height: '100%',
    flex: 2,
    padding: spacing(2),
    backgroundColor: palette.common.white,
    borderRight: "2px solid " + palette.grey.A100,
  },
  liftContainer: {
    flex: 3,
    padding: spacing(2)
  }
}));

export const Workout = () => {
  const classes = useStyles();

  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  });

  const [currentIndex, setCurrentIndex] = useState<number>(
    Number.parseInt(localStorage.getItem("set") || "0")
  );

  const [complete, setComplete] = useState<boolean>(false);
  localStorage.setItem("set", currentIndex.toString());
  const routine = new WorkoutRoutine(Programs[1].routines[1], Lifts);
  const currentSet = routine.getSet(currentIndex);

  const [time, setTime] = useState<number>(90);

  const addTime = (timeToAdd: number) => {
    setTime(time + timeToAdd);
  };

  let audio = new Audio("/hey-hey-hey.mp3");

  const message = () => {
    const next = routine.getSet(currentIndex + 1);
    if (next) {
      return [
        "Time for next lift!",
        `${next.exercise} - ${next.reps}${next.amrap ? "+" : ""} x ${
          next.weight
        } lbs`,
      ];
    } else {
      return ["Workout complete!", "Great job!"];
    }
  };

  const alert = () => {
    if (document.hidden) {
      const [title, body] = message();
      const n = new Notification(title, {
        body: body,
        vibrate: [100, 100, 100],
        icon: "/wristwatch.png",
      });
      n.onclick = function (x) {
        window.focus();
        this.close();
      };
    } else {
      audio.play();
    }
  };

  return (
    <>
      {complete ? (
        <AlPaper color={"primary"} >Workout Finished!</AlPaper>
      ) : (
        <Box className={classes.root}>
          <Hidden xsDown>
            <Box className={classes.workoutOverviewContainer}>
              <WorkoutOverview
                routine={routine}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
            </Box>
          </Hidden>
          <Box className={classes.liftContainer}>
            <Box alignItems={"center"} marginBottom={2}>
              <AlTimer
                key={currentIndex}
                time={time}
                addTime={addTime}
                onFinish={alert}
              />
            </Box>
            <CurrentLift
              name={currentSet.exercise}
              reps={currentSet.reps}
              amrap={currentSet.amrap || false}
              weight={currentSet.weight}
              plates={AvailableEquipment[0].plates}
              bar={AvailableEquipment[0].bar}
              next={() => setCurrentIndex(currentIndex + 1)}
            />
          </Box>
        </Box>
      )}
    </>
  );
};