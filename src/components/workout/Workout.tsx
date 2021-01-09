import React, { useEffect, useState } from "react";
import { Box, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AlPaper } from "../elements/AlPaper";
import { WorkoutRoutine } from "../programs/Program";
import { AvailableEquipment } from "../Equipment";
import Hidden from "@material-ui/core/Hidden";
import { AlTimer } from "../elements/AlTimer";
import { WorkoutOverview } from "./WorkoutOverview";
import { AlButton } from "../elements/AlButton";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { CurrentLift } from "./CurrentLift";
import Grid from "@material-ui/core/Grid";

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
  routine: WorkoutRoutine;
  reset: () => void;
}

export const Workout = ({ routine, reset }: WorkoutProps) => {
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
  localStorage.setItem("set", currentIndex.toString());

  const [complete, setComplete] = useState<boolean>(false);
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

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const next = () => {
    if (currentIndex + 1 < routine.sets.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setComplete(true);
    }
  };

  const finish = () => {
    setCurrentIndex(0);
    setComplete(false);
    reset();
  }

  const restart = () => {
    setComplete(false);
    setCurrentIndex(0);
  };

  const [showMobileOverview, setShowMobileOverview] = useState<boolean>(false);
  const toggleShowOverview = () => {
    setShowMobileOverview(!showMobileOverview);
  };

  const classes = useStyles(showMobileOverview);

  return (
    <>
      <Box className={classes.root}>
        <Hidden xsDown>
          <Box className={classes.workoutOverviewContainer}>
            <WorkoutOverview
              routine={routine}
              currentIndex={currentIndex}
              next={next}
              prev={prev}
              reset={restart}
            />
          </Box>
        </Hidden>
        <Box className={classes.liftContainer}>
          <Hidden smUp>
            <Box className={classes.mobileOverview}>
              <Box className={classes.showMobileOverview}>
                <AlButton
                  outline
                  onClick={toggleShowOverview}
                  className={classes.showMobileOverviewBtn}
                >
                  {currentIndex + 1}/{routine.sets.length} -{" "}
                  {showMobileOverview ? "Hide" : "Show"} overview{" "}
                  {showMobileOverview ? <ExpandMore /> : <ExpandLess />}
                </AlButton>
              </Box>
              <Box className={classes.workoutOverview}>
                <WorkoutOverview
                  routine={routine}
                  currentIndex={currentIndex}
                  next={next}
                  prev={prev}
                  reset={restart}
                />
              </Box>
            </Box>
          </Hidden>
          {complete ? (
            <AlPaper color={"primary"}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  All sets complete!
                </Grid>
                <Grid item xs={12}>
                  <AlButton onClick={finish}>Finish workout</AlButton>
                </Grid>
              </Grid>
            </AlPaper>
          ) : (
            <>
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
                next={next}
              />
            </>
          )}
        </Box>
      </Box>
    </>
  );
};