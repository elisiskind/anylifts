import React, { useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { AlButton } from "./AlButton";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(({ palette, spacing, breakpoints }: Theme) => ({
  container: {
  },
  adjustButtonContainer: {
    minWidth: '74px'
  },
  timeBoxContainer: {
    maxWidth: 'calc(100% - 148px)'
  },
  timeBox: {
    border: "2px solid " + palette.grey.A100,
    boxShadow: "inset 0 4px " + palette.grey[100],
    borderRadius: 20,
    backgroundColor: "white",
    letterSpacing: "5px",
    width: "100%",
    textAlign: "center",
    height: "48px",
  },
  timeDisplay: {
    fontWeight: 700,
    fontSize: "24px",
    [breakpoints.up("md")]: {
      fontSize: "32px",
    },
    color: (negative: boolean) => (negative ? palette.error.main : "black"),
  },
  totalTimeDisplay: {
    marginLeft: "5px",
    color: palette.grey[700],
  },
  adjustButton: {
    width: "100%",
    whiteSpace: 'nowrap',
    height: '42px',
    padding: spacing(1),
    justifyContent: 'center'
  },
}));

const displayTime = (value: number) => {
  const minutes = Math.floor(Math.abs(value) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (Math.abs(value) % 60).toString().padStart(2, "0");
  return (value < 0 ? "-" : "") + minutes + ":" + seconds;
};

export interface AlTimerProps {
  time: number;
  addTime: (time: number) => void;
  onFinish: () => void;
}

export const AlTimer = ({ time, onFinish, addTime }: AlTimerProps) => {
  const [elapsed, setElapsed] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [completed, setCompleted] = useState<boolean>(false);

  const createTimer = () => {
    const start = Number.parseInt(localStorage.getItem("timeStart") || Date.now().toString())
    return setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000));
    }, 500);
  };

  useEffect(() => {
    localStorage.setItem("timeStart", Date.now().toString());
    setTimer(createTimer());
    return () => {
      if (timer) {
        clearInterval(timer);
      }
      // localStorage.removeItem("timeStart");
    };
  }, []);

  const value = time - elapsed;
  if (value <= 0 && !completed) {
    onFinish();
    setCompleted(true);
  } else if (value > 0 && completed) {
    setCompleted(false);
  }

  const classes = useStyles(value < 0);

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={2} className={classes.adjustButtonContainer}>
        <AlButton onClick={() => addTime(-15)} className={classes.adjustButton}>
          <Typography>- 15</Typography>
        </AlButton>
      </Grid>
      <Grid item xs={8} className={classes.timeBoxContainer}>
        <Box
          className={classes.timeBox}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
        >
          <Typography component={"span"} className={classes.timeDisplay}>
            {displayTime(value)}
          </Typography>
          <Typography component={"span"} className={classes.totalTimeDisplay}>
            {" / " + displayTime(time)}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2} className={classes.adjustButtonContainer}>
        <AlButton onClick={() => addTime(15)} className={classes.adjustButton}>
          <Typography>+ 15</Typography>
        </AlButton>
      </Grid>
    </Grid>
  );
};